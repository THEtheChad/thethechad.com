import Link from "next/link";
import { Link as NavLink } from "./components/Link";

export function Navigation() {
  return (
    <nav className="sticky top-0 z-50 border-b border-line bg-card/20 backdrop-blur-sm">
      <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
        {/* <Link
          href="/"
          className="glitch-text neon-text font-pixel text-sm text-accent-soft transition-colors hover:text-body"
        >
          thethechad
        </Link> */}
        <div className="flex items-center gap-3">
          <NavLink href="/about" label="ABOUT" />
          <NavLink href="/projects" label="PROJECTS" />
          <NavLink href="/photography" label="PHOTOGRAPHY" />
          <NavLink href="/employment" label="EMPLOYMENT" />
        </div>
      </div>
    </nav>
  );
}
