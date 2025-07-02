"use client";

import Link from "next/link";

export default function HomePage() {
    return (
        <div className={"h-dvh w-full flex flex-col bg-amber-100 text-stone-900"}>
            <div className={"flex flex-row h-[20dvh] w-full justify-between"}>
                <div className={"text-9xl p-12 m-10 animate-bounce select-none"}>
                    mathkitten
                </div>
                <div
                    className={"text-2xl p-4 m-10 bg-stone-900 text-amber-100 rounded-xl text-center items-center flex hover:cursor-pointer hover:bg-amber-400 hover:p-5 hover:m-9 transition-all"}>
                    <Link href={"/sign-in"}>sign in</Link>
                </div>
            </div>
            <div className={"w-full h-full justify-center text-3xl items-end pr-24 flex flex-col gap-5"}>
                <div className={"p-1 hover:pt-0 hover:pb-2 hover:text-4xl transition-all cursor-pointer hover:underline"}>
                    play ranked
                </div>
                <div className={"p-1 hover:pt-0 hover:pb-2 hover:text-4xl transition-all cursor-pointer hover:underline"}>
                    train unranked
                </div>
                <div className={"p-1 hover:pt-0 hover:pb-2 hover:text-4xl transition-all cursor-pointer hover:underline"}>
                    learn
                </div>
                <Link href={"/rankings"} className={"p-1 hover:pt-0 hover:pb-2 hover:text-4xl transition-all cursor-pointer hover:underline"}>
                    rankings
                </Link>
            </div>
        </div>
    )
}