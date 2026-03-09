import { renderToBuffer } from "@react-pdf/renderer";
import { createElement } from "react";
import { ResumePdf } from "@/components/ResumePdf/ResumePdf";
import { profile } from "@/data/resume";

export async function GET() {
  const buffer = (await renderToBuffer(
    createElement(ResumePdf),
  )) as BufferSource;
  const filename = `${profile.firstName}-${profile.lastName}-Resume.pdf`;

  return new Response(buffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Cache-Control": "no-store",
    },
  });
}
