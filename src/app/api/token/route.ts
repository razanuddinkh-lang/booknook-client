import { NextResponse } from "next/server";
import { headers } from "next/headers";
import jwt from "jsonwebtoken";
import { auth } from "@/lib/auth";

export const runtime = "nodejs";

export async function GET() {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) return NextResponse.json({ message: "You must log in first." }, { status: 401 });
    const secret = process.env.JWT_SECRET;
    if (!secret || secret.length < 32) throw new Error("JWT_SECRET must contain at least 32 characters");
    const token = jwt.sign(
      { email: session.user.email, name: session.user.name },
      secret,
      { subject: session.user.id, expiresIn: "10m", issuer: "booknook-web", audience: "booknook-api" },
    );
    return NextResponse.json({ token }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    console.error("JWT issue error:", error);
    return NextResponse.json({ message: "Could not create an API token." }, { status: 500 });
  }
}
