import { NextResponse } from "next/server";
import { LeadSchema } from "@/lib/validators/lead";
import { supabaseAdmin } from "@/lib/supabase";
import crypto from "crypto";

// Simple in-memory rate limiting map: ipHash -> timestamps array
const rateLimitMap = new Map<string, number[]>();

export async function POST(req: Request) {
  try {
    const rawBody = await req.json();

    // 1. Zod Validation
    const parsed = LeadSchema.safeParse(rawBody);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten().fieldErrors },
        { status: 422 }
      );
    }

    const data = parsed.data;

    // 2. Honeypot check (silently drop spam)
    if (data.website_hp && data.website_hp.trim().length > 0) {
      return NextResponse.json({ success: true, message: "Inquiry received." });
    }

    // 3. IP Hashing & Rate Limiting (<= 5 submissions per hour)
    const clientIp = req.headers.get("x-forwarded-for")?.split(",")[0] || "127.0.0.1";
    const ipHash = crypto.createHash("sha256").update(clientIp).digest("hex");
    const userAgent = req.headers.get("user-agent") || "";

    const now = Date.now();
    const oneHourAgo = now - 60 * 60 * 1000;
    const timestamps = (rateLimitMap.get(ipHash) || []).filter((t) => t > oneHourAgo);

    if (timestamps.length >= 5) {
      return NextResponse.json(
        { error: "Too many submissions. Please contact us directly via WhatsApp." },
        { status: 429 }
      );
    }
    timestamps.push(now);
    rateLimitMap.set(ipHash, timestamps);

    // 4. Insert into Supabase leads table
    const { data: newLead, error } = await supabaseAdmin
      .from("leads")
      .insert({
        full_name: data.full_name,
        email: data.email,
        phone: data.phone || null,
        company: data.company || null,
        service_label: data.service_label || null,
        budget_range: data.budget_range || null,
        message: data.message,
        source: data.source || "contact_form",
        status: "new",
        consent: data.consent,
        utm: data.utm || {},
        ip_hash: ipHash,
        user_agent: userAgent,
      })
      .select()
      .single();

    if (error) {
      console.error("Supabase lead insertion error:", error);
      return NextResponse.json(
        { error: "Failed to store lead inquiry. Please reach out via WhatsApp." },
        { status: 500 }
      );
    }

    // 5. Optional Resend email notification if RESEND_API_KEY is configured
    const resendApiKey = process.env.RESEND_API_KEY;
    const notifyEmail = process.env.NOTIFY_EMAIL || "sardyxai@gmail.com";

    if (resendApiKey) {
      try {
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${resendApiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "SARDYX AI Leads <leads@sardyxai.com>",
            to: notifyEmail,
            subject: `[New Lead] ${data.full_name} (${data.service_label || "General Inquiry"})`,
            text: `Name: ${data.full_name}\nEmail: ${data.email}\nPhone: ${data.phone || "N/A"}\nCompany: ${data.company || "N/A"}\nBudget: ${data.budget_range || "N/A"}\nService: ${data.service_label || "N/A"}\n\nMessage:\n${data.message}`,
          }),
        });
      } catch (err) {
        console.error("Resend notification error (non-fatal):", err);
      }
    }

    return NextResponse.json({
      success: true,
      lead_id: newLead?.id,
      message: "Inquiry received successfully. Our team will respond within 24 hours.",
    });
  } catch (err: any) {
    console.error("Unhandled contact error:", err);
    return NextResponse.json(
      { error: "Internal server error occurred." },
      { status: 500 }
    );
  }
}
