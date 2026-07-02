import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

// GET all services
export async function GET() {
  const { data, error } = await supabaseAdmin
    .from("services")
    .select("*")
    .order("created_at", { ascending: true });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

// POST create a new service
export async function POST(req: Request) {
  const body = await req.json();
  const { id, ...insertData } = body; // strip temp id if any

  const { error } = await supabaseAdmin
    .from("services")
    .insert([insertData]);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}

// PATCH update a service
export async function PATCH(req: Request) {
  const body = await req.json();
  const { id, ...updates } = body;

  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  const { error } = await supabaseAdmin
    .from("services")
    .update(updates)
    .eq("id", id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}

// DELETE remove a service
export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  const { error } = await supabaseAdmin
    .from("services")
    .delete()
    .eq("id", id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
