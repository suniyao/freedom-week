"use client";

import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import {QuestionAttemptData} from "@/app/types";

export const PlaySessionContext = createContext<PlaySessionType | null>(null);

export type PlaySessionType = {
    startTime: Date | undefined,
    setStartTime: (startTime: Date | undefined) => void;
    endTime: Date | undefined,
    setEndTime: (endTime: Date | undefined) => void,
    attemptedQuestions: QuestionAttemptData[],
    addAttemptedQuestion: (question: QuestionAttemptData) => void,
    owner_id: string,
    setOwnerId: (owner_id: string) => void,
    ranked: boolean,
    setRanked: (ranked: boolean) => void,
    resetSession: () => void,
}

export const PlaySessionProvider = ({children}: {children: ReactNode}) => {
    const [startTime, setStartTime] = useState<Date>();
    const [endTime, setEndTime] = useState<Date>();
    const [attemptedQuestions, setAttemptedQuestions] = useState<QuestionAttemptData[]>([])
    const [owner_id, setOwnerId] = useState<string>("")
    const [ranked, setRanked] = useState<boolean>(false)
    const addAttemptedQuestion = (question: QuestionAttemptData) => setAttemptedQuestions((prevState) => [...prevState, question]);

    const resetSession = () => {
        setStartTime(undefined);
        setEndTime(undefined);
        setAttemptedQuestions([]);
        setOwnerId("");
        setRanked(false);
    };

    useEffect(() => {
        setStartTime(new Date());
    }, []);

    return (
        <PlaySessionContext.Provider value={{
            startTime,
            setStartTime,
            attemptedQuestions,
            addAttemptedQuestion,
            owner_id,
            setOwnerId,
            ranked,
            setRanked,
            endTime,
            setEndTime,
            resetSession
        }}>
            {children}
        </PlaySessionContext.Provider>
    )
};

export const usePlaySession = (): PlaySessionType => {
    const context = useContext(PlaySessionContext);
    if (!context) {
        throw new Error(
            "usePlaySession must be used within a PlaySessionProvider"
        );
    }
    return context;
};//SOMEBODY SCREAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAM