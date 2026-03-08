import { SectionHeader } from "@/components/SectionHeader/SectionHeader";
import { projects } from "@/data/resume";
import { DetailedHTMLProps, HTMLAttributes } from "react";

export type ProjectsProps = DetailedHTMLProps<
  HTMLAttributes<HTMLElement>,
  HTMLElement
>;

export default function Projects(props: ProjectsProps) {
  return (
    <>
      <SectionHeader title="Projects" />

      <div className="flex flex-col gap-4">
        {projects.map((project) => (
          <a
            key={project.title}
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group corner-frame border border-line bg-card p-5 transition-colors hover:border-accent/50 hover:bg-card/80"
          >
            <h3 className="mb-2 font-pixel text-[11px] text-body transition-colors group-hover:text-accent-soft">
              {project.title}
            </h3>
            <p className="mb-4 text-sm leading-relaxed text-soft">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="border border-line bg-badge px-2.5 py-0.5 font-pixel text-[8px] text-accent-soft"
                >
                  {tag}
                </span>
              ))}
            </div>
          </a>
        ))}
      </div>
    </>
  );
}
