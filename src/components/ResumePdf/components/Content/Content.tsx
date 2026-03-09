import path from "node:path";
import { Image, StyleSheet, Text, View } from "@react-pdf/renderer";
import { positions, profile } from "@/data/resume";
import { c } from "../../styles";
import { ContentSection } from "./components/ContentSection";
import { DescriptionBlock } from "./components/DescriptionBlock";

const photoPath = path.join(process.cwd(), "public", "thethechad.jpeg");

const s = StyleSheet.create({
  main: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 16,
    marginBottom: 22,
  },
  photo: {
    width: 80,
    height: 90,
    objectFit: "cover",
    objectPositionX: "center",
    objectPositionY: "top",
  },
  nameBlock: {
    flex: 1,
  },
  nameFirst: {
    fontFamily: "Helvetica-Bold",
    fontSize: 30,
    letterSpacing: 3,
    color: c.ink,
    lineHeight: 1,
  },
  nameLast: {
    fontFamily: "Helvetica-Bold",
    fontSize: 36,
    letterSpacing: 3,
    color: c.ink,
    lineHeight: 1,
    marginBottom: 7,
  },
  headline: {
    fontSize: 8.5,
    letterSpacing: 2.5,
    color: c.muted,
    textTransform: "uppercase",
  },
  summary: {
    fontSize: 8.5,
    lineHeight: 1.65,
    color: "#3a3a5a",
  },
  entry: {
    marginBottom: 11,
  },
  entryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  entryTitle: {
    fontFamily: "Helvetica-Bold",
    fontSize: 9.5,
    color: c.ink,
  },
  entryDate: {
    fontSize: 8,
    color: c.muted,
    textAlign: "right",
  },
  entryMeta: {
    fontSize: 8,
    color: c.muted,
    marginTop: 1,
    marginBottom: 3,
  },
});

export function Content() {
  return (
    <View style={s.main}>
      {/* Header: photo left, name + title right */}
      <View style={s.header}>
        <Image src={photoPath} style={s.photo} />
        <View style={s.nameBlock}>
          <Text style={s.nameFirst}>{profile.firstName.toUpperCase()}</Text>
          <Text style={s.nameLast}>{profile.lastName.toUpperCase()}</Text>
          <Text style={s.headline}>{profile.headline}</Text>
        </View>
      </View>

      <ContentSection title="Profile">
        <Text style={s.summary}>{profile.summary}</Text>
      </ContentSection>

      <ContentSection title="Work Experience">
        {positions.map((pos) => (
          <View
            key={`${pos.company}-${pos.title}`}
            style={s.entry}
            wrap={false}
          >
            <View style={s.entryHeader}>
              <Text style={s.entryTitle}>{pos.title}</Text>
              <Text style={s.entryDate}>
                {pos.startDate} — {pos.endDate ?? "Present"}
              </Text>
            </View>
            <Text style={s.entryMeta}>
              {pos.company} · {pos.location}
            </Text>
            <DescriptionBlock text={pos.description} />
          </View>
        ))}
      </ContentSection>
    </View>
  );
}
