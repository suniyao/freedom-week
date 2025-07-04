import { usePlaySession } from "./PlaySessionContext";
import QuestionBox from "./QuestionBox";
import QuestionCounter from "./QuestionCounter";
import Score from "./Score";
import {useEffect, useState} from "react";

export default function Play() {
    const playSession = usePlaySession();

    const [score, setScore] = useState<number>(0)
    useEffect(() => {
        setScore(playSession.calculateScore())
    }, [playSession.attemptedQuestions])

    return (
        <div className="min-h-screen w-full flex bg-amber-100 text-stone-900">
            <div className='mt-5 ml-10'>
                <div className="bg-amber-200 p-4 rounded-lg font-semibold w-30">
                    <QuestionCounter totalQuestions={playSession.playMode === "infinity" ? "∞" : playSession.questions.length} currentQuestionIndex={playSession.attemptedQuestions.length - 1}/>
                </div>
            </div>
            <div className="flex-1 flex items-center justify-center">
                <QuestionBox
                    question={{question: "9+10", solution: "21", difficulty: "hard", type: "linear-equation"}}/>
            </div>
            <div className='mt-5 mr-10'>
                <div className='bg-amber-200 p-4 rounded-lg font-semibold w-30'>
                    <Score score={score}/>
                </div>
            </div>
        </div>
    )
}