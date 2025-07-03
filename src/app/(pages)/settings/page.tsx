'use client';

import Image from "next/image";
import React, { useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { supabase } from "@/app/utils/supabaseClient";

export default function Settings() {
  const { data: session } = useSession();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [bio, setBio] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [status, setStatus] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);
    const preview = URL.createObjectURL(file);
    setPreviewUrl(preview);
  }

  const handleSave = async () => {
    if (!session?.user?.id) return;

    let uploadedImageUrl = previewUrl;

    if (selectedFile) {
      const fileExt = selectedFile.name.split(".").pop();
      const filePath = `pfps/${session.user.id}-${Date.now()}.${fileExt}`;

      const {error: uploadError} = await supabase.storage
        .from("pfp")
        .upload(filePath, selectedFile, {
        cacheControl: "3600",
        upsert: true,
      });

      if (uploadError) {
      console.error("Upload error:", uploadError.message);
      setStatus("Failed to upload image");
      return;
      }

      const { data } = supabase.storage.from("pfp").getPublicUrl(filePath);
      uploadedImageUrl = data.publicUrl;
    }

    const res = await fetch("/api/settings/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: session.user.id,
        bio,
        email,
        username,
        profile_picture_url: uploadedImageUrl,
      }),
    });

    if (res.ok) {
      setStatus("saved!");
    } else {
      const err = await res.json();
      setStatus(`Error: ${err.error}`);
    }
  }
  return (
    <main className="min-h-screen px-6 py-12 bg-amber-50 text-stone-800">
      <div className="max-w-3xl mx-auto space-y-10">
        <h1 className="text-4xl font-bold text-center">Settings</h1>

        {/* Profile Section */}
        <section className="bg-white rounded-xl shadow-md p-6 space-y-4">
          <h2 className="text-2xl font-semibold">Profile</h2>
          {/* pfp upload */}
          <div className="flex items-center gap-4">
            <Image src={previewUrl || "/assets/default-pfp.png"} alt="Profile"
              className="w-20 h-20 rounded-full object-cover border-2 border-amber-300" width={32} height={32}/>
            <div>
              <button type="button" onClick={() => fileInputRef.current?.click()} 
              className="px-4 py-2 bg-black text-white rounded hover:bg-amber-400 hover:text-black transition">
                Change Picture
              </button>
              <input type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden" />
            </div>
          </div>


          <div className="space-y-2 mt-4">
            <label className="block text-sm font-medium">Display Name</label>
            <input
              type="text"
              placeholder="Your name"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-300"
            />

            <label className="block text-sm font-medium mt-4">Bio</label>
            <textarea
              placeholder="Write something about yourself"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-300"
            />
          </div>
        </section>

        {/* Account Section */}
        <section className="bg-white rounded-xl shadow-md p-6 space-y-4">
          <h2 className="text-2xl font-semibold">Account Info</h2>
          <div className="space-y-2">
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              placeholder="your@email.com"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-300"
            />

            <label className="block text-sm font-medium mt-4">Change Password</label>
            <input
              type="password"
              placeholder="New password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-300"
            />
          </div>
        </section>

        {/* Save Button */}
         <div className="text-center">
          <button
            onClick={handleSave}
            className="px-6 py-3 bg-black text-white rounded-lg hover:bg-amber-400 hover:text-black transition-all"
          >
            Save Changes
          </button>
          <p className="mt-2 text-green-600">{status}</p>
        </div>
      </div>
    </main>
  );
}
