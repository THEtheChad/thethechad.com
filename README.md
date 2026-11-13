# thethechad.com

Chad Elliott's personal site: a Next.js App Router site in the "KC After Dark"
style of the [GitHub profile](https://github.com/THEtheChad/THEtheChad). The
design plan and its decisions live in
[`docs/design/refresh-plan.md`](docs/design/refresh-plan.md).

## Getting started

Requires Node 26 (pinned in `.node-version`, which `fnm` picks up, and in
`engines.node`, which Vercel reads) and pnpm 12 (pinned via `packageManager`).
Node 25+ no longer bundles Corepack, so install pnpm once from
https://pnpm.io/installation; any pnpm ≥ 10 switches itself to the pinned
version. pnpm 9 cannot read this lockfile.

```bash
pnpm install
pnpm dev
```

## Scripts

| Script                                    | What it does                                                                                                                                                                                                                 |
| ----------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `pnpm dev` / `pnpm build`                 | Regenerate the hero still frame, then run Next with **webpack** (Turbopack ignores `adjustFontFallback: false`; the build then fails if next/font's own fallback faces sneak back in, see `scripts/checkFontFallbacks.mjs`). |
| `pnpm lint`                               | Biome, plus guards: the two light-theme token blocks in `globals.css` match (`scripts/checkThemeTokens.mjs`), the theme script's CSP hash is current (`scripts/checkCspHash.mjs`), and `hero-static.svg` is up to date.      |
| `pnpm exec tsc --noEmit`                  | Type-check (TypeScript 7).                                                                                                                                                                                                   |
| `pnpm hero:static`                        | Regenerate `src/components/SkylineHero/hero-static.svg` from the vendored `hero.svg`.                                                                                                                                        |
| `node scripts/buildFavicon.mjs . src/app` | Regenerate `icon.svg` / `favicon.ico` from the wordmark outline.                                                                                                                                                             |

## Content

- **Résumé data:** `src/data/resume.ts` (public data only) feeds the pages
  and the private PDF at `/api/resume` (`src/components/ResumePdf`).
- **Photos:** files in `public/photography/`, listed with alt text, size and
  year in `src/data/photos.ts`. The build fails if an entry has no file.
- **Music:** `public/music/<label>/<album>/` holding `Artist - Album - NN Title.mp3`
  files, an optional `cover.(jpg|png|webp)` and an `attribution.json`
  (`{ "album", "artist", "url" }`, all strings). Read at build time by
  `src/components/TapeDeck/loadAlbums.ts`; a malformed attribution file
  fails the build.
- **Hero art:** `src/components/SkylineHero/hero.svg` is vendored verbatim
  from the GitHub profile; see that folder's README before touching it.

## Environment

The contact form (`/api/contact`) sends mail through [Resend](https://resend.com):

| Variable            |                                                               |
| ------------------- | ------------------------------------------------------------- |
| `RESEND_API_KEY`    | Required to send. Without it the form reports a server error. |
| `CONTACT_EMAIL`     | Required. Where messages are delivered.                       |
| `RESEND_FROM_EMAIL` | Optional sender; defaults to `onboarding@resend.dev`.         |

The résumé is not public (it carries contact details). Visitors request it
with the contact form's "send me your résumé" box (`/contact#resume`
pre-ticks it); the email arrives as `[Résumé request]`. The PDF renders only
for the owner:

| Variable            |                                                                              |
| ------------------- | ---------------------------------------------------------------------------- |
| `RESUME_ACCESS_KEY` | Required. `/api/resume?key=<value>` renders the PDF; anything else is a 404. |
| `RESUME_EMAIL`      | Optional. The email printed on the PDF. Kept out of the repo on purpose.     |

No personal details (email, phone, address) belong in the repo: it is public.

## Conventions

Conventional Commits; pnpm only; named exports except where Next requires a
default; components colocated as `components/Name/Name.tsx` with
subcomponents under `components/Name/components/`; design tokens only (no hex
in TSX), component CSS in `@layer components`.
