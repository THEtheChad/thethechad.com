import Image, { type StaticImageData } from "next/image";
// Vendored verbatim from the GitHub profile; see ./README.md before editing.
import heroSvg from "./hero.svg";

const hero: StaticImageData = heroSvg;

/** The profile README's own alt text for hero.svg. */
const HERO_ALT =
  'THEtheChad: a drone light show spells THE and CHAD over the Kansas City skyline at dusk, with the Western Auto sign glowing "the" between them';

/** The line the artwork sets at 12px inside the 840-wide frame. */
const TAGLINE = ["Kansas City, MO", "Agentic SDLC / AI / Hardware"] as const;

/**
 * The profile's hero.svg, rendered as an image so the vendored file stays
 * sealed: its own styles, ids and reduced-motion rule never touch the page.
 * The 840×400 intrinsic size reserves the box before the file arrives, and
 * the artwork is dark in both themes because it paints its own sky.
 *
 * Until the art reaches its native 840px (~904px viewport) its tagline renders
 * under 12px, so a real-text copy shows beneath it; above that it is
 * screen-reader-only (the alt text describes the picture, not the tagline).
 */
export function SkylineHero() {
  return (
    <div className="pt-3 pb-5 max-[720px]:-mx-(--gutter) min-[720px]:pt-7">
      <Image
        src={hero}
        alt={HERO_ALT}
        preload
        sizes="(min-width: 904px) 840px, 100vw"
        className="block h-auto w-full"
      />
      <p className="sr-only text-center font-mono text-xs leading-[1.8] tracking-[0.14em] text-muted uppercase max-[904px]:not-sr-only max-[904px]:mt-2.5 max-[904px]:block max-[904px]:px-4">
        {/* Each half stays whole, so a narrow screen breaks at the dot. */}
        <span className="inline-block">{TAGLINE[0]}</span> <span>·</span>{" "}
        <span className="inline-block">{TAGLINE[1]}</span>
      </p>
    </div>
  );
}
