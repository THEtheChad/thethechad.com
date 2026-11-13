# Site refresh: "KC After Dark"

Synthesized from three independent design-council proposals (Astra, Fable, Wonder) and the owner's decisions (2026-11-12). This is the source of truth for the facelift; reviewers check milestones against it.

Working materials (local, outside the repo): `/home/agent/.t3/design-refresh-thethechad/`

- `mood/` — the GitHub profile's README, `hero.svg`, `liner-notes.svg`, `h-*.svg` (+ `-light`), and `build_assets.py.txt` (the generator: exact palette, fonts, motion contract)
- `mock/*.html` + `shots/proposal-*.png` — Fable's static mock of home/work/photos in dark and light. **This is the visual target.**
- `shots/site-*.png` — the site before the refresh
- `astra.md`, `fable.md`, `wonder.md` — the three proposals, condensed

## Direction

The GitHub profile ([THEtheChad/THEtheChad](https://github.com/THEtheChad/THEtheChad)) is the album cover; the site is the gatefold you open to read. Same palette, lettering, and Kansas City dusk. The hero art is the one "picture"; everything else is a clean liner-notes plate: numbered sections, neon-script headings, mono track lists, one handwritten aside. Retro comes from signage and print materials, never from simulating a broken monitor or degrading legibility.

Principles:

1. **One world.** Colors and fonts come from `build_assets.py`. No new hues.
2. **Neon is signage, not body text.** Glow only on script display headings and rules.
3. **Picture vs. page.** Scanlines, grain, and vignette live only inside framed artwork (as in `hero.svg`), never over live text.
4. **Complete at rest.** Everything is fully visible with JS disabled and with motion off. Motion is a one-shot ignition or a small CSS loop, never a gate (the generator's own contract).
5. **Reading first, phone first.** Single column, ~840px content column (every mood-board asset is 840 wide), 65ch prose.
6. **Music is the organizing metaphor.** Numbered tracklist nav, Side A / Side B liner notes, "Side C" player.

## Owner decisions

| Question                    | Decision                                                                                                                                                                                        |
| --------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Hero                        | **Vendor the profile's `hero.svg` verbatim.** Re-copy when the profile changes. Stays dark in both themes.                                                                                      |
| Home                        | **New home page at `/`**; remove the permanent `/ → /about` redirect. `/about` keeps the full story.                                                                                            |
| Light mode                  | **Follow `prefers-color-scheme` + a header toggle** (System / Light / Dark), persisted to `localStorage`, applied pre-paint with no flash. Hero and liner-notes plate stay dark in both themes. |
| Player                      | **Slim "Side C" dock on every page** (~56px). No audio bytes until the visitor presses play.                                                                                                    |
| `/employment` route         | Keep the route; nav label becomes "work". `/photography` label "photos".                                                                                                                        |
| Guest counter / snake graph | Leave out (third-party requests).                                                                                                                                                               |

## Design tokens

**Privacy (2026-11-13):** no personal details on the site or in the repo. Contact and the résumé go through the contact form only; résumé links became "Request résumé" (`/contact#resume`), and the PDF renders only behind `RESUME_ACCESS_KEY`.

Implement as CSS custom properties on `:root` (dark, canonical) overridden by `[data-theme="light"]` and by `@media (prefers-color-scheme: light)` when no explicit theme is set; expose them through Tailwind 4 `@theme inline`. No `dark:` variant sprawl.

| Token        | Dark      | Light     | Source / role                                    |
| ------------ | --------- | --------- | ------------------------------------------------ |
| `night`      | `#0d0b14` | `#fbf8ff` | `NIGHT`; page ground                             |
| `ink`        | `#07060d` | `#ffffff` | `INK`; wells, inputs, player dock                |
| `raise`      | `#140d23` | `#f3edfb` | hover / raised surface                           |
| `rim`        | `#3a1f5c` | `#d9cdee` | `RIM`; **decorative borders only** (1.42:1)      |
| `rim-strong` | `#7a5aa8` | `#8a74b5` | control boundaries (≥3:1)                        |
| `text`       | `#f3e9ff` | `#1b1240` | `TEXT` (16.7:1 / 16.6:1)                         |
| `muted`      | `#b8a6d9` | `#5b4a80` | `MUTED`; secondary text (8.8 / 7.3)              |
| `subtle`     | `#9484b8` | `#6f5f93` | tertiary meta (5.8 / 5.4)                        |
| `pink`       | `#ff3ea5` | `#c2186b` | `PINK`; rules, primary button fill, neon halo    |
| `pink-ink`   | `#ff65b8` | `#c2186b` | `PINK_SOFT`; pink **text**, numerals (7.3 / 5.5) |
| `cyan`       | `#2de2e6` | `#0e7490` | `CYAN`; labels, links, focus ring (12.2 / 5.1)   |
| `warm`       | `#ffcf7a` | `#8a5a00` | `WARM`; dates, "current" state                   |
| `red`        | `#ff4433` | `#b42318` | `RED` (Western Auto); wordmark "the", errors     |
| `core`       | `#fff0fa` | `#c2186b` | neon tube core for script headings               |

Rules: primary button is **dark text on pink** (white on pink is 3.24:1 and fails). The dusk gradient (`#0b0620 → #1b1240 → #4b1d6b → #b0306a → #ff8a6b`) appears only inside artwork. Delete the old tokens (`#005fff`, `#00cfff`, `#ff0080`, `#06060f`, `#0c0c1e`, `#181830`, `#5a6080`).

## Typography

All via `next/font/google`, `subsets: ["latin"]`, `display: "swap"`. **Fix the current bug:** the Geist variable is defined on `<body>` but read on `<html>`, so prose falls back to the system font; put font variables on `<html>`.

| Role                                             | Family             | Size                                                                                        |
| ------------------------------------------------ | ------------------ | ------------------------------------------------------------------------------------------- |
| Page title (h1), section word                    | Yellowtail 400     | h1 `clamp(2.75rem, 6vw, 4.5rem)`; section 44px desktop / 36px mobile; short lowercase words |
| Prose                                            | Geist              | 17px / 1.7, max 65ch; lead paragraph 20px                                                   |
| h3, job titles, card titles                      | Geist 600          | 19–24px                                                                                     |
| Nav, labels, indices, dates, track lists, player | Geist Mono         | labels 12px caps, 0.2em tracking; rows 15px; **never under 12px**                           |
| One aside per page max                           | Cedarville Cursive | 22px, rotated −4°                                                                           |
| Wordmark "the"                                   | Ultra              | baked into an inline SVG; no web font                                                       |

Remove VT323 and Press Start 2P entirely.

## Shape, spacing, glow, motion

- Plates/cards: 16px radius, 2px `rim` border (from `liner-notes.svg` `rx=16`). Controls and photos: 8px radius. Tags: dot-separated mono text, not badge boxes. Replace `corner-frame` brackets with the section-header motif.
- Spacing: 4px base; 72px between sections; gutters `clamp(16px, 4vw, 32px)`; content column ~840px.
- Glow: the generator's `neon_filter` as a `text-shadow` stack (`core` text, pink halos ~1.5/4/8px) on script headings only; 2px soft glow on the pink→cyan fading rule. Nothing else glows. Cards get no glow.
- Focus: `:focus-visible` 2px `cyan` outline, 3px offset, everywhere. Skip link to `<main>`.
- Motion: h1 neon "ignition" flicker once on load (`.flk` from `h-*.svg`); section rule draws in over 400ms; hovers 150ms. Allowed CSS-only loops: hero's own animations, EQ bars **only while audio plays**. Banned: typewriter gates, perpetual flicker or noise over text, glitch, parallax. `@media (prefers-reduced-motion: reduce)`: `animation: none; transition: none`, hero shows final formation (the generator's `REDUCED_MOTION` rule).

## Information architecture and components

Shared chrome (replaces fixed sidebar + inner scroller; normal document scroll):

- **Skip link** → `#main`.
- **`SiteHeader`** (sticky, 56px): `Wordmark` (THE · red slab "the" · CHAD, links home) + numbered mono nav `01 about · 02 work · 03 projects · 04 photos · 05 contact`; active item = `pink-ink` + pink→cyan rule + `aria-current="page"`; `ThemeToggle`. Under 720px: a MENU button opening a native `<dialog>` track-list sheet.
- **`SiteFooter`**: `BEST VIEWED AFTER MIDNIGHT · KANSAS CITY, MO`, GitHub / LinkedIn / Résumé links, one Cedarville caption ("recorded in Kansas City").
- **`TapeDeck`** dock (replaces `RetroAmp`): play/pause, title/artist, progress hairline, CSS EQ bars while playing, expandable track list/albums sheet, labelled seek + volume. `preload="none"`, no `audio.load()` on mount, no `AudioContext` before play. Reserves its height (page padding) so it never covers content. Marquee only if the title overflows, paused on hover/focus/reduced-motion. Keep album attribution visible in the track list.

Pages:

| Route                     | Content                                                                                                                                                                                                                                                                           |
| ------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/` (new)                 | `SkylineHero` (vendored `hero.svg`); `01 about` intro + portrait + CTAs (Résumé, GitHub, Contact); `02 the stack` `LinerNotes` (Side A: agentic SDLC; Side B: software + hardware, from the profile's liner notes); `03 now playing` (points at the dock); `04 lately` (projects) |
| `/about`                  | Lead paragraph + 65ch prose; "many hats" as a track list; portrait card                                                                                                                                                                                                           |
| `/employment` ("work")    | Per position: Geist 600 title, `pink-ink` company, `warm` mono dates, real bullet lists, `technologies` as a mono dot-separated line (data exists, currently unrendered); timeline rail; résumé button                                                                            |
| `/projects`               | Whole-card links, 2 columns from 720px, mono track numerals                                                                                                                                                                                                                       |
| `/photography` ("photos") | Full-color photos by default (no grayscale, scanlines, or glitch), numbered captions, existing native `<dialog>` lightbox restyled; alt/captions from a metadata file                                                                                                             |
| `/contact`                | Server page + client `ContactForm`: visible labels, 44px inputs at 16px, `aria-live` status, keeps input on failure, "Send message"                                                                                                                                               |

Component plan (named exports; colocated per owner conventions):

- **Remove:** `CrtOverlay`, `PixelGlitch`, `RezColumns`, `Background`, `TypingTitle`, `Sidebar`, `AudioAnalyserContext`, `.crt-*` / `.glitch-text` / `.neon-box` / `corner-frame` CSS, and `immer` if nothing else uses it.
- **Rework:** `Section` → `SectionHeader` (server component, no JS: mono index + Yellowtail word + fading rule; real heading element, level via prop); `Navigation` → `SiteHeader`; `RetroAmp` → `TapeDeck`; `Marquee` (overflow-only); `Gallery` → `photography/_components/Gallery/Gallery.tsx` named export (+ `components/Lightbox`).
- **New:** `src/components/{SkylineHero,SectionHeader,Plate,LinerNotes,TrackList,Wordmark,TapeDeck,ThemeToggle}/…`, `src/app/(default-layout)/_components/{SiteHeader,SiteFooter}/…`, `employment/_components/Position`, `projects/_components/ProjectCard`, `contact/_components/ContactForm`.
- **Untouched:** `ResumePdf` (print document). Edits to `src/data/resume.ts` also change the PDF; keep them minimal and call them out.
- No new dependencies.

## Content rules

Don't invent facts. Positioning copy comes from the profile README ("all-in on AI and the agentic SDLC … TypeScript, React, Next.js … microcontrollers"). Where owner input is needed (photo titles/alt text, the placeholder project description in `resume.ts`, Side A track list), use clearly marked placeholders and list them in the milestone report.

## Acceptance (global, checked every milestone)

- `pnpm lint`, `pnpm exec tsc --noEmit`, `pnpm build` green; pages stay static (`○`).
- No horizontal scroll at 360px; every route usable at 360 / 400 / 768 / 1440.
- All text ≥4.5:1 (≥3:1 only for ≥24px display); control boundaries and focus ≥3:1; both themes.
- ≥44px touch targets; no text under 12px; one `h1` per route; no skipped heading levels.
- Content visible in server HTML with JS disabled.
- Zero `<canvas>` and zero `requestAnimationFrame` loops at rest (after M1); no MP3 bytes before play (after M4); no original-resolution photo requests (after M1).
- `prefers-reduced-motion` honored.

## Milestones

Each milestone is one or more Conventional Commits, reviewed by the council (Astra, Fable, Wonder) before the next starts.

1. **Foundation.** Tokens (both themes) + `ThemeToggle` with no-flash pre-paint script; fonts (fix Geist, add Geist Mono, Yellowtail, Cedarville; drop VT323 + Press Start 2P); document-scroll shell with `SiteHeader` (incl. mobile `<dialog>` menu), `SiteFooter`, skip link; global focus + reduced-motion; `SectionHeader` replacing `Section`; remove CRT/glitch/typing/background effects and their CSS. Existing page content restyled just enough to use the new tokens. Player stays functional (restyle later). _Accept:_ global acceptance; side-by-side with `mock/` header/footer; no theme flash on reload.
2. **Home + identity.** Vendored hero in `SkylineHero`; `Wordmark`; `Plate`; `LinerNotes`; `TrackList`; `/` as a real page per the IA table; remove the redirect. _Accept:_ hero matches `hero.svg`; home complete with JS and animation off; dark plates in light theme.
3. **Reading pages.** About, work, projects, contact per the page table. _Accept:_ 65ch measure, real bullets, technologies line, whole-card links, keyboard-only contact form run with pending/success/error states (mock the API; never send real email).
4. **Photos + player.** Gallery/Lightbox move and restyle (keep native-dialog focus behavior); `TapeDeck` replaces `RetroAmp`; remove `AudioAnalyserContext` and unused deps. _Accept:_ no MP3 bytes before play; full-color photos; lightbox keyboard run; player usable at 360px and never covers content.
5. **Polish.** Favicon/OG image from hero art; per-route metadata titles; dead-code/CSS sweep; final axe + Lighthouse pass in both themes. _Accept:_ Lighthouse a11y 100, CLS < 0.05; Biome clean.
