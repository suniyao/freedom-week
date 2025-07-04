"use client";

import {usePlaySession} from "@/app/components/play/PlaySessionContext";
import {useEffect, useState} from "react";

export default function LoadingStart() {
    const playSession = usePlaySession()
    const [secondsLeft, setSecondsLeft] = useState<number>(3.0)

    useEffect(() => {
        const interval = setInterval(() => {
            setSecondsLeft((prevState) => prevState - 0.1)
            console.log(secondsLeft)
        }, 100)

        const timeout = setTimeout(() => {
            playSession.startGame()
        }, 3000)

        return () => {clearInterval(interval); clearTimeout(timeout)}
    }, [playSession])

    return (
        <div>
            {Math.round(secondsLeft * 10) / 10}
        </div>
    )
}