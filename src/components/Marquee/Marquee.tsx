import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

export interface MarqueeProps {
  content: ReactNode;
  slotProps?: {
    root?: React.HTMLProps<HTMLDivElement>;
  };
}

export function Marquee({ content, slotProps }: MarqueeProps) {
  return (
    <div
      {...slotProps?.root}
      className={twMerge("overflow-hidden w-full", slotProps?.root?.className)}
    >
      {/* Single wrapper animates -50% of its own width = exactly one copy's width */}
      <div className="flex w-[200%] animate-marquee">
        <span className="whitespace-nowrap w-full">{content}</span>
        <span className="whitespace-nowrap w-full">{content}</span>
      </div>
    </div>
  );
}
