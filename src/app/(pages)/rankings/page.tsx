'use client'

import { useEffect, useState } from "react";
import RankEntry from "@/app/components/RankEntry";
import { useSession } from "next-auth/react";

export default function Rankings() {
  const [rankings, setRankings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();
  const currentUserId = session?.user?.id;

  const fetchRankings = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/rankings");
      const data = await res.json();
      setRankings(data);
    } catch (e) {
      console.error("Failed to fetch rankings", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRankings();
  }, []);

  return (
    <main className="min-h-screen bg-amber-50 py-10 px-6">
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
            rankings.map((user, i) => (
              <RankEntry
                key={user.id}
                userId={user.id}
                index={i + 1}
                highlight={user.id === currentUserId}
              />
            ))
          ) : (
            <div className="text-gray-500 py-10">No ranking data found.</div>
          )}
        </div>
      </div>
    </main>
  );
}
