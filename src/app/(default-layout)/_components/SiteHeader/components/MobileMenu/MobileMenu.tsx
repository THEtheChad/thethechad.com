"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { type MouseEvent, useRef } from "react";
import { ThemeToggle } from "@/components/ThemeToggle/ThemeToggle";
import { externalLinks, isActive, navItems } from "../../navItems";

const DIALOG_ID = "site-menu";

/**
 * MENU button + native modal <dialog> track-list sheet (<720px).
 * `commandfor`/`command` open and close it without JS; with JS, the click
 * handlers do the same and also close it after navigation or a backdrop tap.
 */
export function MobileMenu() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const pathname = usePathname();

  function open(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    dialogRef.current?.showModal();
  }

  function close(event?: MouseEvent<HTMLButtonElement>) {
    event?.preventDefault();
    dialogRef.current?.close();
  }

  // One listener covers a backdrop tap (the click lands on <dialog> itself)
  // and any link in the sheet (client navigation keeps the layout mounted).
  function onDialogClick(event: MouseEvent<HTMLDialogElement>) {
    const target = event.target as HTMLElement;
    if (target === event.currentTarget || target.closest("a")) close();
  }

  return (
    <>
      <button
        type="button"
        command="show-modal"
        commandfor={DIALOG_ID}
        aria-haspopup="dialog"
        onClick={open}
        className="label inline-flex h-11 items-center rounded-ctl border border-rim-strong px-3.5 text-text transition-colors duration-150 hover:bg-raise"
      >
        Menu
      </button>

      {/* biome-ignore lint/a11y/useKeyWithClickEvents: Escape closes natively; the click handler only adds backdrop/link dismissal. */}
      <dialog
        id={DIALOG_ID}
        ref={dialogRef}
        aria-label="Site menu"
        onClick={onDialogClick}
        className="inset-x-0 top-0 bottom-auto m-0 max-h-dvh w-full max-w-none overflow-y-auto border-0 border-b border-rim bg-night p-0 text-text backdrop:bg-ink/70 backdrop:backdrop-blur-sm"
      >
        <div className="site-column">
          <div className="flex h-(--header-h) items-center justify-between">
            <span className="label text-muted">Track list</span>
            <button
              type="button"
              command="close"
              commandfor={DIALOG_ID}
              onClick={close}
              className="label inline-flex h-11 items-center rounded-ctl border border-rim-strong px-3.5 text-text transition-colors duration-150 hover:bg-raise"
            >
              Close
            </button>
          </div>

          <nav aria-label="Primary" className="border-t border-rim py-2">
            <ol>
              {navItems.map(({ index, label, href }) => {
                const active = isActive(pathname, href);
                return (
                  <li
                    key={href}
                    className="border-b border-rim last:border-b-0"
                  >
                    <Link
                      href={href}
                      aria-current={active ? "page" : undefined}
                      className={`flex min-h-14 items-center gap-4 font-mono text-[15px] tracking-[0.06em] ${
                        active ? "text-pink-ink" : "text-text"
                      }`}
                    >
                      <span
                        aria-hidden="true"
                        className={`text-[13px] ${active ? "text-pink-ink" : "text-subtle"}`}
                      >
                        {index}
                      </span>
                      <span className="relative">
                        {label}
                        {active && (
                          <span
                            aria-hidden="true"
                            className="absolute inset-x-0 -bottom-1 h-0.5 rounded-[1px] bg-linear-to-r from-pink to-cyan [filter:var(--glow-rule)]"
                          />
                        )}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ol>
          </nav>

          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-rim py-5">
            <ul className="flex flex-wrap gap-x-5 font-mono text-[13px] text-muted">
              {externalLinks.map(({ label, href }) => (
                <li key={href}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center underline decoration-rim-strong underline-offset-4 hover:text-text"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
            <ThemeToggle showLabel />
          </div>
        </div>
      </dialog>
    </>
  );
}
