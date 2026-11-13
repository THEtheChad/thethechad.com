import { Plate } from "@/components/Plate/Plate";
import { SectionHeader } from "@/components/SectionHeader/SectionHeader";

/**
 * Home §03: points at the player docked at the foot of every page. Copy only;
 * the deck itself is redesigned (as TapeDeck) in M4.
 */
export function HomeNowPlaying() {
  return (
    <section aria-labelledby="now-playing">
      <SectionHeader index="03" title="now playing" id="now-playing" />
      <Plate tone="page">
        <div className="grid items-center gap-6 min-[720px]:grid-cols-[132px_1fr] min-[720px]:gap-7">
          {/* Dusk swatch from the hero's sky gradient; decorative. */}
          <div
            aria-hidden="true"
            className="relative hidden size-[132px] overflow-hidden rounded-[10px] border-2 border-rim bg-linear-to-b from-[#0b0620] via-[#4b1d6b] to-[#ff8a6b] min-[720px]:block"
          >
            <span className="absolute -bottom-[34px] left-1/2 size-24 -translate-x-1/2 rounded-full bg-linear-to-b from-[#ffcf7a] to-[#ff3ea5]" />
          </div>
          <div>
            <p className="label text-cyan">
              Side C <span aria-hidden="true">·</span> Sound on{" "}
              <span aria-hidden="true">♪</span>
            </p>
            <h3 className="mt-2 text-[22px] font-semibold">
              Free-to-use synthwave, on the deck
            </h3>
            <p className="mt-2 max-w-[60ch] text-[17px] leading-[1.7] text-muted">
              The player is docked at the bottom of every page and keeps playing
              as you move around the site. Press play there whenever you like.
            </p>
            <p
              aria-hidden="true"
              className="mt-4 font-mono text-[13px] tracking-[0.12em] text-pink-ink uppercase"
            >
              ↓ deck below
            </p>
          </div>
        </div>
      </Plate>
    </section>
  );
}
