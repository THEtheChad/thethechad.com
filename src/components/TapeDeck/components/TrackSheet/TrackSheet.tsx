import Image from "next/image";
import type { AudioPlayer } from "../../hooks/useAudioPlayer";
import type { Album } from "../../types";
import { Transport } from "../Transport/Transport";

export function formatTime(s: number): string {
  if (!Number.isFinite(s) || s < 0) return "0:00";
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

const pad = (n: number) => String(n).padStart(2, "0");

/** Inside the sheet's scroller, an outset ring would be clipped. */
const insetRing = "focus-visible:-outline-offset-2";

export interface TrackSheetProps {
  id: string;
  open: boolean;
  albums: Album[];
  player: AudioPlayer;
}

/**
 * The deck's expandable sheet: seek, transport and volume, the albums with
 * their attribution, and the current album's track list. A non-modal
 * disclosure: the dock's toggle owns it (Escape and outside clicks close it,
 * see TapeDeck). Covers and their requests exist only while it is open.
 */
export function TrackSheet({ id, open, albums, player }: TrackSheetProps) {
  const { album, albumIdx, trackIdx, playing, currentTime, duration, volume } =
    player;

  return (
    <section
      id={id}
      hidden={!open}
      aria-label="Track list"
      className="max-h-[calc(100dvh-var(--header-h)-var(--dock-h)-16px)] overflow-y-auto overscroll-contain border-b border-rim"
    >
      {open && (
        <div className="site-column grid gap-x-10 gap-y-6 py-5 min-[720px]:grid-cols-[minmax(0,15rem)_minmax(0,1fr)]">
          {/* Seek · transport · volume */}
          <div className="min-[720px]:col-span-2">
            <div className="flex items-center gap-3">
              <span className="w-10 shrink-0 font-mono text-xs text-muted tabular-nums">
                {formatTime(currentTime)}
              </span>
              <input
                type="range"
                aria-label="Seek"
                aria-valuetext={`${formatTime(currentTime)} of ${formatTime(duration)}`}
                min={0}
                max={duration || 0}
                step={1}
                value={Math.min(currentTime, duration || 0)}
                disabled={!duration}
                onChange={(e) => player.seek(Number(e.target.value))}
                className="deck-range min-w-0 flex-1"
              />
              <span className="w-10 shrink-0 text-right font-mono text-xs text-muted tabular-nums">
                {formatTime(duration)}
              </span>
            </div>
            <div className="mt-2 flex flex-wrap items-center justify-between gap-x-6 gap-y-2">
              <Transport
                playing={playing}
                onToggle={player.toggle}
                onPrev={player.prev}
                onNext={player.next}
              />
              <label className="flex items-center gap-3">
                <span className="label text-muted">Volume</span>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.05}
                  value={volume}
                  aria-valuetext={`${Math.round(volume * 100)}%`}
                  onChange={(e) => player.setVolume(Number(e.target.value))}
                  className="deck-range w-28"
                />
                <span
                  aria-hidden="true"
                  className="w-8 text-right font-mono text-xs text-muted tabular-nums"
                >
                  {Math.round(volume * 100)}
                </span>
              </label>
            </div>
          </div>

          {/* Albums + attribution */}
          <div>
            <h2 className="label text-cyan">Albums</h2>
            <ul className="mt-3 space-y-1">
              {albums.map((a, i) => (
                <li key={a.name}>
                  <button
                    type="button"
                    aria-pressed={i === albumIdx}
                    onClick={() => player.selectAlbum(i)}
                    className={`flex w-full items-center gap-3 rounded-ctl border p-1.5 text-left transition-colors duration-150 hover:bg-raise ${insetRing} ${
                      i === albumIdx ? "border-pink" : "border-transparent"
                    }`}
                  >
                    {a.coverUrl ? (
                      <Image
                        src={a.coverUrl}
                        alt=""
                        width={44}
                        height={44}
                        className="size-11 shrink-0 rounded-sm object-cover"
                      />
                    ) : (
                      <span
                        aria-hidden="true"
                        className="size-11 shrink-0 rounded-sm bg-linear-to-b from-dusk-top via-dusk-mid to-dusk-low"
                      />
                    )}
                    <span className="min-w-0">
                      <span className="block truncate text-sm text-text">
                        {a.name}
                      </span>
                      <span className="block truncate font-mono text-xs text-muted">
                        {a.artist}
                      </span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Current album's tracks */}
          <div className="min-w-0">
            <h2 className="label text-cyan">
              Tracks <span aria-hidden="true">·</span>{" "}
              <span className="text-muted normal-case tracking-normal">
                {album?.name}
              </span>
            </h2>
            {album?.attributionUrl && (
              <p className="mt-1 font-mono text-xs text-muted">
                Music by {album.artist}.{" "}
                <a
                  href={album.attributionUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center text-cyan underline underline-offset-4 hover:text-text"
                >
                  Album page<span aria-hidden="true">&nbsp;↗</span>
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </p>
            )}
            <ol className="mt-1">
              {album?.tracks.map((t, i) => {
                const current = i === trackIdx;
                return (
                  <li key={t.url}>
                    <button
                      type="button"
                      aria-current={current ? "true" : undefined}
                      onClick={() =>
                        current ? player.toggle() : player.play(albumIdx, i)
                      }
                      className={`grid min-h-11 w-full grid-cols-[2rem_minmax(0,1fr)] items-baseline gap-x-2 rounded-ctl px-2 py-2 text-left font-mono transition-colors duration-150 hover:bg-raise ${insetRing} ${
                        current ? "bg-raise" : ""
                      }`}
                    >
                      <span
                        className={`text-[13px] tabular-nums ${current ? "text-warm" : "text-pink-ink"}`}
                      >
                        {pad(i + 1)}
                      </span>
                      <span className="min-w-0">
                        <span className="block text-[15px] text-text">
                          {t.title}
                        </span>
                        <span className="block text-xs text-muted">
                          {t.artist}
                        </span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      )}
    </section>
  );
}
