import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { existsSync } from "fs";
import path from "path";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const folder = (formData.get("folder") as string) || "uploads";

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif"];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: "Invalid file type. Only JPEG, PNG, WebP, GIF allowed." }, { status: 400 });
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: "File too large. Maximum size is 5MB." }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create safe filename
    const ext = file.name.split(".").pop();
    const safeName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${ext}`;

    // Fallback: If we are running in production on Vercel/serverless (or EROFS), write directly to Supabase storage
    const isVercel = process.env.VERCEL === "1" || process.env.NODE_ENV === "production";

    if (isVercel) {
      const { data, error } = await supabaseAdmin.storage
        .from("uploads")
        .upload(`${folder}/${safeName}`, buffer, {
          contentType: file.type,
          cacheControl: "31536000",
          upsert: true
        });

      if (error) {
        // If the bucket doesn't exist, try creating it first, then upload again
        if (error.message.includes("Bucket not found") || error.message.includes("does not exist")) {
          await supabaseAdmin.storage.createBucket("uploads", {
            public: true,
            fileSizeLimit: 5242880 // 5MB
          });

          // Retry upload
          const retry = await supabaseAdmin.storage
            .from("uploads")
            .upload(`${folder}/${safeName}`, buffer, {
              contentType: file.type,
              cacheControl: "31536000",
              upsert: true
            });

          if (retry.error) throw new Error(retry.error.message);
        } else {
          throw new Error(error.message);
        }
      }

      // Get public URL
      const { data: publicUrlData } = supabaseAdmin.storage
        .from("uploads")
        .getPublicUrl(`${folder}/${safeName}`);

      return NextResponse.json({ url: publicUrlData.publicUrl, success: true });
    }

    // Local file write
    const uploadDir = path.join(process.cwd(), "public", folder);

    try {
      // Ensure directory exists
      if (!existsSync(uploadDir)) {
        await mkdir(uploadDir, { recursive: true });
      }

      const filePath = path.join(uploadDir, safeName);
      await writeFile(filePath, buffer);

      const publicUrl = `/${folder}/${safeName}`;
      return NextResponse.json({ url: publicUrl, success: true });
    } catch (fsError: any) {
      // If we encounter EROFS locally or in any environment, fallback immediately to Supabase Storage
      if (fsError.code === "EROFS" || fsError.message.includes("read-only")) {
        const { data, error } = await supabaseAdmin.storage
          .from("uploads")
          .upload(`${folder}/${safeName}`, buffer, {
            contentType: file.type,
            cacheControl: "31536000",
            upsert: true
          });

        if (error) {
          if (error.message.includes("Bucket not found") || error.message.includes("does not exist")) {
            await supabaseAdmin.storage.createBucket("uploads", {
              public: true,
              fileSizeLimit: 5242880
            });
            const retry = await supabaseAdmin.storage
              .from("uploads")
              .upload(`${folder}/${safeName}`, buffer, {
                contentType: file.type,
                cacheControl: "31536000",
                upsert: true
              });
            if (retry.error) throw new Error(retry.error.message);
          } else {
            throw new Error(error.message);
          }
        }

        const { data: publicUrlData } = supabaseAdmin.storage
          .from("uploads")
          .getPublicUrl(`${folder}/${safeName}`);

        return NextResponse.json({ url: publicUrlData.publicUrl, success: true });
      }

      throw fsError;
    }
  } catch (error: any) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: error.message || "Upload failed" }, { status: 500 });
  }
}
