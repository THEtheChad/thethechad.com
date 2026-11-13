import { DotList } from "@/components/DotList/DotList";
import type { Project } from "@/data/resume";

export interface ProjectCardProps {
  project: Project;
  /** Position in the list, shown as a mono track numeral (1 → "01"). */
  number: number;
  /** `h2` on /projects, `h3` inside the home page's "lately" section. */
  headingLevel?: "h2" | "h3";
}

/**
 * A project as a whole-card link. The title is the card's only link and
 * stretches over the card (::after), so the accessible name stays the title
 * and nothing interactive nests inside it. Renders an `<li>`, so place it
 * in a `<ul>`.
 */
export function ProjectCard({
  project,
  number,
  headingLevel: Heading = "h2",
}: ProjectCardProps) {
  return (
    <li className="relative flex flex-col gap-2.5 rounded-plate border-2 border-rim p-6 transition-colors duration-150 focus-within:bg-raise hover:bg-raise">
      <div className="flex items-baseline gap-3">
        <span
          aria-hidden="true"
          className="font-mono text-[13px] text-pink-ink"
        >
          {String(number).padStart(2, "0")}
        </span>
        <Heading className="min-w-0 flex-1 text-[19px] font-semibold [overflow-wrap:anywhere]">
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="after:absolute after:inset-0 after:rounded-[14px] focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-3 focus-visible:after:outline-cyan"
          >
            {project.title}
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </Heading>
        <span aria-hidden="true" className="font-mono text-sm text-pink-ink">
          ↗
        </span>
      </div>
      <p className="text-[15px] leading-[1.6] whitespace-pre-line text-muted">
        {project.description}
      </p>
      <DotList
        items={project.tags}
        label={`${project.title} tags`}
        className="mt-auto"
      />
    </li>
  );
}
