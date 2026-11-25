import { NextResponse } from "next/server";
import { createSession } from "@/lib/auth";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const profile = await createSession(String(body.idToken || ""));
  if (!profile) return NextResponse.json({ success: false, error: "Cuenta Firebase sin permisos de administrador." }, { status: 401 });
  return NextResponse.json({ success: true, profile });
}

