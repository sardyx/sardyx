import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

// GET – fetch all packages for the public website (no-store to prevent stale Vercel CDN caching)
export async function GET() {
  const { data, error } = await supabaseAdmin
    .from("packages")
    .select("*")
    .order("price_usd", { ascending: true });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  if (!data || data.length === 0) {
    return NextResponse.json([], { status: 200, headers: { "Cache-Control": "no-store" } });
  }
  return NextResponse.json(data, {
    headers: { "Cache-Control": "no-store, max-age=0" },
  });
}
