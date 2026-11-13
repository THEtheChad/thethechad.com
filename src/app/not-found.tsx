import Link from "next/link";
import { SectionHeader } from "@/components/SectionHeader/SectionHeader";
import { buttonSecondary } from "@/lib/buttonClasses";
import DefaultLayout from "./(default-layout)/layout";

export const metadata = {
  title: "Page not found",
  robots: { index: false },
};

/**
 * Unmatched URLs render outside the (default-layout) group, so wrap the page
 * in that layout to keep the header, skip link, main landmark and footer.
 */
export default function NotFound() {
  return (
    <DefaultLayout>
      <SectionHeader as="h1" index="404" title="lost signal" />
      <p className="measure-65 text-lg leading-[1.6]">
        There's nothing at this address. It may have moved, or the link may be
        mistyped.
      </p>
      <p className="mt-8">
        <Link href="/" className={buttonSecondary}>
          <span aria-hidden="true">←</span> Back home
        </Link>
      </p>
    </DefaultLayout>
  );
}
