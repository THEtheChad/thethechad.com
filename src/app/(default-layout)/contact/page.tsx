import type { Metadata } from "next";
import { SectionHeader } from "@/components/SectionHeader/SectionHeader";
import { externalLinks } from "../_components/SiteHeader/navItems";
import { ContactForm } from "./_components/ContactForm/ContactForm";

export const metadata: Metadata = {
  title: "Contact · Chad Elliott",
  description:
    "Get in touch with Chad Elliott, a software engineer in Kansas City, by message, GitHub, or LinkedIn.",
};

export default function Contact() {
  return (
    <>
      <SectionHeader as="h1" index="05" title="contact" />
      <p className="mb-10 max-w-[60ch] text-lg leading-[1.55] min-[720px]:text-xl">
        I'm highly engaged in the tech and entrepreneurial communities in Kansas
        City and am always looking to expand my network. I also really enjoy
        helping people, so if you need something, let me know!
      </p>

      <div className="grid items-start gap-12 min-[720px]:grid-cols-[minmax(0,1fr)_200px] min-[720px]:gap-14">
        <div className="max-w-xl">
          <ContactForm />
        </div>

        <aside aria-labelledby="elsewhere">
          <h2
            id="elsewhere"
            className="label mb-2 border-b border-rim pb-2.5 font-normal text-cyan"
          >
            Elsewhere
          </h2>
          <ul className="font-mono text-[15px]">
            {externalLinks.map(({ label, href }) => (
              <li key={href}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center gap-2 text-text underline decoration-rim-strong underline-offset-4 transition-colors duration-150 hover:text-pink-ink hover:decoration-pink-ink"
                >
                  {label} <span aria-hidden="true">↗</span>
                </a>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </>
  );
}
