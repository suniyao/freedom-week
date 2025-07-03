import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createClient } from "@supabase/supabase-js";
import { randomUUID } from "crypto";

// You must use the admin key (env var must be NEXT_PUBLIC_SUPABASE_...)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // make sure this is the **service role key** for full access
);

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get("file") as File;
  const userId = formData.get("userId") as string;

  if (!file || !userId) {
    return NextResponse.json({ error: "Missing file or userId" }, { status: 400 });
  }

  // Validate type and size
  const allowedTypes = ["image/jpeg", "image/png"];
  if (!allowedTypes.includes(file.type)) {
    return NextResponse.json({ error: "Invalid file type" }, { status: 400 });
  }

  if (file.size > 5 * 1024 * 1024) {
    return NextResponse.json({ error: "File too large (max 5MB)" }, { status: 400 });
  }

  // Upload to Supabase
  const ext = file.name.split(".").pop();
  const filename = `${randomUUID()}.${ext}`;
  const path = `public-profile-images/${userId}/${filename}`;
  const arrayBuffer = await file.arrayBuffer();
  const buffer = new Uint8Array(arrayBuffer);

  const { error: uploadError } = await supabase.storage
    .from("pfp")
    .upload(path, buffer, {
      contentType: file.type,
      upsert: true,
    });

  if (uploadError) {
    return NextResponse.json({ error: uploadError.message }, { status: 500 });
  }

  // Get the public URL
  const { data } = supabase.storage.from("pfp").getPublicUrl(path);
  const imageUrl = data.publicUrl;

  console.log("⏳ Updating user with image URL:", imageUrl);

  // Save to DB
  try {
    const updatedUser = await prisma.user.update({
      where: {id: userId},
      data: {profile_picture_url: imageUrl},
    });
    console.log("saved to database", updatedUser);
  } catch (err) {
    console.error("❌ Failed to save to DB:", err);
    return NextResponse.json({ error: "Failed to update profile image" }, { status: 500 });
  }

  return NextResponse.json({ url: imageUrl });
}
