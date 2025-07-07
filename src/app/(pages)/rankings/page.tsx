'use client'

import {useEffect, useState} from "react";
import RankEntry from "@/app/components/RankEntry";
import {useSession} from "next-auth/react";
import Link from "next/link";

export default function Rankings() {
    const [rankings, setRankings] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const {data: session} = useSession();
    const currentUserId = session?.user?.id;

    const fetchRankings = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/rankings");
            const data = await res.json();
            setRankings(data);
        } catch (e) {
            console.error("Failed to fetch rankings", e);
            if (e instanceof Error) {
                setError(e.message);
            } else {
                setError("Unknown error occurred.")
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRankings();
    }, []);

    const backText = "<= back"

    return (
        <main className="min-h-screen bg-amber-50 py-10 px-6">
            <Link href="/" className={"text-xl rounded-lg bg-black p-5"}>{backText}</Link>
            <div className="mx-auto max-w-4xl text-center">
                <h1 className="text-4xl font-bold text-stone-800 mb-6">🏆 Leaderboard</h1>

                <button
                    onClick={fetchRankings}
                    disabled={loading}
                    className="mb-6 px-4 py-2 bg-black text-white rounded-lg hover:bg-amber-400 hover:text-black transition-all"
                >
                    {loading ? "Refreshing..." : "🔄 Refresh Rankings"}
                </button>

                <div className="rounded-xl bg-white shadow-xl overflow-y-auto max-h-[70vh] border border-gray-200">
                    {rankings.length > 0 ? (
                        rankings.map((user, i) => {
                            return <RankEntry
                                key={user.id}
                                profile_picture_url={user.profile_picture_url}
                                username={user.username}
                                score={user.totalScore}
                                index={i + 1}
                                highlight={user.id === currentUserId}
                            />
                        })
                    ) : (
                        <div className="text-gray-500 py-10">No ranking data found.</div>
                    )}
                </div>

                {error && <div className={"p-4 bg-red-400 rounded-xl"}>{error}</div>}
            </div>
        </main>
    );
}
