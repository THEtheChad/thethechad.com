import path from "node:path";
import { Image, Link, StyleSheet, Text, View } from "@react-pdf/renderer";
import { education, frameworks, languages, profile } from "@/data/resume";
import { SIDEBAR_WIDTH } from "../../constants";
import { c } from "../../styles";
import { ContactItem } from "./components/ContactItem";
import { ProficiencyItem } from "./components/ProficiencyItem";
import { SidebarSection } from "./components/SidebarSection";

const photoPath = path.join(process.cwd(), "public", "thethechad.jpeg");

const s = StyleSheet.create({
  sidebar: {
    position: "absolute",
    top: 0,
    left: 0,
    width: SIDEBAR_WIDTH,
    paddingBottom: 36,
  },
  photo: {
    width: SIDEBAR_WIDTH,
    height: 215,
    objectFit: "cover",
    objectPositionX: "center",
    objectPositionY: "top",
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 22,
  },
  item: {
    marginBottom: 9,
  },
  label: {
    fontSize: 6.5,
    color: c.sidebarMuted,
    letterSpacing: 0.8,
    textTransform: "uppercase",
    marginBottom: 1,
  },
  text: {
    fontSize: 8,
    color: c.sidebarText,
    lineHeight: 1.45,
  },
  link: {
    fontSize: 8,
    color: c.sidebarText,
    textDecoration: "none",
  },
  schoolName: {
    fontFamily: "Helvetica-Bold",
    fontSize: 8,
    color: c.sidebarText,
    marginBottom: 1,
  },
  schoolYear: {
    fontSize: 7.5,
    color: c.sidebarMuted,
  },
});

export function Sidebar() {
  return (
    <View style={s.sidebar}>
      <Image src={photoPath} style={s.photo} />

      <View style={s.content}>
        <SidebarSection title="Contact">
          <ContactItem label="Email">
            <Link src={`mailto:${profile.email}`} style={s.link}>
              {profile.email}
            </Link>
          </ContactItem>
          <ContactItem label="Location">
            <Text style={s.text}>{profile.location}</Text>
          </ContactItem>
          <ContactItem label="LinkedIn">
            <Link src={profile.linkedinUrl} style={s.link}>
              {profile.linkedinUrl}
            </Link>
          </ContactItem>
          <ContactItem label="GitHub">
            <Link src={profile.githubUrl} style={s.link}>
              {profile.githubUrl}
            </Link>
          </ContactItem>
        </SidebarSection>

        <SidebarSection title="Languages">
          {languages.map((lang) => (
            <ProficiencyItem
              key={lang.label}
              label={lang.label}
              proficiency={lang.proficiency}
            />
          ))}
        </SidebarSection>

        <SidebarSection title="Frameworks">
          {frameworks.map((fw) => (
            <ProficiencyItem
              key={fw.label}
              label={fw.label}
              proficiency={fw.proficiency}
            />
          ))}
        </SidebarSection>

        <SidebarSection title="Education">
          {education.map((edu) => (
            <View key={edu.school} style={s.item}>
              <Text style={s.schoolName}>{edu.school}</Text>
              {edu.degree && <Text style={s.text}>{edu.degree}</Text>}
              <Text style={s.text}>{edu.fieldOfStudy}</Text>
              <Text style={s.schoolYear}>
                {edu.startYear} — {edu.endYear ?? "Present"}
              </Text>
            </View>
          ))}
        </SidebarSection>
      </View>
    </View>
  );
}
