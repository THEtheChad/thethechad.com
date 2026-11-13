import { twMerge } from "tailwind-merge";
import { DotList } from "@/components/DotList/DotList";
import type { Position as PositionData } from "@/data/resume";
import { parseDescription, toMonthIso } from "./parseDescription";

export interface PositionProps {
  position: PositionData;
}

/** Bullets shown before the rest fold into a native disclosure. A single
 * leftover bullet is shown rather than folded. */
const VISIBLE_BULLETS = 3;

const bulletList =
  "max-w-[68ch] list-['—_'] pl-[1.4em] text-base leading-[1.6] marker:text-cyan [&>li]:mt-2 [&>li]:pl-1";

/**
 * One stop on the work timeline: an LED on the rail, Geist 600 title with the
 * company in pink-ink, warm mono dates, the summary, real bullets (the first
 * few up front, the rest in a native <details>), and the technologies as a
 * dot-separated mono line. The rail itself is the parent's ::before.
 */
export function Position({ position }: PositionProps) {
  const { title, company, location, startDate, endDate, technologies } =
    position;
  const { summary, bullets } = parseDescription(position.description);
  const cut =
    bullets.length > VISIBLE_BULLETS + 1 ? VISIBLE_BULLETS : undefined;
  const shown = bullets.slice(0, cut);
  const folded = cut === undefined ? [] : bullets.slice(cut);
  const current = endDate === null;

  return (
    <article className="relative grid grid-cols-[16px_1fr] gap-x-3 pb-12 before:absolute before:top-4 before:-bottom-2 before:left-[7px] before:w-px before:bg-rim last:pb-0 last:before:hidden min-[720px]:grid-cols-[24px_1fr] min-[720px]:gap-x-5 min-[720px]:before:left-[11px]">
      <span
        aria-hidden="true"
        className={twMerge(
          "relative mt-[9px] ml-[3px] size-[9px] rounded-full bg-cyan ring-4 ring-night min-[720px]:ml-[7px] min-[720px]:mt-[11px]",
          current && "bg-warm",
        )}
      />
      <div className="min-w-0">
        <h2 className="text-[21px] leading-tight font-semibold tracking-[-0.01em] min-[720px]:text-2xl">
          {title}{" "}
          <span className="font-medium text-pink-ink">
            <span aria-hidden="true">· </span>
            <span className="sr-only">at </span>
            {company}
          </span>
        </h2>
        <p className="mt-1.5 font-mono text-xs tracking-[0.12em] text-muted uppercase">
          <span className="whitespace-nowrap text-warm">
            <time dateTime={toMonthIso(startDate)}>{startDate}</time>
            <span aria-hidden="true"> — </span>
            <span className="sr-only"> to </span>
            {endDate ? (
              <time dateTime={toMonthIso(endDate)}>{endDate}</time>
            ) : (
              "Present"
            )}
          </span>
          <span aria-hidden="true"> · </span>
          <span className="sr-only">, </span>
          <span className="whitespace-nowrap">{location}</span>
        </p>

        {summary.map((paragraph) => (
          <p
            key={paragraph}
            className="mt-4 max-w-[65ch] text-[17px] leading-[1.65]"
          >
            {paragraph}
          </p>
        ))}

        {shown.length > 0 && (
          <ul className={twMerge(bulletList, "mt-3.5")}>
            {shown.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>
        )}

        {folded.length > 0 && (
          <details className="group mt-1">
            <summary className="inline-flex min-h-11 cursor-pointer list-none items-center gap-2 rounded-ctl font-mono text-[13px] tracking-[0.12em] text-cyan uppercase hover:underline hover:underline-offset-4 [&::-webkit-details-marker]:hidden">
              <span
                aria-hidden="true"
                className="inline-block transition-transform duration-150 group-open:rotate-90"
              >
                ▸
              </span>
              <span className="group-open:hidden">
                {folded.length} more highlights
              </span>
              <span className="hidden group-open:inline">Fewer highlights</span>
            </summary>
            <ul className={bulletList}>
              {folded.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          </details>
        )}

        {technologies && technologies.length > 0 && (
          <DotList
            items={technologies}
            label={`Technologies at ${company}`}
            className="mt-[18px] max-w-[70ch]"
          />
        )}
      </div>
    </article>
  );
}
