import { twMerge } from "tailwind-merge";

export interface DotListProps {
  items: readonly string[];
  /** Accessible name for the list, e.g. "Technologies". */
  label: string;
  className?: string;
}

/**
 * Tags as dot-separated mono text, not badge boxes. A real list; the dots are
 * decoration and trail each item, so a wrapped line never starts with one.
 */
export function DotList({ items, label, className }: DotListProps) {
  return (
    <ul
      aria-label={label}
      className={twMerge(
        "flex flex-wrap font-mono text-[13px] leading-[1.8] text-muted",
        className,
      )}
    >
      {items.map((item, i) => (
        <li key={item} className="whitespace-nowrap">
          {item}
          {i < items.length - 1 && (
            <span aria-hidden="true" className="px-2 text-subtle">
              ·
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}
