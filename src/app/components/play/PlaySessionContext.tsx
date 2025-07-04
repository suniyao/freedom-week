"use client";

import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import {Question, QuestionAttemptData} from "@/app/types";
import {QuestionPointDifficultyMultipliers, QuestionTypePoints} from "@/consts/question-type-points";
import generateManyQuestions from "@/actions/questions-generator/generate-many-questions";

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
    questionTypes: string[],
    setQuestionTypes: (questionTypes: string[]) => void,
    questions: Question[],
    generateQuestions: () => Promise<void>,
    playMode: "standard"|"infinity"|"timed",
    setPlayMode: (playMode: "standard"|"infinity"|"timed") => void,
    calculateScore: () => number,
    status: 'setup' | 'play' | 'review' | "loadingStart",
    startGame: () => void,
    difficulties: {easy: boolean, medium: boolean, hard: boolean},
    setDifficulties: (newDiff: {easy: boolean, medium: boolean, hard: boolean}) => void,
    numberOfQuestions: number,
    setNumberOfQuestions: (newNum: number) => void,
    startLoading: () => void
}

export const PlaySessionProvider = ({children}: {children: ReactNode}) => {
    const [startTime, setStartTime] = useState<Date>();
    const [endTime, setEndTime] = useState<Date>();
    const [attemptedQuestions, setAttemptedQuestions] = useState<QuestionAttemptData[]>([])
    const [questions, setQuestions] = useState<Question[]>([])
    const [owner_id, setOwnerId] = useState<string>("")
    const [ranked, setRanked] = useState<boolean>(false)
    const [questionTypes, setQuestionTypes] = useState<string[]>([])
    const [playMode, setPlayMode] = useState<"standard"|"infinity"|"timed">("standard")
    const [status, setStatus] = useState<'setup' | 'play' | 'review' | "loadingStart">('setup');
    const [difficulties, setDifficulties] = useState<{easy: boolean, medium: boolean, hard: boolean}>({easy: true, medium: true, hard: true})
    const [numberOfQuestions, setNumberOfQuestions] = useState<number>(10)

    const addAttemptedQuestion = (question: QuestionAttemptData) => setAttemptedQuestions((prevState) => [...prevState, question]);

    const resetSession = () => {
        setStartTime(undefined);
        setEndTime(undefined);
        setAttemptedQuestions([]);
        setOwnerId("");
        setRanked(false);
    };

    const calculateScore = () => {
        let score = 0;
        attemptedQuestions.forEach((question: QuestionAttemptData) => {
            if (!question.correct) return;
            const base_score = QuestionTypePoints[question.type]
            const multiplier = QuestionPointDifficultyMultipliers[question.difficulty]
            const final = base_score * multiplier;
            score += final;
        })
        return score;
    }

    const generateQuestions = async () => {
        const num = numberOfQuestions ? numberOfQuestions : 10
        const newQuestions: Question[] = await generateManyQuestions(questionTypes, difficulties, numberOfQuestions)
        setQuestions(newQuestions)
    }

    const startGame = () => {
        setStartTime(new Date());
        setStatus("play");
    }

    const startLoading = () => setStatus("loadingStart")

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
            resetSession,
            questionTypes,
            setQuestionTypes,
            questions,
            generateQuestions,
            playMode,
            setPlayMode,
            calculateScore,
            status,
            startGame,
            difficulties,
            setDifficulties,
            numberOfQuestions,
            setNumberOfQuestions,
            startLoading
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