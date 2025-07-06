import {usePlaySession} from "./PlaySessionContext";
import QuestionBox from "./QuestionBox";
import QuestionCounter from "./QuestionCounter";
import Score from "./Score";
import {useEffect, useState} from "react";
import {InlineMath} from "react-katex";

export default function Play() {
    const playSession = usePlaySession();

    const [score, setScore] = useState<number>(0)
    const [loading, setLoading] = useState<boolean>(false)
    useEffect(() => {
        setLoading(true)
        setScore(playSession.calculateScore())
        if (playSession.attemptedQuestions.length === playSession.questions.length) playSession.endGame()
        setLoading(false)
    }, [playSession.attemptedQuestions])

    if (loading) return (
        <div className="min-h-screen w-full flex bg-amber-100 text-stone-900">
            <div className='mt-5 ml-10'>
                <div className="bg-amber-200 p-4 rounded-lg font-semibold w-30">
                    <InlineMath>loading next question...</InlineMath>
                </div>
            </div>
        </div>
    )


    return (
        <div className="min-h-screen w-full flex bg-amber-100 text-stone-900">
            <div className='mt-5 ml-10'>
                <div className="bg-amber-200 p-4 rounded-lg font-semibold w-30">
                    <QuestionCounter
                        totalQuestions={playSession.playMode === "infinity" ? "∞" : playSession.numberOfQuestions}
                        currentQuestionIndex={playSession.attemptedQuestions.length} questionStatuses={[]}/>
                </div>
            </div>
            <div className="flex-1 flex items-center justify-center">
                <QuestionBox
                    question={playSession.questions[playSession.attemptedQuestions.length]}/>
            </div>
            <div className='mt-5 mr-10'>
                <div className='bg-amber-200 p-4 rounded-lg font-semibold w-30'>
                    <Score score={score}/>
                </div>
            </div>
        </div>
    )
}