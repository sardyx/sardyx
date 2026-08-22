import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

// GET all contact settings as key-value map
export async function GET() {
  const { data, error } = await supabaseAdmin
    .from("contact_settings")
    .select("key, value");

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  // Return as { email: "...", phone: "...", ... }
  const map: Record<string, string> = {};
  (data ?? []).forEach((row) => { map[row.key] = row.value; });
  return NextResponse.json(map);
}

// PATCH update one or more contact settings
export async function PATCH(req: Request) {
  const body = await req.json(); // { email: "...", phone: "..." }
  const entries = Object.entries(body);

  for (const [key, value] of entries) {
    const { error } = await supabaseAdmin
      .from("contact_settings")
      .upsert({ key, value: String(value), updated_at: new Date().toISOString() }, { onConflict: "key" });

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
