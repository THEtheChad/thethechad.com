import Link from "next/link";
import { ULTRA_THE_PATH, ULTRA_THE_VIEWBOX } from "./ultraThe";

/**
 * THE · red slab "the" · CHAD, linking home. The mono caps are live text in
 * cyan; the slab "the" is Ultra baked to outlines (no web font) in the
 * Western Auto red, with a neon halo in dark mode only.
 */
export function Wordmark() {
  return (
    <Link
      href="/"
      aria-label="THE the Chad, home"
      className="inline-flex min-h-11 shrink-0 items-center"
    >
      <span
        aria-hidden="true"
        className="inline-flex items-baseline gap-[7px] font-mono text-sm font-medium tracking-[0.22em] text-cyan"
      >
        <span>THE</span>
        <svg
          viewBox={ULTRA_THE_VIEWBOX}
          width={43}
          height={16}
          className="wordmark-the translate-y-px fill-red"
          aria-hidden="true"
          focusable="false"
        >
          <path d={ULTRA_THE_PATH} />
        </svg>
        <span>CHAD</span>
      </span>
    </Link>
  );
}
