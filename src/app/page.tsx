"use client";

import Link from "next/link";
import Image from "next/image";
import ProfileBar from "./components/ProfileBar";
import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";

export default function HomePage() {
    const {data:session} = useSession();

    useEffect(() => {
        if (session?.user) {
            signIn("credentials", {
                redirect: false,
                email: session.user.email,
          });
        }
    }, [session])

  return (
    <div className="relative h-dvh w-full flex flex-col bg-amber-100 text-stone-900">
      <div className="flex flex-row h-[20dvh] w-full justify-between">
        <div className="text-9xl p-12 m-10 animate-bounce select-none">
          mathkitten
        </div>
        <ProfileBar />
      </div>

      <div className="w-full h-full justify-center text-3xl items-end pr-24 flex flex-col gap-5">
        <div className="p-1 hover:pt-0 hover:pb-2 hover:text-4xl transition-all cursor-pointer hover:underline">
          play ranked
        </div>
        <div className="p-1 hover:pt-0 hover:pb-2 hover:text-4xl transition-all cursor-pointer hover:underline">
          train unranked
        </div>
        <div className="p-1 hover:pt-0 hover:pb-2 hover:text-4xl transition-all cursor-pointer hover:underline">
          learn
        </div>
        <Link
          href="/rankings"
          className="p-1 hover:pt-0 hover:pb-2 hover:text-4xl transition-all cursor-pointer hover:underline"
        >
          rankings
        </Link>
      </div>

      <Image
        src="/assets/mathing-cat.gif"
        alt="mathing cat"
        className="absolute bottom-15 left-15 w-160 h-auto drop-shadow-lg pointer-events-none select-none"
        width={64}
        height={64}
      />
    </div>
  );
}
