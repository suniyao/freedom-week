'use client'

import { useState } from "react";
import Image from "next/image"; // in case you wanna use real pfp imgs

type Props = {
  userId: string;
  index?: number;
  highlight?: boolean;
};


export default function RankEntry({ userId, index, highlight }: Props) {
  // TODO: fetch user info from DB using userId
  const [username, setUsername] = useState("unknown");
  const [pfp, setPfp] = useState("null");
  const [score, setScore] = useState(1337);

  return (
    <div className="flex justify-center py-2">
      <div className={`{flex w-full max-w-md items-center gap-4 rounded-xl ${highlight ? "bg-amber-200" : "bg-white"} px-4 py-3 shadow-sm transition hover:shadow-md}`}>
         <div className="text-lg font-bold w-10">{index}</div>
        {/* Profile Picture or Placeholder */}
        <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-full bg-gray-300 text-center text-sm font-medium text-white flex items-center justify-center">
          {pfp !== "null" ? (
            <Image
              src={pfp}
              alt="Profile"
              width={48}
              height={48}
              className="rounded-full"
            />
          ) : (
            username[0]?.toUpperCase() || "?"
          )}
        </div>

        {/* Username + Score */}
        <div className="flex flex-1 items-center justify-between">
          <span className="text-base font-semibold text-gray-800">
            {username}
          </span>
          <span className="text-sm font-medium text-gray-700">
            Score: {score}
          </span>
        </div>
      </div>
    </div>
  );
}
