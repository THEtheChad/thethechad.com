import { SectionHeader } from "@/components/SectionHeader/SectionHeader";
import { projects } from "@/data/resume";

export default function Projects() {
  return (
    <>
      <SectionHeader as="h1" index="03" title="projects" />
      <div className="flex flex-col gap-5">
        {projects.map((project) => (
          <article
            key={project.title}
            className="relative rounded-plate border-2 border-rim p-6 transition-colors duration-150 hover:bg-raise"
          >
            <h2 className="pr-12 text-[19px] font-semibold">{project.title}</h2>
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute top-3 right-3 inline-flex size-11 items-center justify-center rounded-ctl font-mono text-lg text-pink-ink transition-colors duration-150 hover:bg-night"
            >
              <span aria-hidden="true">↗</span>
              <span className="sr-only">Open {project.title}</span>
            </a>
            <p className="mt-2.5 max-w-[65ch] text-[15px] leading-relaxed text-muted">
              {project.description}
            </p>
            <p className="mt-3 font-mono text-[13px] text-muted">
              {project.tags.join(" · ")}
            </p>
          </article>
        ))}
      </div>
    </>
  );
}
