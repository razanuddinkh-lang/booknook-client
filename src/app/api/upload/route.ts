import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export const runtime = "nodejs";

const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);
const MAX_FILE_SIZE = 5 * 1024 * 1024;

export async function POST(request: Request) {
  try {
    // This route is shared by book-cover uploads and profile-photo uploads.
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) {
      return NextResponse.json(
        { message: "Please log in before uploading an image." },
        { status: 401 },
      );
    }

    const apiKey = process.env.IMGBB_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { message: "IMGBB_API_KEY is not configured on the server." },
        { status: 500 },
      );
    }

    const incoming = await request.formData();
    const file = incoming.get("image");

    if (!(file instanceof File)) {
      return NextResponse.json({ message: "Select an image file." }, { status: 400 });
    }

    if (!ALLOWED_TYPES.has(file.type)) {
      return NextResponse.json(
        { message: "Only JPG, PNG, and WebP images are accepted." },
        { status: 400 },
      );
    }

    if (file.size === 0 || file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { message: "Image must be greater than 0 bytes and no larger than 5 MB." },
        { status: 400 },
      );
    }

    const uploadBody = new FormData();
    uploadBody.append("image", file, file.name || "upload-image");

    const uploadResponse = await fetch(
      `https://api.imgbb.com/1/upload?key=${encodeURIComponent(apiKey)}`,
      {
        method: "POST",
        body: uploadBody,
        cache: "no-store",
        signal: AbortSignal.timeout(30_000),
      },
    );

    const result = (await uploadResponse.json()) as {
      success?: boolean;
      data?: { url?: string; display_url?: string };
      error?: { message?: string };
    };

    const imageUrl = result.data?.display_url || result.data?.url;
    if (!uploadResponse.ok || !result.success || !imageUrl) {
      return NextResponse.json(
        { message: result.error?.message || "The image hosting service rejected the upload." },
        { status: 502 },
      );
    }

    return NextResponse.json({ url: imageUrl }, { status: 200 });
  } catch (error) {
    console.error("Image upload error:", error);
    const message = error instanceof Error && error.name === "TimeoutError"
      ? "Image hosting service took too long. Please try again."
      : "Unable to upload the image right now.";

    return NextResponse.json({ message }, { status: 500 });
  }
}
