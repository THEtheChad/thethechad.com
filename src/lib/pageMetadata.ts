import type { Metadata } from "next";

/** Canonical origin; resolves relative canonical, OG and icon URLs. */
export const SITE_URL = "https://thethechad.com";

export const SITE_NAME = "THEtheChad";
const TITLE_SUFFIX = " · Chad Elliott";

/** The root title template; pages pass only their own word ("About"). */
export const SITE_TITLE = {
  template: `%s${TITLE_SUFFIX}`,
  default: `${SITE_NAME}${TITLE_SUFFIX}`,
} as const;

export interface PageMetadataInput {
  /** Page word, e.g. "About"; omitted on the home page (template default). */
  title?: string;
  description: string;
  /** Route path, e.g. "/about"; becomes the canonical and og:url. */
  path: string;
  /** Keep the page out of search results (the contact result pages). */
  noindex?: boolean;
}

/** The shared social card (app/opengraph-image.jpg), served at a fixed URL. */
const OG_IMAGE = {
  url: "/opengraph-image.jpg",
  width: 1200,
  height: 630,
  alt: 'A drone light show spells THE and CHAD over the Kansas City skyline at dusk, with the Western Auto sign glowing "the" between them.',
} as const;

/**
 * Per-route title, description, canonical and og:url. Next replaces a
 * parent's `openGraph` wholesale when a page sets one (dropping the
 * file-convention image), so this restates the site-wide fields and the
 * image alongside the page's url. og:title/og:description and twitter:* are
 * still derived by Next from the page's title and description.
 */
export function pageMetadata({
  title,
  description,
  path,
  noindex = false,
}: PageMetadataInput): Metadata {
  return {
    ...(title ? { title } : {}),
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      locale: "en_US",
      url: path,
      images: [OG_IMAGE],
    },
    ...(noindex ? { robots: { index: false } } : {}),
  };
}
