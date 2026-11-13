export interface ParsedDescription {
  /** Paragraphs before the bullet list. */
  summary: string[];
  /** The bullet items, in order; wrapped continuation lines are joined. */
  bullets: string[];
  /** Paragraphs after the bullet list. */
  after: string[];
}

const BULLET = /^[-*]\s+/;
const LEAD_IN = /^key impact:?$/i;

/** Drop Markdown emphasis markers (the web shows plain text; the PDF styles). */
const plain = (text: string) => text.replace(/\*\*(.+?)\*\*/g, "$1").trim();

/**
 * Split a résumé description (a tiny Markdown subset: paragraphs, an optional
 * "Key impact:" lead-in, then "- " or "* " bullets) into the paragraphs
 * before the list, the bullets, and any paragraphs after it, preserving
 * order. Consecutive lines form one paragraph; an indented or unmarked line
 * directly under a bullet continues that bullet. The lead-in is dropped: the
 * list's own styling carries it.
 */
export function parseDescription(description: string): ParsedDescription {
  const summary: string[] = [];
  const bullets: string[] = [];
  const after: string[] = [];
  let paragraph: string[] = [];
  let inBullet = false;

  const flush = () => {
    if (paragraph.length === 0) return;
    (bullets.length > 0 ? after : summary).push(plain(paragraph.join(" ")));
    paragraph = [];
  };

  for (const raw of description.split("\n")) {
    const line = raw.trim();
    if (!line) {
      flush();
      inBullet = false;
      continue;
    }
    if (LEAD_IN.test(plain(line))) {
      flush();
      continue;
    }
    if (BULLET.test(line)) {
      flush();
      bullets.push(plain(line.replace(BULLET, "")));
      inBullet = true;
    } else if (inBullet) {
      bullets[bullets.length - 1] = plain(
        `${bullets[bullets.length - 1]} ${line}`,
      );
    } else {
      paragraph.push(line);
    }
  }
  flush();

  return { summary, bullets, after };
}

const months = [
  "jan",
  "feb",
  "mar",
  "apr",
  "may",
  "jun",
  "jul",
  "aug",
  "sep",
  "oct",
  "nov",
  "dec",
];

/** "Sep 2023" → "2023-09" for `<time dateTime>`; undefined if unrecognized. */
export function toMonthIso(date: string): string | undefined {
  const match = /^([a-z]{3})[a-z]*\s+(\d{4})$/i.exec(date.trim());
  if (!match) return undefined;
  const month = months.indexOf(match[1].toLowerCase());
  if (month < 0) return undefined;
  return `${match[2]}-${String(month + 1).padStart(2, "0")}`;
}
