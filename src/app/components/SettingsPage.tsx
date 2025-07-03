"use client";

import React, {useRef, useState} from "react";
import Image from "next/image";
import {DatabaseUser} from "@/app/types";

type SettingsPageProps = {
    user: DatabaseUser
}

export default function SettingsPage(props: SettingsPageProps) {
    //const {data: session} = useSession();
    const {user} = props;
    const [originalData, setOriginalData] = useState({
        bio: "",
        email: "",
        username: "",
        profile_picture_url: "",
    })
    const [loading, setLoading] = useState(false);

    /*
    useEffect(() => {
        setBio(user.bio);
        setEmail(user.email);
        setUsername(user.username);
        setPreviewUrl(user.profile_picture_url);
    }, [user]);
     */

    const fileInputRef = useRef<HTMLInputElement>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(user.profile_picture_url || null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [bio, setBio] = useState(user.bio);
    const [email, setEmail] = useState(user.email);
    const [username, setUsername] = useState(user.username);
    const [status, setStatus] = useState(""); //TODO: Implement Status :3

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setSelectedFile(file);
        const preview = URL.createObjectURL(file);
        setPreviewUrl(preview); // Just preview!
    };

    const handleSave = async () => {
        setLoading(true);

        const updates: Record<string, any> = {userId: user.id};
        let uploadedImageUrl = previewUrl;

        // Upload image if a new one was selected
        if (selectedFile) {
            const formData = new FormData();
            formData.append("file", selectedFile);
            formData.append("userId", user.id);

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
                setLoading(false);
                return;
            }
        }

        // Only send changed fields
        if (bio !== originalData.bio) updates.bio = bio;
        if (email !== originalData.email) updates.email = email;
        if (username !== originalData.username) updates.username = username;

        // Only proceed if there's something to update
        if (Object.keys(updates).length <= 1) {
            setStatus("No changes to save.");
            setLoading(false)
            return;
        }

        const res = await fetch("/api/settings/update", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
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
            /*
            await signIn("credentials", {
                redirect: true,
                email: email || session.user.email,
                password: "<user's password>" //WHAT IS THIS VIBE CODED TSCHEIBE WHAAAAAAAAT
            });
             */
            window.location.reload();
            //const updatedUser = await res.json();
            //setUserData(updatedUser.user)

        } else {
            setStatus(`Error: ${data.error}`);
        }
        setLoading(false)
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
                               className="w-20 h-20 rounded-full object-cover border-2 border-amber-300" width={128}
                               height={128}/>
                        <div>
                            <button type="button" onClick={() => fileInputRef.current?.click()}
                                    className="px-4 py-2 bg-black text-white rounded hover:bg-amber-400 hover:text-black transition">
                                Change Picture
                            </button>
                            <input type="file"
                                   accept="image/*"
                                   ref={fileInputRef}
                                   onChange={handleFileChange}
                                   className="hidden"/>
                        </div>
                    </div>


                    <div className="space-y-2 mt-4">
                        <label className="block text-sm font-medium">Username</label>
                        <input
                            type="text"
                            placeholder={originalData.username}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-300"
                            onChange={(e) => setUsername(e.target.value)}
                            value={username}
                        />

                        <label className="block text-sm font-medium mt-4">Bio</label>
                        <textarea
                            placeholder="Write something about yourself"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-300"
                            onChange={(e) => setBio(e.target.value)}
                            value={bio}
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
                            value={email}
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
                        className="px-6 py-3 bg-black text-white rounded-lg hover:bg-amber-400 hover:text-black disabled:bg-gray-300 hover:cursor-pointer hover:disabled:cursor-not-allowed transition-all"
                        disabled={loading}
                    >
                        Save Changes
                    </button>
                    <p className="mt-2 text-green-600">{status}</p>
                </div>
            </div>
        </main>
    );
}