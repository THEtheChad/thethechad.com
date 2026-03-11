// TODO: Replace mock data with parsed LinkedIn export (Profile.csv, Positions.csv, Education.csv, Skills.csv)

export interface Position {
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string | null; // null = present
  description: string;
  technologies?: string[];
}

export interface Education {
  school: string;
  degree?: string;
  fieldOfStudy: string;
  startYear: number;
  endYear: number | null;
  activities?: string;
}

export interface Profile {
  firstName: string;
  lastName: string;
  headline: string;
  summary: string;
  location: string;
  email: string;
  linkedinUrl: string;
  githubUrl: string;
  resumeUrl: string;
}

export interface Project { title: string; description: string; url: string; tags: string[] }

export const profile: Profile = {
  firstName: "Chad",
  lastName: "Elliott",
  headline: "Software Architect / Staff Engineer",
  summary:
    `Staff-level software engineer specializing in modern web platforms, developer tooling, and large-scale application modernization.

Experienced in leading migrations from legacy systems to modern React/TypeScript architectures, building CI/CD platforms, and designing developer infrastructure that accelerates team velocity. Known for introducing strongly typed APIs, state-machine driven workflows, and systems that enable parallel development across distributed teams.`,
  location: "Kansas City, MO",
  email: "chad.d.elliott@gmail.com",
  linkedinUrl: "https://linkedin.com/in/thethechad",
  githubUrl: "https://github.com/thethechad",
  resumeUrl: "/api/resume",
};

export const positions: Position[] = [
  {
    title: "Solutions Architect",
    company: "National Insurance Producer Registry",
    location: "Kansas City, MO",
    startDate: "Sep 2023",
    endDate: "Mar 2026",
    description:
      `Led modernization of a legacy Java/JSP application suite into a modern React + TypeScript platform backed by Java APIs.

Key impact:
- Architected a React component platform used across multiple applications, standardizing UI patterns and significantly reducing frontend implementation time.
- Built a Kubernetes-based CI/CD platform (GitLab + Helm + EKS) supporting dynamic preview environments and reducing build times from 15 minutes to 8 minutes.
- Designed a dynamic form platform using JSONLogic to centralize business rules and validation across frontend and backend licensing systems.
- Introduced state-machine driven workflow architecture using XState, enabling automatic generation of diagrams used by product and engineering teams.
- Implemented a type-safe API development platform using Zod, Zodios, and zod-fixture, enabling frontend teams to develop independently from backend services.
- Established engineering office hours and architecture mentorship, accelerating adoption of the new frontend platform across teams.`,
    technologies: [
      "TypeScript", "React", "Next.js", "XState", "Zod", "React Query", "GitLab CI", "Kubernetes", "Helm", "AWS EKS", "Bash", "JSONLogic", "Zodios", "Zod Fixture"
    ]
  },
  {
    title: "Software Engineer",
    company: "TripleBlind",
    location: "Kansas City, MO",
    startDate: "Mar 2021",
    endDate: "Jan 2023",
    description:
      `Modernized a React-based application platform and established frontend architecture standards.

Key impact:
- Migrated the build system from Create React App → Vite, improving developer feedback cycles and increasing HMR performance by ~2×.
- Implemented multi-stage Docker builds, reducing production container size by ~66%.
- Established frontend architecture standards using MUI, Redux, and React Hook Form.
- Upgraded the application to React 17 and introduced error boundaries and Suspense, improving application stability.
- Partnered with design and product teams to define UX patterns and improve development workflows.`,
    technologies: [
      "React", "Vite", "Docker", "Redux", "MUI", "React Hook Form"
    ]
  },
  {
    title: "Marketing Automation Strategist",
    company: "Excelerate Digital",
    location: "Kansas City, MO",
    startDate: "Jan 2016",
    endDate: "Mar 2021",
    description:
      `Designed distributed automation systems that transformed incoming marketing leads into revenue-generating pipelines across internal and third-party platforms.

Key impact:
- Built microservice-based automation workflows integrating multiple SaaS platforms across the marketing and revenue pipeline.
- Implemented job queue and messaging systems to coordinate asynchronous processing across services.
- Defined API integration contracts across internal and third-party systems to enable end-to-end automation.
- Partnered with analytics and data engineering teams to align automation pipelines with downstream reporting systems.`,
    technologies: [
      "Salesforce", "Workday", "Basecamp", "Simpli.fi", "Google Campaign Manager (DCM)", "Display & Video 360 (DBM)", "Amazon", "SupportBee", "Google Tag Manager", "Google Analytics", "Tableau Server", "Looker"
    ]
  },
] as const satisfies Position[];

export const education: Education[] = [
  {
    school: "University of Nebraska at Omaha (UNO)", // TODO: Update
    fieldOfStudy: "Computer Science",
    startYear: 2000,
    endYear: 2002,
  },
] as const satisfies Education[];

export const frontend = [
  { label: "React", proficiency: 10 },
  { label: "NextJS", proficiency: 10 },
  { label: "Zod", proficiency: 10 },
  { label: "React Query", proficiency: 8 },
  { label: "XState", proficiency: 7 },
  { label: "Zod Fixture", proficiency: 10 },
  { label: "React Hook Form", proficiency: 9 },
  { label: "MUI", proficiency: 9 },
  { label: "Tailwind", proficiency: 6 },
  { label: "Redux", proficiency: 9 },
] as const satisfies { label: string, proficiency: number }[];

export const backend = [
  { label: "NodeJS", proficiency: 10 },
  { label: "REST APIs", proficiency: 10 },
  { label: "GraphQL", proficiency: 6 },
  { label: "EffectTS", proficiency: 6 },
] as const satisfies { label: string, proficiency: number }[];

export const infrastructure = [
  { label: "Docker", proficiency: 8 },
  { label: "GitLab", proficiency: 8 },
  { label: "Github", proficiency: 8 },
  { label: "AWS", proficiency: 6 },
  { label: "Git", proficiency: 8 },
  { label: "Kubernetes", proficiency: 6 },
  { label: "Helm", proficiency: 5 },
] as const satisfies { label: string, proficiency: number }[];

export const languages = [
  { label: "TypeScript", proficiency: 10 },
  { label: "JavaScript", proficiency: 10 },
  { label: "ECMAScript", proficiency: 10 },
  { label: "Bash", proficiency: 7 },
  { label: "PHP", proficiency: 6 },
  { label: "SQL", proficiency: 6 },
  { label: "Python", proficiency: 4 },
  { label: "C++", proficiency: 6 },
  { label: "HTML", proficiency: 9 },
  { label: "CSS", proficiency: 9 },
] as const satisfies { label: string, proficiency: number }[];

// TODO: Replace with your real projects
export const projects: Project[] = [
  {
    title: "thethechad.com",
    description:
      "A full-stack web application for managing and organizing tasks with real-time collaboration.",
    url: "https://github.com/THEtheChad/thethechad.com",
    tags: ["Next.js", "TypeScript"],
  },
  {
    title: "zod-fixture",
    description:
      `Creating test fixtures should be easy.
zod-fixture helps with the arrange phase of your tests by creating test fixtures based on a zod schema.`,
    url: "https://github.com/timdeschryver/zod-fixture",
    tags: ["Typescript"],
  }
] as const;