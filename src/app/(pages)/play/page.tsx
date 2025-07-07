"use client";

import 'katex/dist/katex.min.css';
import {PlaySessionProvider} from "@/app/components/play/PlaySessionContext";
import PlayPageComponent from "@/app/components/play/PlayPageComponent";
import {useSession} from "next-auth/react";
import {useRouter} from "next/navigation";

export default function PlayPage() {
    const userSession = useSession();
    const router = useRouter();
    if (userSession.data === null) {router.push("/sign-in")}

    return (
        <PlaySessionProvider user_id={userSession.data?.user?.id as string}>
            <PlayPageComponent/>
        </PlaySessionProvider>
    )
}