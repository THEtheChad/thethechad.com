import { ThemeToggle } from "@/components/ThemeToggle/ThemeToggle";
import { Wordmark } from "@/components/Wordmark/Wordmark";
import { MobileMenu } from "./components/MobileMenu/MobileMenu";
import { NavLinks } from "./components/NavLinks/NavLinks";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-rim bg-night/86 backdrop-blur-md">
      <div className="site-column flex h-(--header-h) items-center justify-between gap-3">
        <Wordmark />

        <div className="flex items-center gap-2">
          <nav aria-label="Primary" className="hidden min-[760px]:block">
            <NavLinks />
          </nav>
          <ThemeToggle />
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
