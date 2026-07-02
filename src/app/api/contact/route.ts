import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  const body = await req.json();
  const { name, email, message } = body;

  if (!name || !email || !message) {
    return NextResponse.json({ error: "All fields are required." }, { status: 400 });
  }

  const { error } = await supabase
    .from("leads")
    .insert([{ name, email, message }]);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
