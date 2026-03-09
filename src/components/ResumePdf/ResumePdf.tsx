import path from "node:path";
import {
  Document,
  Image,
  Link,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import type { ReactNode } from "react";
import {
  education,
  frameworks,
  languages,
  positions,
  profile,
} from "@/data/resume";

const SIDEBAR_W = 205;

const c = {
  sidebarBg: "#111118",
  sidebarText: "#c8c8d8",
  sidebarMuted: "#6a6a80",
  sidebarRule: "rgba(255,255,255,0.12)",
  ink: "#0a0a1a",
  muted: "#6a6a7a",
  accent: "#0771a2",
  white: "#ffffff",
};

const s = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    backgroundColor: c.white,
    // Padding at the Page level applies on every page, including continuations.
    // paddingLeft clears the sidebar; paddingTop/bottom repeat on every page break.
    paddingTop: 44,
    paddingBottom: 44,
    paddingLeft: SIDEBAR_W + 32,
    paddingRight: 40,
  },

  // ── Sidebar ────────────────────────────────────────────────────
  // Absolutely positioned so it sits outside the normal flow and
  // doesn't consume the page's padded content area.
  sidebar: {
    position: "absolute",
    top: 0,
    left: 0,
    width: SIDEBAR_W,
    paddingBottom: 36,
  },
  photo: {
    width: SIDEBAR_W,
    height: 215,
    objectFit: "cover",
    objectPositionX: "center",
    objectPositionY: "top",
  },
  sidebarContent: {
    paddingHorizontal: 20,
    paddingTop: 22,
  },
  sidebarSection: {
    marginTop: 18,
  },
  sidebarSectionTitle: {
    fontFamily: "Helvetica-Bold",
    fontSize: 7,
    letterSpacing: 2,
    color: c.sidebarText,
    textTransform: "uppercase",
    paddingBottom: 4,
    borderBottomWidth: 0.5,
    borderBottomColor: c.accent,
    borderBottomStyle: "solid",
    marginBottom: 8,
  },
  sidebarLabel: {
    fontSize: 6.5,
    color: c.sidebarMuted,
    letterSpacing: 0.8,
    textTransform: "uppercase",
    marginBottom: 1,
  },
  sidebarText: {
    fontSize: 8,
    color: c.sidebarText,
    lineHeight: 1.45,
  },
  sidebarLink: {
    fontSize: 8,
    color: c.sidebarText,
    textDecoration: "none",
  },
  sidebarItem: {
    marginBottom: 9,
  },
  proficiencyItem: {
    marginBottom: 7,
  },
  proficiencyLabel: {
    fontSize: 8,
    color: c.sidebarText,
    marginBottom: 2.5,
  },
  proficiencyTrack: {
    // sidebar content width: SIDEBAR_W - 2 * paddingHorizontal(20) = 165
    width: 165,
    height: 3,
    backgroundColor: "rgba(255,255,255,0.1)",
    position: "relative",
  },

  // ── Main ──────────────────────────────────────────────────────
  // No padding here — it lives on the Page so it repeats on every page.
  main: {
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
    marginBottom: 22,
  },
  section: {
    marginTop: 16,
  },
  sectionTitle: {
    fontFamily: "Helvetica-Bold",
    fontSize: 9,
    letterSpacing: 2,
    color: c.ink,
    textTransform: "uppercase",
    marginBottom: 3,
  },
  sectionRule: {
    height: 2,
    backgroundColor: c.accent,
    marginBottom: 10,
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
  descBlock: {
    marginTop: 2,
  },
  descLine: {
    fontSize: 8.5,
    lineHeight: 1.5,
    color: "#3a3a5a",
  },
});

// ── Sub-components ─────────────────────────────────────────────

function SidebarSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <View style={s.sidebarSection} wrap={false}>
      <Text style={s.sidebarSectionTitle}>{title}</Text>
      {children}
    </View>
  );
}

function MainSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <View style={s.section}>
      <Text style={s.sectionTitle}>{title}</Text>
      <View style={s.sectionRule} />
      {children}
    </View>
  );
}

function ProficiencyItem({ label, level }: { label: string; level: number }) {
  return (
    <View style={s.proficiencyItem}>
      <Text style={s.proficiencyLabel}>{label}</Text>
      <View style={s.proficiencyTrack}>
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 165 * (level / 10),
            height: 3,
            backgroundColor: c.accent,
          }}
        />
      </View>
    </View>
  );
}

function DescriptionBlock({ text }: { text: string }) {
  return (
    <View style={s.descBlock} wrap={false}>
      {text
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean)
        .map((line, i) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: static ordered content
          <Text key={i} style={s.descLine}>
            {line}
          </Text>
        ))}
    </View>
  );
}

// ── Component ──────────────────────────────────────────────────

const photoPath = path.join(process.cwd(), "public", "thethechad.jpeg");

export function ResumePdf() {
  return (
    <Document
      title={`${profile.firstName} ${profile.lastName} — Resume`}
      author={`${profile.firstName} ${profile.lastName}`}
    >
      <Page size="LETTER" style={s.page}>
        {/* Dark sidebar background — fixed so it renders on every page */}
        <View
          fixed
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: SIDEBAR_W,
            bottom: 0,
            backgroundColor: c.sidebarBg,
          }}
        />

        {/* ── Left sidebar ── */}
        <View style={s.sidebar}>
          <Image src={photoPath} style={s.photo} />

          <View style={s.sidebarContent}>
            <SidebarSection title="Contact">
              <View style={s.sidebarItem}>
                <Text style={s.sidebarLabel}>Email</Text>
                <Link src={`mailto:${profile.email}`} style={s.sidebarLink}>
                  {profile.email}
                </Link>
              </View>
              <View style={s.sidebarItem}>
                <Text style={s.sidebarLabel}>Location</Text>
                <Text style={s.sidebarText}>{profile.location}</Text>
              </View>
              <View style={s.sidebarItem}>
                <Text style={s.sidebarLabel}>LinkedIn</Text>
                <Link src={profile.linkedinUrl} style={s.sidebarLink}>
                  {profile.linkedinUrl}
                </Link>
              </View>
              <View style={s.sidebarItem}>
                <Text style={s.sidebarLabel}>GitHub</Text>
                <Link src={profile.githubUrl} style={s.sidebarLink}>
                  {profile.githubUrl}
                </Link>
              </View>
            </SidebarSection>

            <SidebarSection title="Languages">
              {languages.map((lang) => (
                <ProficiencyItem
                  key={lang.label}
                  label={lang.label}
                  level={lang.level}
                />
              ))}
            </SidebarSection>

            <SidebarSection title="Frameworks">
              {frameworks.map((fw) => (
                <ProficiencyItem
                  key={fw.label}
                  label={fw.label}
                  level={fw.level}
                />
              ))}
            </SidebarSection>

            <SidebarSection title="Education">
              {education.map((edu) => (
                <View key={edu.school} style={s.sidebarItem}>
                  <Text
                    style={{
                      fontFamily: "Helvetica-Bold",
                      fontSize: 8,
                      color: c.sidebarText,
                      marginBottom: 1,
                    }}
                  >
                    {edu.school}
                  </Text>
                  {edu.degree && (
                    <Text style={s.sidebarText}>{edu.degree}</Text>
                  )}
                  <Text style={s.sidebarText}>{edu.fieldOfStudy}</Text>
                  <Text style={{ fontSize: 7.5, color: c.sidebarMuted }}>
                    {edu.startYear} — {edu.endYear ?? "Present"}
                  </Text>
                </View>
              ))}
            </SidebarSection>
          </View>
        </View>

        {/* ── Main content ── */}
        <View style={s.main}>
          <Text style={s.nameFirst}>{profile.firstName.toUpperCase()}</Text>
          <Text style={s.nameLast}>{profile.lastName.toUpperCase()}</Text>
          <Text style={s.headline}>{profile.headline}</Text>

          <MainSection title="Profile">
            <Text style={s.summary}>{profile.summary}</Text>
          </MainSection>

          <MainSection title="Work Experience">
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
          </MainSection>
        </View>
      </Page>
    </Document>
  );
}
