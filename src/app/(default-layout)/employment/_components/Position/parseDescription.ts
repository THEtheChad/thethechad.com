export interface ParsedDescription {
  /** Plain paragraphs that open the description. */
  summary: string[];
  /** The "- " bullet lines, in order. */
  bullets: string[];
}

/**
 * Split a résumé description (a tiny Markdown subset: paragraphs, an optional
 * "Key impact:" lead-in, then "- " bullets) into its summary and bullets. The
 * lead-in is dropped: the bullet list's own styling carries it.
 */
export function parseDescription(description: string): ParsedDescription {
  const summary: string[] = [];
  const bullets: string[] = [];

  for (const raw of description.split("\n")) {
    const line = raw.trim();
    if (!line || /^key impact:?$/i.test(line)) continue;
    if (line.startsWith("- ")) bullets.push(line.slice(2).trim());
    else summary.push(line);
  }

  return { summary, bullets };
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
