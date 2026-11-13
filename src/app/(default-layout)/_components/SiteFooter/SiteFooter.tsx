import { externalLinks } from "../SiteHeader/navItems";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-rim pt-8 pb-10">
      <div className="site-column flex flex-col items-start gap-6 min-[800px]:flex-row min-[800px]:items-center min-[800px]:justify-between">
        <div>
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
