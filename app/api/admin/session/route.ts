import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";

export async function GET() {
  const profile = await requireAdmin();
  return NextResponse.json({ authenticated: Boolean(profile), email: profile?.email || null, profile }, { status: profile ? 200 : 401 });
}

