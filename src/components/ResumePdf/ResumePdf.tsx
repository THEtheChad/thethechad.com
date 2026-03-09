import {
  Document,
  Page,
  Text,
  View,
  Link,
  StyleSheet,
} from "@react-pdf/renderer";
import { education, positions, profile, skills } from "@/data/resume";

const c = {
  ink: "#0a0a1a",
  muted: "#5a5a7a",
  accent: "#005FFF",
  border: "#d0d0e0",
  white: "#ffffff",
};

const s = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 9.5,
    color: c.ink,
    backgroundColor: c.white,
    paddingTop: 48,
    paddingBottom: 48,
    paddingHorizontal: 54,
  },

  // ── Header ──────────────────────────────────────────────────────
  name: {
    fontFamily: "Helvetica-Bold",
    fontSize: 22,
    letterSpacing: 0.5,
  },
  headline: {
    fontSize: 11,
    color: c.accent,
    marginTop: 2,
  },
  location: {
    fontSize: 8.5,
    color: c.muted,
    marginTop: 1,
  },
  contactRow: {
    flexDirection: "row",
    gap: 14,
    marginTop: 5,
  },
  contactLink: {
    fontSize: 8.5,
    color: c.accent,
    textDecoration: "none",
  },
  summary: {
    marginTop: 10,
    fontSize: 9,
    lineHeight: 1.55,
    color: "#3a3a5a",
  },

  // ── Section ──────────────────────────────────────────────────────
  sectionTitle: {
    fontFamily: "Helvetica-Bold",
    fontSize: 9,
    letterSpacing: 1.5,
    color: c.accent,
    textTransform: "uppercase",
    marginTop: 18,
    marginBottom: 2,
    paddingBottom: 3,
    borderBottomWidth: 0.75,
    borderBottomColor: c.accent,
    borderBottomStyle: "solid",
  },

  // ── Entry ────────────────────────────────────────────────────────
  entry: {
    marginTop: 8,
  },
  entryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  entryTitle: {
    fontFamily: "Helvetica-Bold",
    fontSize: 10,
  },
  entryCompany: {
    fontSize: 9,
    color: c.accent,
    marginTop: 1,
  },
  entryMeta: {
    fontSize: 8,
    color: c.muted,
    marginTop: 1,
  },
  entryDate: {
    fontSize: 8,
    color: c.muted,
    textAlign: "right",
  },
  descLine: {
    fontSize: 8.5,
    lineHeight: 1.5,
    color: "#3a3a5a",
  },
  descBlock: {
    marginTop: 4,
  },

  // ── Skills ───────────────────────────────────────────────────────
  skillsWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 5,
    marginTop: 6,
  },
  skill: {
    fontSize: 8,
    color: c.accent,
    borderWidth: 0.5,
    borderColor: c.accent,
    borderStyle: "solid",
    paddingHorizontal: 6,
    paddingVertical: 2.5,
  },
});

function DescriptionBlock({ text }: { text: string }) {
  return (
    <View style={s.descBlock}>
      {text
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean)
        .map((line, i) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: static content
          <Text key={i} style={s.descLine}>
            {line}
          </Text>
        ))}
    </View>
  );
}

export function ResumePdf() {
  return (
    <Document
      title={`${profile.firstName} ${profile.lastName} — Resume`}
      author={`${profile.firstName} ${profile.lastName}`}
    >
      <Page size="LETTER" style={s.page}>
        {/* ── Header ── */}
        <Text style={s.name}>
          {profile.firstName} {profile.lastName}
        </Text>
        <Text style={s.headline}>{profile.headline}</Text>
        <Text style={s.location}>{profile.location}</Text>
        <View style={s.contactRow}>
          <Link src={`mailto:${profile.email}`} style={s.contactLink}>
            {profile.email}
          </Link>
          <Link src={profile.linkedinUrl} style={s.contactLink}>
            linkedin.com/in/thethechad
          </Link>
          <Link src={profile.githubUrl} style={s.contactLink}>
            github.com/thethechad
          </Link>
        </View>
        <Text style={s.summary}>{profile.summary}</Text>

        {/* ── Experience ── */}
        <Text style={s.sectionTitle}>Experience</Text>
        {positions.map((pos) => (
          <View key={`${pos.company}-${pos.title}`} style={s.entry}>
            <View style={s.entryRow}>
              <View>
                <Text style={s.entryTitle}>{pos.title}</Text>
                <Text style={s.entryCompany}>{pos.company}</Text>
                <Text style={s.entryMeta}>{pos.location}</Text>
              </View>
              <Text style={s.entryDate}>
                {pos.startDate} — {pos.endDate ?? "Present"}
              </Text>
            </View>
            <DescriptionBlock text={pos.description} />
          </View>
        ))}

        {/* ── Education ── */}
        <Text style={s.sectionTitle}>Education</Text>
        {education.map((edu) => (
          <View key={edu.school} style={s.entry}>
            <View style={s.entryRow}>
              <View>
                <Text style={s.entryTitle}>{edu.school}</Text>
                <Text style={s.entryCompany}>
                  {edu.degree} · {edu.fieldOfStudy}
                </Text>
                {edu.activities && (
                  <Text style={s.entryMeta}>{edu.activities}</Text>
                )}
              </View>
              <Text style={s.entryDate}>
                {edu.startYear} — {edu.endYear ?? "Present"}
              </Text>
            </View>
          </View>
        ))}

        {/* ── Skills ── */}
        <Text style={s.sectionTitle}>Skills</Text>
        <View style={s.skillsWrap}>
          {skills.map((skill) => (
            <Text key={skill} style={s.skill}>
              {skill}
            </Text>
          ))}
        </View>
      </Page>
    </Document>
  );
}
