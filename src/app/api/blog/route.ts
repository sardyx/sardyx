import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// GET published blog posts for public
export async function GET() {
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("published", true)
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
