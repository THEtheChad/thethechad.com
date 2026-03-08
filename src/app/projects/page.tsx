import { SectionHeader } from "@/components/SectionHeader/SectionHeader";
import { projects } from "@/data/resume";

export default function Projects() {
  return (
    <SectionHeader title="Projects">
      <div className="flex flex-col gap-4">
        {projects.map((project) => (
          <div
            key={project.title}
            className="corner-frame relative border border-line bg-card p-5 transition-colors hover:border-accent/50 hover:bg-card/80"
          >
            {/* External link icon */}
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute right-3 top-3 border border-pink/40 bg-badge p-1 font-pixel text-[9px] text-pink transition-colors hover:border-pink hover:bg-pink/10"
              aria-label={`Open ${project.title}`}
            >
              ↗
            </a>

            <h3 className="mb-2 font-pixel text-[11px] text-body">
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
          </div>
        ))}
      </div>
    </SectionHeader>
  );
}
