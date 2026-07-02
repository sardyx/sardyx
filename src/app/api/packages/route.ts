import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// GET – fetch all packages for the public website
export async function GET() {
  const { data, error } = await supabase
    .from("packages")
    .select("*")
    .order("price_usd", { ascending: true });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
