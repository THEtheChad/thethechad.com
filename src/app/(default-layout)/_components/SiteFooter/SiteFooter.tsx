import Link from "next/link";
import { externalLinks, navItems } from "../SiteHeader/navItems";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-rim pt-8 pb-10">
      <div className="site-column flex flex-col items-start gap-6 min-[800px]:flex-row min-[800px]:items-center min-[800px]:justify-between">
        <div>
          {/* Also the no-JS fallback when the browser can't open the MENU
              sheet (no invoker-command support). */}
          <nav aria-label="Footer">
            <ul className="mb-4 flex flex-wrap gap-x-5 font-mono text-[13px] text-muted">
              {navItems.map(({ index, label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="inline-flex min-h-11 items-center gap-1.5 transition-colors duration-150 hover:text-text"
                  >
                    <span aria-hidden="true" className="text-subtle">
                      {index}
                    </span>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <p className="label text-muted">
            Best viewed after midnight · Kansas City, MO
          </p>
          <ul className="mt-2 flex flex-wrap gap-x-5 font-mono text-[13px] text-muted">
            {externalLinks.map(({ label, href }) => (
              <li key={href}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center underline decoration-rim-strong underline-offset-4 transition-colors duration-150 hover:text-text"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <p className="hand shrink-0">recorded in Kansas City</p>
      </div>
    </footer>
  );
}
