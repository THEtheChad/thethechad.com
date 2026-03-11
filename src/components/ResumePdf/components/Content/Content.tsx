import { StyleSheet, Text, View } from "@react-pdf/renderer";
import { positions, profile } from "@/data/resume";
import { c } from "../../styles";
import { ContentSection } from "./components/ContentSection";
import { DescriptionBlock } from "./components/DescriptionBlock";

const s = StyleSheet.create({
  main: {
    flex: 1,
  },
  header: {
    marginBottom: 22,
  },
  nameBlock: {},
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
  subheadline: {
    fontFamily: "Helvetica-Oblique",
    fontSize: 7.5,
    color: c.muted,
    marginTop: 5,
  },
  summary: {
    fontSize: 8.5,
    lineHeight: 1.65,
    color: "#3a3a5a",
  },
  entry: {
    marginBottom: 18,
  },
  entryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  entryTitle: {
    fontFamily: "Helvetica-Bold",
    fontSize: 9.5,
    color: c.accent,
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
    marginBottom: 4,
  },
  entryDivider: {
    height: 0.5,
    backgroundColor: "#d0d0e0",
    marginBottom: 5,
  },
  techSection: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: 6,
    gap: 8,
  },
  techLabelWrapper: {
    borderRightWidth: 0.5,
    borderRightColor: "#d0d0e0",
    paddingRight: 8,
  },
  techLabel: {
    fontSize: 7,
    color: "#9a9aaa",
    letterSpacing: 0.8,
    textTransform: "uppercase",
  },
  techList: {
    fontFamily: "Helvetica-Oblique",
    fontSize: 7.5,
    color: c.muted,
    lineHeight: 1.4,
    flex: 1,
  },
});

export function Content() {
  return (
    <View style={s.main}>
      {/* Header: photo left, name + title right */}
      <View style={s.header}>
        <View style={s.nameBlock}>
          <Text style={s.nameFirst}>{profile.firstName.toUpperCase()}</Text>
          <Text style={s.nameLast}>{profile.lastName.toUpperCase()}</Text>
          <Text style={s.headline}>{profile.headline}</Text>
          <Text style={s.subheadline}>
            Modern Web Platforms • Distributed Systems • Developer Tooling
          </Text>
        </View>
      </View>

      <ContentSection title="Summary">
        <DescriptionBlock text={profile.summary} />
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
                {pos.startDate} – {pos.endDate ?? "Present"}
              </Text>
            </View>
            <Text style={s.entryMeta}>
              {pos.company} · {pos.location}
            </Text>
            <View style={s.entryDivider} />
            <DescriptionBlock text={pos.description} />
            {pos.technologies && (
              <View style={s.techSection}>
                <View style={s.techLabelWrapper}>
                  <Text style={s.techLabel}>Technologies</Text>
                </View>
                <Text style={s.techList}>{pos.technologies.join(" • ")}</Text>
              </View>
            )}
          </View>
        ))}
      </ContentSection>
    </View>
  );
}
