"use client";

import { useEffect, useState, ReactNode } from "react";

export interface SectionHeaderProps {
  title: string;
  children?: ReactNode;
  slotProps?: {
    root?: React.HTMLProps<HTMLDivElement>;
  };
}

const CHAR_MS = 55;

export function SectionHeader({
  title,
  children,
  slotProps,
}: SectionHeaderProps) {
  const [displayed, setDisplayed] = useState("");
  const [lineVisible, setLineVisible] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);

  useEffect(() => {
    setDisplayed("");
    setLineVisible(false);
    setContentVisible(false);

    let i = 0;
    const typing = setInterval(() => {
      i++;
      setDisplayed(title.slice(0, i));
      if (i >= title.length) {
        clearInterval(typing);
        setLineVisible(true);
        setContentVisible(true);
      }
    }, CHAR_MS);

    return () => clearInterval(typing);
  }, [title]);

  return (
    <>
      <div className="mb-8 flex items-center gap-2" {...slotProps?.root}>
        <span className="font-pixel text-xl text-pink">❯</span>
        <h1 className="font-retro text-4xl text-body uppercase">{displayed}</h1>
        <div
          className="h-px flex-1 bg-gradient-to-r from-accent/40 to-transparent transition-all duration-[1500ms] ease-out"
          style={{
            boxShadow: "0 0 6px rgba(0,207,255,0.2)",
            transformOrigin: "left",
            transform: lineVisible ? "scaleX(1)" : "scaleX(0)",
          }}
        />
      </div>

      {children && (
        <div
          className="transition-opacity duration-500"
          style={{ opacity: contentVisible ? 1 : 0 }}
        >
          {children}
        </div>
      )}
    </>
  );
}
