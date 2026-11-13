import { profile } from "@/data/resume";

export interface NavItem {
  index: string;
  label: string;
  href: string;
}

/** The site's track list. Route names stay; labels follow the refresh plan. */
export const navItems: readonly NavItem[] = [
  { index: "01", label: "about", href: "/about" },
  { index: "02", label: "work", href: "/employment" },
  { index: "03", label: "projects", href: "/projects" },
  { index: "04", label: "photos", href: "/photography" },
  { index: "05", label: "contact", href: "/contact" },
];

export interface ExternalLink {
  label: string;
  href: string;
}

export const externalLinks: readonly ExternalLink[] = [
  { label: "github", href: profile.githubUrl },
  { label: "linkedin", href: profile.linkedinUrl },
  { label: "résumé.pdf", href: profile.resumeUrl },
];

export function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}
