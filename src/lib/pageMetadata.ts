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

/**
 * Per-route title, description and canonical. Open Graph and Twitter fields
 * are deliberately not set here: Next merges `openGraph`/`twitter` shallowly,
 * so a page that sets them drops the layout's, including the image from
 * app/opengraph-image.jpg. Left alone, Next fills og:title, og:description and
 * the twitter:* tags from this page's title and description, and keeps the
 * root's site name, type, locale and image.
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
    ...(noindex ? { robots: { index: false } } : {}),
  };
}
