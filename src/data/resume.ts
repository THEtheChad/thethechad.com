// TODO: Replace mock data with parsed LinkedIn export (Profile.csv, Positions.csv, Education.csv, Skills.csv)

export interface Position {
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string | null; // null = present
  description: string;
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
  lastName: "Elliott", // TODO: Update
  headline: "Solutions Architect", // TODO: Update
  summary:
    "Passionate software engineer with a focus on building scalable web applications and developer tooling. I enjoy working across the full stack and care deeply about user experience and code quality.", // TODO: Update
  location: "Kansas City, MO", // TODO: Update
  email: "chad.d.elliott@gmail.com", // TODO: Update
  linkedinUrl: "https://linkedin.com/in/thethechad", // TODO: Update
  githubUrl: "https://github.com/thethechad", // TODO: Update
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
      `- Led the design and implementation of a shared Material UI component system, standardizing UI/UX across multiple applications and accelerating frontend development.
- Led the migration of four legacy Java/JSP applications to modern React/Next.js platforms, designing CI/CD pipelines from scratch using GitLab, Helm, and AWS EKS. Optimized build times from 15 minutes to 8 minutes and implemented automated environment teardown to reduce infrastructure costs.
- Evaluated and introduced modern frontend frameworks (Zodios, XState, React Query, React Hook Form) to improve developer productivity, API safety, and application reliability.
- Established weekly engineering office hours, mentoring developers and improving adoption of new frontend architecture and tooling.
- Built a type-safe API mocking platform using Zod, Zodios, and zod-fixture, enabling frontend teams to develop independently from Java backend services and allowing for parallel development and accelerating feature velocity.
- Architected a dynamic form delivery and rendering platform, centralizing business rules and validation using JSONLogic and enabling consistent frontend and backend validation across licensing services`,
  },
  {
    title: "Software Engineer",
    company: "TripleBlind",
    location: "Kansas City, MO",
    startDate: "Mar 2021",
    endDate: "Jan 2023",
    description:
      `Led the effort to revamp and enhance Tripleblind's web based user interface.

I inherited a bare bones create-react-app application with minimal code structure. I then proceeded to:

- port the build process from create-react-app to vite for optimized HMR (hot module reloading) and sped up development by roughly 2x
- create a multistage docker build to allow caching and HMR in development and minimize the size of the production container by a factor of 1/3
- introduced standardization: MUI for frontend components, redux for state management, react-hook-form for forms
- upgrade to react 17 and switch to error boundaries/suspense to prevent unhandled application states

As a member of the "UI/UX Design Team", I established design patterns and refined process flow for new and existing features.

As a member of the "Refinement Team", I reviewed requirements for new features, sussed out potential issues, and set reasonable expectations for the development timeline.`,
  },
  {
    title: "Marketing Automation Strategist",
    company: "Excelerate Digital",
    location: "Kansas City, MO",
    startDate: "Jan 2016",
    endDate: "Mar 2021",
    description:
      `Working alongside our Datawarehouse engineers, my job is to facilitate automation for all of the processes involved to take a lead and turn it into a billable revenue stream. The task necessitates that I interact with many different, distributed systems. This means knowing and understanding the various APIs and protocols, understanding the business process facilitated by each system, and defining the requirements necessary to carry out a particular step in the automation chain. I've leveraged microservices, job queues, and messaging services to connect each of these architectures together.

The list of platforms we work with is quite long:
Salesforce, Workday, Basecamp, Simpli.fi, Google DCM, Google DBM, Amazon, Supportbee, GTM, GA, Tableau Server, Looker, etc.`,
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

export const skills = [
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "PostgreSQL",
  "GraphQL",
  "Docker",
  "AWS",
  "Git",
  "REST APIs",
] as const satisfies string[];

export const frameworks: { label: string, proficiency: number }[] = [
  { label: "React", proficiency: 10 },
  { label: "NextJS", proficiency: 10 },
  { label: "NodeJS", proficiency: 10 },
  { label: "React Query", proficiency: 8 },
  { label: "Zod", proficiency: 10 },
  { label: "XState", proficiency: 8 },
  { label: "GraphQL", proficiency: 6 },
  { label: "Docker", proficiency: 8 },
  { label: "AWS", proficiency: 7 },
  { label: "Git", proficiency: 7 },
  { label: "REST APIs", proficiency: 10 },
] as const satisfies { label: string, proficiency: number }[];

export const languages = [
  { label: "TypeScript", proficiency: 10 },
  { label: "JavaScript", proficiency: 10 },
  { label: "ECMAScript", proficiency: 10 },
  { label: "Bash", proficiency: 7 },
  { label: "PHP", proficiency: 6 },
  { label: "Python", proficiency: 4 },
  { label: "PostgreSQL", proficiency: 6 },
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