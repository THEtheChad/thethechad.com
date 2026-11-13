import type { ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import { PcbTrace } from "./components/PcbTrace/PcbTrace";

export interface PlateProps {
  /**
   * `dark` (default) keeps the liner-notes look in both themes, like the
   * profile's liner-notes.svg; `page` follows the visitor's theme.
   */
  tone?: "dark" | "page";
  /**
   * Optional small print for the plate's foot, set beside a PCB trace (the
   * bottom row of liner-notes.svg). Mono, not handwriting: the footer already
   * holds the page's one handwritten aside.
   */
  caption?: string;
  className?: string;
  children: ReactNode;
}

/** A liner-notes plate: 16px radius, 2px rim, no glow. */
export function Plate({
  tone = "dark",
  caption,
  className,
  children,
}: PlateProps) {
  return (
    <div
      className={twMerge(
        "rounded-plate border-2 border-rim bg-night p-[clamp(20px,5vw,44px)] text-text",
        tone === "dark" && "theme-dark",
        className,
      )}
    >
      {children}
      {caption && (
        <div className="mt-6 flex items-end justify-between gap-4">
          <PcbTrace />
          <p className="label text-right text-subtle">{caption}</p>
        </div>
      )}
    </div>
  );
}
