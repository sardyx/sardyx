import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

// POST – public feedback submission (approved = false by default, bypasses client RLS using admin client)
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { author, role, quote } = body;

    if (!author || !role || !quote) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }

    const { error } = await supabaseAdmin
      .from("testimonials")
      .insert([{ author, role, quote, approved: false }]);

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to submit feedback" }, { status: 500 });
  }
}

// GET – fetch only approved testimonials for the public website
export async function GET() {
  const { data, error } = await supabaseAdmin
    .from("testimonials")
    .select("*")
    .eq("approved", true)
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data, {
    headers: { "Cache-Control": "no-store, max-age=0" },
  });
}
