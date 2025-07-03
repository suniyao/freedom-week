'use client';

import Image from "next/image";
import React, { useRef, useState } from "react";
import { useSession, signIn } from "next-auth/react";
import { useEffect } from "react";
import { redirect } from "next/dist/server/api-utils";

export default function Settings() {
  const { data: session } = useSession();
  const [originalData, setOriginalData] = useState({
    bio: "",
    email: "",
    username: "",
    profile_picture_url: "",
  })

  useEffect(() => {
  if (!session?.user?.id) return;
  const fetchUserData = async () => {
    const res = await fetch(`/api/settings/get?userId=${session.user.id}`);
    const data = await res.json();
    setBio(data.bio || "");
    setEmail(data.email || "");
    setUsername(data.username || "");
    setPreviewUrl(data.profile_picture_url || "");
    setOriginalData(data); // Store the original values
  };
  fetchUserData();
}, [session]);

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
  setPreviewUrl(preview); // Just preview!
};

const handleSave = async () => {
  if (!session?.user?.id) return;

  const updates: Record<string, any> = { userId: session.user.id };
  let uploadedImageUrl = previewUrl;

  // Upload image if a new one was selected
  if (selectedFile) {
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("userId", session.user.id);

    const res = await fetch("/api/settings/upload-image", {
      method: "POST",
      body: formData,
    });

    const result = await res.json();
    if (res.ok) {
      uploadedImageUrl = result.url;
      updates.profile_picture_url = uploadedImageUrl;
    } else {
      setStatus(`Upload error: ${result.error}`);
      return;
    }
  }
  
  // Only send changed fields
  if (bio !== originalData.bio) updates.bio = bio;
  if (email !== originalData.email) updates.email = email;
  if (username !== originalData.username) updates.username = username;

  // 👇 Only proceed if there's something to update
  if (Object.keys(updates).length <= 1) {
    setStatus("No changes to save.");
    return;
  }

  const res = await fetch("/api/settings/update", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  });

  const data = await res.json();
  if (res.ok) {
    setStatus("Saved!");
    setOriginalData(prev => ({
      ...prev,
      ...updates,
      profile_picture_url: uploadedImageUrl || prev.profile_picture_url,
    }));
    await signIn("credentials", {
      redirect: true,
      email: email || session.user.email,
      password: "<user's password>"
    });
    window.location.reload();
  } else {
    setStatus(`Error: ${data.error}`);
  }
};


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
              onChange={(e) => setUsername(e.target.value)}
            />

            <label className="block text-sm font-medium mt-4">Bio</label>
            <textarea
              placeholder="Write something about yourself"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-300"
              onChange={(e) => setBio(e.target.value)}
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
              onChange={(e) => setEmail(e.target.value)}
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
