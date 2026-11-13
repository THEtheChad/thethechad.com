import { Plate } from "@/components/Plate/Plate";
import { SectionHeader } from "@/components/SectionHeader/SectionHeader";

/**
 * Home §03: points at the TapeDeck docked at the foot of every page. Copy
 * only; the jump link focuses the deck's `#music-player` landmark.
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
            className="theme-dark relative hidden size-[132px] overflow-hidden rounded-[10px] border-2 border-rim bg-linear-to-b from-dusk-top via-dusk-mid to-dusk-low min-[720px]:block"
          >
            <span className="absolute -bottom-[34px] left-1/2 size-24 -translate-x-1/2 rounded-full bg-linear-to-b from-warm to-pink" />
          </div>
          <div>
            <p className="label text-cyan">
              Side C<span className="sr-only">:</span>{" "}
              <span aria-hidden="true">·</span> Sound on{" "}
              <span aria-hidden="true">♪</span>
            </p>
            <h3 className="mt-2 text-[22px] font-semibold">
              Free-to-use synthwave, on the deck
            </h3>
            <p className="mt-2 measure-60 text-[17px] leading-[1.7] text-muted">
              The player is docked at the bottom of every page and keeps playing
              as you move around the site. Press play there whenever you like.
            </p>
            {/* The player needs JS, so the jump link does too. */}
            <a
              href="#music-player"
              className="js-only mt-2 inline-flex min-h-11 items-center font-mono text-[13px] tracking-[0.12em] text-pink-ink uppercase underline-offset-4 hover:underline"
            >
              <span aria-hidden="true">↓&nbsp;</span>Go to the player
            </a>
          </div>
        </div>
      </Plate>
    </section>
  );
}
