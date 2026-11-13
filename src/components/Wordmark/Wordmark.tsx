import Link from "next/link";

/**
 * Placeholder wordmark: THE · red slab "the" · CHAD.
 * M2 replaces the inner markup with an inline SVG that bakes in Ultra.
 */
export function Wordmark() {
  return (
    <Link
      href="/"
      aria-label="THEtheChad, home"
      className="inline-flex min-h-11 shrink-0 items-center gap-1.5 font-mono text-sm font-medium tracking-[0.22em] text-cyan"
    >
      <span aria-hidden="true">THE</span>
      <span
        aria-hidden="true"
        className="font-serif text-[19px] font-black tracking-normal text-red [text-shadow:var(--glow-red)]"
      >
        the
      </span>
      <span aria-hidden="true">CHAD</span>
    </Link>
  );
}
