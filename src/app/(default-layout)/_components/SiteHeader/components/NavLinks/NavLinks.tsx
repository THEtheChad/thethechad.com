"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { isActive, navItems } from "../../navItems";

/** Desktop track-list nav (≥720px). */
export function NavLinks() {
  const pathname = usePathname();

  return (
    <ol className="flex items-center gap-1">
      {navItems.map(({ index, label, href }) => {
        const active = isActive(pathname, href);
        return (
          <li key={href}>
            <Link
              href={href}
              aria-current={active ? "page" : undefined}
              className={`group relative flex h-11 items-center px-3 font-mono text-xs uppercase tracking-[0.16em] transition-colors duration-150 ${
                active ? "text-text" : "text-muted hover:text-text"
              }`}
            >
              <span
                aria-hidden="true"
                className={`mr-1.5 ${active ? "text-pink-ink" : "text-subtle"}`}
              >
                {index}
              </span>
              {label}
              {active && (
                <span
                  aria-hidden="true"
                  className="absolute inset-x-3 bottom-1 h-0.5 rounded-[1px] bg-linear-to-r from-pink to-cyan [filter:var(--glow-rule)]"
                />
              )}
            </Link>
          </li>
        );
      })}
    </ol>
  );
}
