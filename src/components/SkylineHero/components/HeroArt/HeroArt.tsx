"use client";

import { getImageProps } from "next/image";
import { useState } from "react";
import { preload } from "react-dom";
// Vendored verbatim from the GitHub profile; see ../../README.md before editing.
import hero from "../../hero.svg";
// Generated still frame (final formation, nothing loops): buildStaticHero.mjs.
import heroStatic from "../../hero-static.svg";

/** The profile README's own alt text for hero.svg. */
const HERO_ALT =
  // The page's sr-only h1 already says the name, so the profile's
  // "THEtheChad: " prefix is dropped here.
  'A drone light show spells THE and CHAD over the Kansas City skyline at dusk, with the Western Auto sign glowing "the" between them';

const REDUCE = "(prefers-reduced-motion: reduce)";

const { props: img } = getImageProps({
  src: hero,
  alt: HERO_ALT,
  loading: "eager",
  fetchPriority: "high",
  className: "block h-auto w-full",
});

/**
 * The hero image plus its pause control (WCAG 2.2.2: the art loops its bulb
 * chase, star twinkle and blink indefinitely).
 *
 * Pausing swaps the <img> to hero-static.svg, the art's own reduced-motion
 * frame. Visitors with reduced motion get that file from the <picture>
 * source with no JS and no toggle (there is nothing to pause, so the button
 * is hidden for them). The button floats over the sky's top-right corner, so
 * showing it never moves layout, and it is JS-only (`.js-only`).
 */
export function HeroArt() {
  const [paused, setPaused] = useState(false);

  // Fetch only the variant this visitor will see.
  preload(hero.src, {
    as: "image",
    fetchPriority: "high",
    media: "(prefers-reduced-motion: no-preference)",
  });
  preload(heroStatic.src, {
    as: "image",
    fetchPriority: "high",
    media: REDUCE,
  });

  const label = paused ? "Play animation" : "Pause animation";

  return (
    <div className="relative">
      <picture>
        {!paused && <source media={REDUCE} srcSet={heroStatic.src} />}
        <img {...img} alt={HERO_ALT} src={paused ? heroStatic.src : img.src} />
      </picture>
      <button
        type="button"
        onClick={() => setPaused(!paused)}
        // Warm the still frame on intent so pausing doesn't blank the art.
        onPointerEnter={() => preload(heroStatic.src, { as: "image" })}
        onFocus={() => preload(heroStatic.src, { as: "image" })}
        aria-label={label}
        title={label}
        data-hero-paused={paused ? "" : undefined}
        className="js-only theme-dark group absolute top-0.5 right-0.5 grid size-11 cursor-pointer place-items-center rounded-full motion-reduce:hidden min-[720px]:top-2 min-[720px]:right-2"
      >
        <span className="grid size-8 place-items-center rounded-full border border-rim-strong bg-ink/80 text-text transition-colors duration-150 group-hover:border-cyan group-hover:text-cyan">
          <svg
            aria-hidden="true"
            viewBox="0 0 12 12"
            className="size-3 fill-current"
          >
            {paused ? (
              <path d="M2.5 1.5v9l8-4.5z" />
            ) : (
              <path d="M2 1.5h3v9H2zM7 1.5h3v9H7z" />
            )}
          </svg>
        </span>
      </button>
    </div>
  );
}
