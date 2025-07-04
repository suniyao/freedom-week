"use client";

import 'katex/dist/katex.min.css';
import {PlaySessionProvider} from "@/app/components/play/PlaySessionContext";
import PlayPageComponent from "@/app/components/play/PlayPageComponent";

export default function PlayPage() {
    return (
        <PlaySessionProvider>
            <PlayPageComponent/>
        </PlaySessionProvider>
    )
}