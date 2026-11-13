import Link from "next/link";
import { ProjectCard } from "@/components/ProjectCard/ProjectCard";
import { SectionHeader } from "@/components/SectionHeader/SectionHeader";
import { projects } from "@/data/resume";

/**
 * Home §04: the projects from résumé data as whole-card links, sharing
 * /projects' ProjectCard so the two never drift apart.
 */
export function HomeLately() {
  return (
    <section aria-labelledby="lately">
      <SectionHeader index="04" title="lately" id="lately" />
      <ul className="grid gap-5 min-[720px]:grid-cols-2">
        {projects.map((project, i) => (
          <ProjectCard
            key={project.title}
            project={project}
            number={i + 1}
            headingLevel="h3"
          />
        ))}
      </ul>
      <p className="mt-6">
        <Link
          href="/projects"
          className="inline-flex min-h-11 items-center font-mono text-[13px] tracking-[0.12em] text-cyan uppercase underline decoration-1 underline-offset-4 hover:decoration-2"
        >
          All projects <span aria-hidden="true">&nbsp;→</span>
        </Link>
      </p>
    </section>
  );
}
