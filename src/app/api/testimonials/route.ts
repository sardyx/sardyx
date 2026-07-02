import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// POST – public feedback submission (approved = false by default)
export async function POST(req: Request) {
  const body = await req.json();
  const { author, role, quote } = body;

  if (!author || !role || !quote) {
    return NextResponse.json({ error: "All fields are required." }, { status: 400 });
  }

  const { error } = await supabase
    .from("testimonials")
    .insert([{ author, role, quote, approved: false }]);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}

// GET – fetch only approved testimonials for the public website
export async function GET() {
  const { data, error } = await supabase
    .from("testimonials")
    .select("*")
    .eq("approved", true)
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
