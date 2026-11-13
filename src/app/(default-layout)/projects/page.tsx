import type { Metadata } from "next";
import { ProjectCard } from "@/components/ProjectCard/ProjectCard";
import { SectionHeader } from "@/components/SectionHeader/SectionHeader";
import { projects } from "@/data/resume";

export const metadata: Metadata = {
  title: "Projects · Chad Elliott",
  description:
    "Things Chad Elliott has built and contributed to, from this site to open-source TypeScript tooling.",
};

export default function Projects() {
  return (
    <>
      <SectionHeader as="h1" index="03" title="projects" />
      <ul className="grid gap-5 min-[720px]:grid-cols-2">
        {projects.map((project, i) => (
          <ProjectCard key={project.title} project={project} number={i + 1} />
        ))}
      </ul>
    </>
  );
}
