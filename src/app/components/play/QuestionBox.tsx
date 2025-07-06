"use client";

import {Question} from "@/app/types";
import {BlockMath} from 'react-katex';
import 'katex/dist/katex.min.css';
import {useEffect, useState} from "react";
import {ArrowRight} from "lucide-react";
import AnswerBox from "./AnswerBox";
import markQuestion from "@/actions/questions-marker/mark-question";
import {usePlaySession} from "@/app/components/play/PlaySessionContext";

type QuestionBoxProps = {
    question: Question;
}

export default function QuestionBox(props: QuestionBoxProps) {
    const {question, solution, type, difficulty} = props.question;
    const [inputStatus, setInputStatus] = useState<Record<string, "correct" | "incorrect" | "unanswered">>({});
    const [answers, setAnswers] = useState<Record<string, string | number>>({})
    // const answers = useRef<Record<string | number, string>>({})
    const [questionStatus, setQuestionStatus] = useState<"unanswered" | "correct" | "incorrect">("unanswered");

    const [startTime, setStartTime] = useState(0);
    const [endTime, setEndTime] = useState(0);

    const playSession = usePlaySession()

    const checkAnswer = () => {
        setEndTime(Date.now())
        const { correct, inputStatus } = markQuestion(type, answers, solution);
        setInputStatus(inputStatus);
        setQuestionStatus(correct ? "correct" : "incorrect");
    }

    useEffect(() => {
        const newAnswers: Record<string | number, string> = {};
        const newStatuses: Record<string, "correct" | "incorrect" | "unanswered"> = {};

        Object.keys(solution).forEach((key) => {
            newAnswers[key] = "";
            newStatuses[key] = "unanswered";
        });
        setAnswers(newAnswers);
        setStartTime(Date.now())
        setQuestionStatus("unanswered")
        console.log(answers);
        console.log(solution);
        console.log(Object.keys(answers));
    }, [props]); //TODO: plug in a function that changes the question box component based on question type
    //TODO: need helper function to map type to component

    useEffect(() => {
        // clear answers and statuses when question changes
        setAnswers({});
        setInputStatus({});
        }, [props]);

    return (
        <div
            className={"p-4 flex bg-amber-300 text-stone-900 rounded-lg flex-col items-center justify-center gap-4"}>
            <div className={"p-4"}>
                <div>
                    {question[0]}
                </div>
                <div className={"flex flex-col gap-2 w-full m-3 bg-amber-100 rounded-xl"}>
                    {question.map((s, i) => i > 0 ? <BlockMath key={i}>{s}</BlockMath> : null)}
                </div>
            </div>
            <div className="flex flex-row gap-2">
                <div className={"flex flex-col gap-2"}>
                    {["quadratic-vertex", "quadratic-factoring", "binomial-expansion", "linear-system", "linear-equation"].includes(type) ? (
                    <AnswerBox
                        values={answers}
                        onValuesChange={(newValues) => setAnswers(newValues)}
                        questionType={type}
                        inputStatuses={inputStatus}
                    />
                    ) : (
                    Object.keys(answers).map((key) => (
                        <div key={key} className="m-2 text-center">
                        {/* <label className="mx-3">{key}</label> */}
                        <AnswerBox
                            values={{ [key]: answers[key] }}
                            onValuesChange={(v) => setAnswers(prev => ({ ...prev, ...v }))}
                            questionType={type}
                            inputStatuses={inputStatus}
                        />
                        </div>
                    ))
                    )}
                </div>
                {questionStatus === "unanswered" ? (
                    <button className="p-2 bg-amber-400 rounded-lg hover:bg-black hover:text-amber-100 transition-all"
                            onClick={checkAnswer}>submit</button>
                ) : (
                    <button
                        className="p-2 bg-black text-amber-100 rounded-lg hover:text-black hover:bg-amber-100 transition-all"
                        onClick={() => {
                            const attemptedQuestion = {
                                question: props.question,
                                correct: questionStatus === "correct" && true,
                                milliseconds_spent: endTime - startTime
                            }
                            console.log(attemptedQuestion)
                            playSession.addAttemptedQuestion(attemptedQuestion)
                        }}
                    >
                        <ArrowRight size={20}/>
                    </button>
                )}
            </div>
        </div>
    )
}
//remember me, no matter what this result means 
// BRUH WHAT?