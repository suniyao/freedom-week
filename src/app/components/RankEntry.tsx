'use client'

import Image from "next/image"; // in case you wanna use real pfp imgs

type Props = {
  username: string,
  profile_picture_url: string | null | undefined,
  score: number,
  index?: number;
  highlight?: boolean;
};


export default function RankEntry({ username, profile_picture_url, score, index, highlight }: Props) {
  console.log(score)

  return (
    <div className="flex justify-center py-2">
      <div className={`{flex w-full max-w-md items-center gap-4 rounded-xl ${highlight ? "bg-amber-200" : "bg-white"} px-4 py-3 shadow-sm transition hover:shadow-md}`}>
         <div className="text-lg font-bold w-10">{index}</div>
        {/* Profile Picture or Placeholder */}
        <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-full bg-gray-300 text-center text-sm font-medium text-white flex items-center justify-center">
          {profile_picture_url && profile_picture_url !== "null" ? (
            <Image
              src={profile_picture_url}
              alt="Profile"
              width={48}
              height={48}
              className="rounded-full"
            />
          ) : (
              <Image
                  src={"/assets/default-pfp.png"}
                  alt="Profile"
                  width={48}
                  height={48}
                  className="rounded-full"
              />
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
