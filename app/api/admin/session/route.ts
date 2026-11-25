import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";

export async function GET() {
  const email = await requireAdmin();
  return NextResponse.json({ authenticated: Boolean(email), email: email || null }, { status: email ? 200 : 401 });
}

