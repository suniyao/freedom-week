"use client";

import {usePlaySession} from "@/app/components/play/PlaySessionContext";
import {useEffect, useState} from "react";
import {clearTimeout} from "node:timers";

export default function LoadingStart() {
    const playSession = usePlaySession()
    const [secondsLeft, setSecondsLeft] = useState(3)

    useEffect(() => {
        const interval = setInterval(() => {
            setSecondsLeft((prevState) => prevState - 0.1)
        }, secondsLeft)

        const timeout = setTimeout(() => {
            playSession.startGame()
        }, 3000)

        return clearInterval(interval)
    }, [])

    return (
        <div>
            {secondsLeft}
        </div>
    )
}