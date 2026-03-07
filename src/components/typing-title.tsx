"use client";

import { useEffect, useState } from "react";

const TYPE_MS = 80; // ms per character while typing
const DELETE_MS = 40; // ms per character while deleting
const PAUSE_MS = 2400; // ms to hold the completed title
const WAIT_MS = 500; // ms to pause on empty before next title

interface Props {
  titles: string[];
}

export function TypingTitle({ titles }: Props) {
  const [displayed, setDisplayed] = useState(titles[0] ?? "");
  const [titleIdx, setTitleIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!titles.length) return;
    const target = titles[titleIdx];
    let t: ReturnType<typeof setTimeout>;

    if (!deleting) {
      if (displayed.length < target.length) {
        t = setTimeout(
          () => setDisplayed(target.slice(0, displayed.length + 1)),
          TYPE_MS,
        );
      } else {
        t = setTimeout(() => setDeleting(true), PAUSE_MS);
      }
    } else {
      if (displayed.length > 0) {
        t = setTimeout(() => setDisplayed((d) => d.slice(0, -1)), DELETE_MS);
      } else {
        t = setTimeout(() => {
          setTitleIdx((i) => (i + 1) % titles.length);
          setDeleting(false);
        }, WAIT_MS);
      }
    }

    return () => clearTimeout(t);
  }, [displayed, deleting, titleIdx, titles]);

  return (
    <>
      {displayed}
      <span className="blink-cursor text-accent-soft">_</span>
    </>
  );
}
