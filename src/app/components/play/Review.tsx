import SingleProblemReview from "./SingleProblemReview";
import {usePlaySession} from "@/app/components/play/PlaySessionContext";
import {QuestionAttemptData} from "@/app/types";
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";

export default function Review() {
    const playSession = usePlaySession();

    const correctArray = playSession.attemptedQuestions.filter((q) => q.correct)
    const incorrectArray = playSession.attemptedQuestions.filter((q) => !q.correct)
    const correct_percentage = Math.round((correctArray.length / playSession.attemptedQuestions.length) * 1000) / 10

    const millisecondsSpent = (playSession.endTime as number) - (playSession.startTime as number)
    const totalSecondsSpent = millisecondsSpent / 1000
    const minutesSpent = Math.floor(totalSecondsSpent / 60)
    const secondsSpent = Math.floor(totalSecondsSpent % 60)

    const [questionTypes, setQuestionTypes] = useState<Record<string, { correct: number, incorrect: number }>>({});

    const router = useRouter()

    useEffect(() => {
        const newQuestionTypes: Record<string, { correct: number, incorrect: number }> = {}

        correctArray.forEach((question) => {
            if (!newQuestionTypes[question.question.type]) newQuestionTypes[question.question.type] = {
                correct: 0,
                incorrect: 0
            }
            newQuestionTypes[question.question.type].correct += 1
        })
        incorrectArray.forEach((incorrect) => {
            if (!newQuestionTypes[incorrect.question.type]) newQuestionTypes[incorrect.question.type] = {
                correct: 0,
                incorrect: 0
            }
            newQuestionTypes[incorrect.question.type].incorrect += 1
        });

        setQuestionTypes(newQuestionTypes)
    }, [])


    return (
        <div className="min-h-screen w-full bg-amber-50 text-stone-900 py-16 px-4 sm:px-8">
            <div className="mx-auto space-y-6 flex flex-col items-center">
                <h1 className="text-3xl font-bold text-center mb-8">Review</h1>
                <div className={"flex-row m-2 gap-3"}>
                    <button onClick={() => window.location.reload()}
                            className={"m-3 p-4 text-xl bg-green-400 rounded-xl shadow-2xs shadow-black justify-self-center"}>Play
                        again
                    </button>
                    <button onClick={() => router.push("/")}
                            className={"m-3 p-4 text-xl bg-green-400 rounded-xl shadow-2xs shadow-black justify-self-center"}>
                        Return to home
                    </button>
                </div>
                <div className={"flex flex-row gap-10 w-3/4 justify-center justify-self-center"}>
                    <div className="flex flex-col gap-6 p-3 bg-amber-300 rounded-xl w-1/2">
                        {playSession.attemptedQuestions.map(
                            (question: QuestionAttemptData, index) => (
                                <SingleProblemReview
                                    key={index}
                                    index={index}
                                    attempt={question}
                                />
                            )
                        )}
                    </div>
                    <div className={"flex flex-col gap-6 p-3 bg-amber-300 rounded-xl w-1/2"}>
                        <div className={"m-1 bg-amber-50 p-3 rounded-xl text-center items-center"}>
                            <span className={"text-xl"}>Score:</span>
                            <span className={"text-3xl"}> {playSession.calculateScore()}</span>
                        </div>
                        <div className={"m-2 bg-amber-50 p-3 rounded-xl"}>Percentage correct: <span
                            className={"text-xl text-red-500"}>{correct_percentage}%</span></div>
                        <div className={"m-2 bg-amber-50 p-3 rounded-xl"}>Time spent: <span
                            className={"text-xl"}>{minutesSpent}:{secondsSpent < 10 ? "0" + secondsSpent : secondsSpent}</span>
                        </div>
                        <div className={"m-2 bg-amber-50 p-3 rounded-xl"}>
                            <span className={"text-2xl"}>Breakdown by type</span>
                            <div>
                                {Object.keys(questionTypes).map((k) => (
                                        <div className={"my-1 p-2 rounded-lg bg-amber-300"} key={k}>
                                            <div className={"text-md"}>{k}</div>
                                            <div className={"text-green-500 text-sm"}>Correct: {questionTypes[k].correct}</div>
                                            <div className={"text-red-500 text-sm"}>Incorrect: {questionTypes[k].incorrect}</div>
                                        </div>
                                    )
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
