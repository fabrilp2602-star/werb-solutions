import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { requireAdmin } from "@/lib/auth";

export const dynamic = "force-dynamic";
const file = path.join(process.cwd(), "data", "events.json");
const allowed = new Set(["phone_click", "whatsapp_click", "lead_started", "lead_submitted", "quote_click"]);

async function readEvents(): Promise<Record<string, unknown>[]> {
  try { return JSON.parse(await fs.readFile(file, "utf8")); } catch { return []; }
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  if (!allowed.has(String(body.type))) return NextResponse.json({ success: false, error: "Invalid event." }, { status: 400 });
  const events = await readEvents();
  events.unshift({ id: crypto.randomUUID(), type: body.type, destination: String(body.destination || "").slice(0, 120), path: String(body.path || "").slice(0, 200), createdAt: new Date().toISOString() });
  await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.writeFile(file, JSON.stringify(events.slice(0, 10000), null, 2));
  return NextResponse.json({ success: true }, { status: 201 });
}

export async function GET() {
  if (!(await requireAdmin())) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  const events = await readEvents();
  return NextResponse.json({ success: true, count: events.length, events });
}

