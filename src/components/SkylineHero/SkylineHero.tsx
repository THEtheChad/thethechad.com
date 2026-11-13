import { HeroArt } from "./components/HeroArt/HeroArt";

/** The line the artwork sets at 12px inside the 840-wide frame. */
const TAGLINE = ["Kansas City, MO", "Agentic SDLC / AI / Hardware"] as const;

/**
 * The profile's hero.svg, rendered as an image so the vendored file stays
 * sealed: its own styles, ids and reduced-motion rule never touch the page.
 * The 840×400 intrinsic size reserves the box before the file arrives, and
 * the artwork is dark in both themes because it paints its own sky. HeroArt
 * adds the pause control and the reduced-motion still frame.
 *
 * Until the art reaches its native 840px (~904px viewport) its tagline renders
 * under 12px, so a real-text copy shows beneath it; above that it is
 * screen-reader-only (the alt text describes the picture, not the tagline).
 */
export function SkylineHero() {
  return (
    <div className="pt-3 pb-5 max-[719px]:-mx-(--gutter) min-[720px]:pt-7">
      <HeroArt />
      <p className="sr-only text-center font-mono text-xs leading-[1.8] tracking-[0.14em] text-muted uppercase max-[904px]:not-sr-only max-[904px]:mt-2.5 max-[904px]:block max-[904px]:px-4">
        {/* Each half stays whole, so a narrow screen breaks at the dot. */}
        <span className="inline-block">{TAGLINE[0]}</span> <span>·</span>{" "}
        <span className="inline-block">{TAGLINE[1]}</span>
      </p>
    </div>
  );
}
