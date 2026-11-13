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
  "measure-68 list-['—_'] pl-[1.4em] text-base leading-[1.6] marker:text-cyan [&>li]:mt-2 [&>li]:pl-1";

/**
 * One stop on the work timeline: an LED on the rail, Geist 600 title with the
 * company in pink-ink, warm mono dates, the summary, real bullets (the first
 * few up front, the rest in a native <details>), and the technologies as a
 * dot-separated mono line. The rail itself is the parent's ::before.
 *
 * Rail geometry: `--rail-x` is the rail's center line inside the first grid
 * column (16px mobile / 24px desktop). The 1px rail sits at
 * `--rail-x − 0.5px` and the 9px LED at `--rail-x − 4.5px`, so both share
 * that center; the LED's 4px night ring masks the rail where they overlap
 * (the rail starts at top-4, inside the LED). Vertically the LED centers on
 * the title's first line: 9px + 4.5px ≈ half of 21px × 1.25 leading (mobile),
 * 11px + 4.5px ≈ half of 24px × 1.25 (desktop); retune `mt-*` with the title
 * size.
 */
export function Position({ position }: PositionProps) {
  const { title, company, location, startDate, endDate, technologies } =
    position;
  const { summary, bullets, after } = parseDescription(position.description);
  const cut =
    bullets.length > VISIBLE_BULLETS + 1 ? VISIBLE_BULLETS : undefined;
  const shown = bullets.slice(0, cut);
  const folded = cut === undefined ? [] : bullets.slice(cut);
  const current = endDate === null;

  return (
    <article className="relative grid grid-cols-[16px_1fr] gap-x-3 pb-12 [--rail-x:7.5px] before:absolute before:top-4 before:-bottom-2 before:left-[calc(var(--rail-x)-0.5px)] before:w-px before:bg-rim last:pb-0 last:before:hidden min-[720px]:grid-cols-[24px_1fr] min-[720px]:gap-x-5 min-[720px]:[--rail-x:11.5px]">
      <span
        aria-hidden="true"
        className={twMerge(
          "relative mt-[9px] ml-[calc(var(--rail-x)-4.5px)] size-[9px] rounded-full bg-cyan ring-4 ring-night min-[720px]:mt-[11px]",
          current && "bg-warm",
        )}
      />
      <div className="min-w-0">
        <h2 className="text-[21px] leading-tight font-semibold tracking-[-0.01em] min-[720px]:text-2xl">
          {title}{" "}
          <span className="font-normal text-pink-ink">
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

        {summary.map((paragraph, i) => (
          <p
            // biome-ignore lint/suspicious/noArrayIndexKey: static, ordered copy
            key={i}
            className="mt-4 measure-65 text-[17px] leading-[1.65]"
          >
            {paragraph}
          </p>
        ))}

        {shown.length > 0 && (
          <ul className={twMerge(bulletList, "mt-3.5")}>
            {shown.map((bullet, i) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: static, ordered copy
              <li key={i}>{bullet}</li>
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
                <span className="sr-only"> at {company}</span>
              </span>
              <span className="hidden group-open:inline">Fewer highlights</span>
            </summary>
            <ul className={bulletList}>
              {folded.map((bullet, i) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: static, ordered copy
                <li key={i}>{bullet}</li>
              ))}
            </ul>
          </details>
        )}

        {after.map((paragraph, i) => (
          <p
            // biome-ignore lint/suspicious/noArrayIndexKey: static, ordered copy
            key={i}
            className="mt-4 measure-65 text-[17px] leading-[1.65]"
          >
            {paragraph}
          </p>
        ))}

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
