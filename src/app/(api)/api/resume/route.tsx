import { timingSafeEqual } from "node:crypto";
import { type DocumentProps, renderToBuffer } from "@react-pdf/renderer";
import type { NextRequest } from "next/server";
import { createElement, type ReactElement } from "react";
import { ResumePdf } from "@/components/ResumePdf/ResumePdf";
import { profile } from "@/data/resume";

/** Constant-time compare so the key can't be probed by response timing. */
function matches(given: string | null, expected: string) {
  if (!given) return false;
  const a = Buffer.from(given);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

/**
 * The résumé carries contact details, so it is not public: visitors request
 * it through the contact form and the owner sends it. This route renders it
 * only for `/api/resume?key=<RESUME_ACCESS_KEY>`; everything else (including
 * a deploy without the variable) is a plain 404.
 */
export async function GET(req: NextRequest) {
  const key = process.env.RESUME_ACCESS_KEY;
  if (!key || !matches(req.nextUrl.searchParams.get("key"), key)) {
    return new Response("Not found", { status: 404 });
  }

  const buffer = (await renderToBuffer(
    // ResumePdf renders a <Document>; react-pdf types the root by its props.
    createElement(ResumePdf, {
      contactEmail: process.env.RESUME_EMAIL,
    }) as unknown as ReactElement<DocumentProps>,
  )) as BufferSource;
  const filename = `${profile.firstName}-${profile.lastName}-Resume.pdf`;

  return new Response(buffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="${filename}"`,
      "Cache-Control": "private, no-store",
      "X-Robots-Tag": "noindex",
    },
  });
}
