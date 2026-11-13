import Link from "next/link";
import { SectionHeader } from "@/components/SectionHeader/SectionHeader";
import { projects } from "@/data/resume";

/**
 * Home §04: the projects from résumé data as whole-card links (the title link
 * stretches over the card, so the accessible name stays the title).
 */
export function HomeLately() {
  return (
    <section aria-labelledby="lately">
      <SectionHeader index="04" title="lately" id="lately" />
      <ul className="grid gap-5 min-[720px]:grid-cols-2">
        {projects.map((project) => (
          <li
            key={project.title}
            className="relative flex flex-col gap-2.5 rounded-plate border-2 border-rim p-6 transition-colors duration-150 focus-within:bg-raise hover:bg-raise"
          >
            <h3 className="flex items-baseline justify-between gap-4 text-[19px] font-semibold">
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="after:absolute after:inset-0 after:rounded-[14px] focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-3 focus-visible:after:outline-cyan"
              >
                {project.title}
              </a>
              <span
                aria-hidden="true"
                className="font-mono text-sm text-pink-ink"
              >
                ↗
              </span>
            </h3>
            <p className="text-[15px] leading-[1.6] whitespace-pre-line text-muted">
              {project.description}
            </p>
            <p className="mt-auto font-mono text-[13px] text-muted">
              {project.tags.join(" · ")}
            </p>
          </li>
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
