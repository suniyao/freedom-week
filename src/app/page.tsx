"use client";

import Link from "next/link";

export default function HomePage() {
  return (
      <div className={"h-dvh w-full flex bg-amber-100 text-stone-900"}>
        <div className={"flex flex-row h-[20dvh] w-full justify-between"}>
            <div className={"text-9xl p-12 m-10 animate-bounce select-none"}>
                mathkitten
            </div>
            <div className={"text-2xl p-4 m-10 bg-stone-900 text-amber-100 rounded-xl text-center items-center flex hover:cursor-pointer hover:bg-amber-400 hover:p-5 hover:m-9 transition-all"}>
                <Link href={"/signin"}>sign in</Link>
            </div>
        </div>
      </div>
  )
}