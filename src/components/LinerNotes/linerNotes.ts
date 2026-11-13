import type { Track } from "@/components/TrackList/TrackList";

export interface LinerNotesSide {
  side: string;
  title: string;
  tracks: readonly Track[];
}

/**
 * Ported from the GitHub profile's liner-notes.svg (THEtheChad/THEtheChad,
 * assets/liner-notes.svg, copied 2026-11-12).
 *
 * PLACEHOLDER: the profile README itself marks its about text and track list
 * as placeholders ("replace with your own"). Owner to confirm or replace,
 * here and on the profile.
 */
export const linerNotes: readonly LinerNotesSide[] = [
  {
    side: "Side A",
    title: "Agentic SDLC",
    tracks: [
      { title: "Claude Code · Codex" },
      { title: "Multi-agent orchestration" },
      { title: "Plan → build → review loops" },
      { title: "MCP servers · hooks" },
      { title: "Worktrees & guardrails" },
    ],
  },
  {
    side: "Side B",
    title: "Software + Hardware",
    tracks: [
      { title: "TypeScript · React · Next.js" },
      { title: "Node.js · Python · Bash" },
      { title: "Arduino · ESP · STM32" },
      { title: "Anything with a serial port" },
    ],
  },
];
