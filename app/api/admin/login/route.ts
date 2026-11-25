import { NextResponse } from "next/server";
import { createSession, isAuthConfigured, verifyCredentials } from "@/lib/auth";

export async function POST(request: Request) {
  if (!isAuthConfigured()) return NextResponse.json({ success: false, error: "Admin auth is not configured." }, { status: 503 });
  const body = await request.json().catch(() => ({}));
  if (!verifyCredentials(String(body.email || ""), String(body.password || ""))) {
    return NextResponse.json({ success: false, error: "Invalid credentials." }, { status: 401 });
  }
  await createSession(String(body.email));
  return NextResponse.json({ success: true });
}

