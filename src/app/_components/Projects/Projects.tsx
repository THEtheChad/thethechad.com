import { projects } from "@/data/resume";
import { DetailedHTMLProps, HTMLAttributes } from "react";

export type ProjectsProps = DetailedHTMLProps<
  HTMLAttributes<HTMLElement>,
  HTMLElement
>;

export function Projects(props: ProjectsProps) {
  return (
    <section {...props}>
      {/* Section header */}
      <div className="mb-8 flex items-center gap-4">
        {/** biome-ignore lint/suspicious/noCommentText: this is intentional syntax for the retro aesthetic */}
        <span className="font-pixel text-[9px] text-pink">//</span>
        <h2 className="font-retro text-4xl text-body">PROJECTS</h2>
        <div
          className="h-px flex-1 bg-gradient-to-r from-accent/40 to-transparent"
          style={{ boxShadow: "0 0 6px rgba(0,207,255,0.2)" }}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
    </section>
  );
}
