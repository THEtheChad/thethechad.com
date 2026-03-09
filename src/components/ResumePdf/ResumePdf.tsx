import path from "node:path";
import { Document, Image, Link, Page, Text, View } from "@react-pdf/renderer";
import {
  education,
  frameworks,
  languages,
  positions,
  profile,
} from "@/data/resume";
import { DescriptionBlock } from "./components/DescriptionBlock";
import { MainSection } from "./components/MainSection";
import { ProficiencyItem } from "./components/ProficiencyItem";
import { SidebarSection } from "./components/Sidebar/components/SidebarSection";
import { SIDEBAR_WIDTH, Sidebar } from "./components/Sidebar/Sidebar";
import { c, s } from "./styles";

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
            width: SIDEBAR_WIDTH,
            bottom: 0,
            backgroundColor: c.sidebarBg,
          }}
        />

        <Sidebar>
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
        </Sidebar>

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
