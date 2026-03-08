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
  degree: string;
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
  location: "San Francisco, CA", // TODO: Update
  email: "chad@example.com", // TODO: Update
  linkedinUrl: "https://linkedin.com/in/yourprofile", // TODO: Update
  githubUrl: "https://github.com/yourhandle", // TODO: Update
  resumeUrl: "/resume.pdf", // TODO: Add resume.pdf to /public
};

export const positions: Position[] = [
  {
    title: "Senior Software Engineer",
    company: "Acme Corp",
    location: "Remote",
    startDate: "Jan 2022",
    endDate: null,
    description:
      "Led development of core platform features serving 500K+ users. Architected a microservices migration reducing latency by 40%. Mentored junior engineers and drove engineering culture initiatives.",
  },
  {
    title: "Software Engineer",
    company: "Startup Co",
    location: "San Francisco, CA",
    startDate: "Jun 2019",
    endDate: "Dec 2021",
    description:
      "Built and shipped multiple full-stack features for a B2B SaaS product. Owned the frontend architecture migration from legacy jQuery to React. Improved CI/CD pipeline and developer experience.",
  },
  {
    title: "Junior Software Engineer",
    company: "Agency Inc",
    location: "New York, NY",
    startDate: "Jul 2017",
    endDate: "May 2019",
    description:
      "Developed client-facing web applications across a variety of industries. Gained experience with React, Node.js, and PostgreSQL.",
  },
] as const satisfies Position[];

export const education: Education[] = [
  {
    school: "State University", // TODO: Update
    degree: "Bachelor of Science",
    fieldOfStudy: "Computer Science",
    startYear: 2013,
    endYear: 2017,
    activities: "Hackathon Club, Open Source Society",
  },
] as const satisfies Education[];

export const skills: string[] = [
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