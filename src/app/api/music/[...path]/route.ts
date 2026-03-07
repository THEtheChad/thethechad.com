import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const MUSIC_DIR = path.resolve(process.cwd(), "src", "music");

const MIME: Record<string, string> = {
  ".mp3": "audio/mpeg",
  ".ogg": "audio/ogg",
  ".wav": "audio/wav",
  ".flac": "audio/flac",
  ".aac": "audio/aac",
  ".m4a": "audio/mp4",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
};

function nodeStreamToWeb(stream: fs.ReadStream): ReadableStream<Uint8Array> {
  return new ReadableStream({
    start(controller) {
      stream.on("data", (chunk) =>
        controller.enqueue(
          typeof chunk === "string" ? Buffer.from(chunk) : chunk,
        ),
      );
      stream.on("end", () => controller.close());
      stream.on("error", (err) => controller.error(err));
    },
    cancel() {
      stream.destroy();
    },
  });
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const { path: segments } = await params;
  const filePath = path.resolve(MUSIC_DIR, ...segments);

  // Prevent path traversal
  if (!filePath.startsWith(MUSIC_DIR + path.sep)) {
    return new NextResponse("Forbidden", { status: 403 });
  }

  if (!fs.existsSync(filePath)) {
    return new NextResponse("Not Found", { status: 404 });
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME[ext] ?? "application/octet-stream";
  const { size } = fs.statSync(filePath);

  const range = request.headers.get("range");
  if (range) {
    const [rawStart, rawEnd] = range.replace("bytes=", "").split("-");
    const start = parseInt(rawStart, 10);
    const end = rawEnd ? parseInt(rawEnd, 10) : size - 1;
    const chunkSize = end - start + 1;

    return new NextResponse(
      nodeStreamToWeb(fs.createReadStream(filePath, { start, end })),
      {
        status: 206,
        headers: {
          "Content-Type": contentType,
          "Content-Range": `bytes ${start}-${end}/${size}`,
          "Content-Length": String(chunkSize),
          "Accept-Ranges": "bytes",
        },
      },
    );
  }

  return new NextResponse(nodeStreamToWeb(fs.createReadStream(filePath)), {
    headers: {
      "Content-Type": contentType,
      "Content-Length": String(size),
      "Accept-Ranges": "bytes",
    },
  });
}
