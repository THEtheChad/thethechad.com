import { twMerge } from "tailwind-merge";

export interface SectionHeaderProps {
  /** Track number shown before the word, e.g. "02". */
  index: string;
  /** Short lowercase word set in neon script. */
  title: string;
  /** Heading element; a page title is `h1`, sections inside a page `h2`. */
  as?: "h1" | "h2" | "h3";
  id?: string;
  className?: string;
}

/**
 * The section-header motif from mood/h-*.svg: mono index, short tick, neon
 * Yellowtail word, then a pink→cyan rule that fades out. Server-rendered and
 * complete without JS; the page title ignites once and the rule draws in,
 * both disabled under reduced motion.
 */
export function SectionHeader({
  index,
  title,
  as: Heading = "h2",
  id,
  className,
}: SectionHeaderProps) {
  const isPageTitle = Heading === "h1";

  return (
    <div
      className={twMerge(
        "mt-18 mb-7 flex items-center gap-2.5 min-[720px]:gap-3",
        isPageTitle && "mt-12",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="font-mono text-[13px] tracking-[0.08em] text-cyan"
      >
        {index}
      </span>
      <span
        aria-hidden="true"
        className="h-[1.5px] w-[18px] shrink-0 -translate-y-1.5 bg-cyan"
      />
      <Heading
        id={id}
        data-ignite={isPageTitle ? "" : undefined}
        className={`section-word py-1.5 pr-1.5 font-script leading-none font-normal whitespace-nowrap ${
          isPageTitle
            ? "text-[clamp(2.75rem,6vw,4.5rem)]"
            : "text-4xl min-[720px]:text-[44px]"
        }`}
      >
        {title}
      </Heading>
      <span
        aria-hidden="true"
        className="section-rule h-0.5 min-w-6 flex-1 translate-y-1 rounded-[1px]"
      />
    </div>
  );
}
