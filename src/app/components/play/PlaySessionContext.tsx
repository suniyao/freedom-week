"use client";

import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import {QuestionAttemptData} from "@/app/types";

export const PlaySessionContext = createContext<any>(null);

export const PlaySessionProvider = ({children}: {children: ReactNode}) => {
    const [startTime, setStartTime] = useState<Date>();
    const [attemptedQuestions, setAttemptedQuestions] = useState<QuestionAttemptData[]>([])
    const [owner_id, setOwnerId] = useState<string>("")
    const addAttemptedQuestion = (question: QuestionAttemptData) => setAttemptedQuestions((prevState) => [...prevState, question]);

    useEffect(() => {
        setStartTime(new Date());
    }, [setStartTime]);

    return (
        <PlaySessionContext.Provider value={{startTime, setStartTime, attemptedQuestions, addAttemptedQuestion}}>
            {children}
        </PlaySessionContext.Provider>
    )
};

export const usePlaySession = () => useContext(PlaySessionContext);
//SOMEBODY SCREAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAM