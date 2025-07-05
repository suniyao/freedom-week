"use client";

import {Question} from "@/app/types";
import {BlockMath} from 'react-katex';
import 'katex/dist/katex.min.css';
import {useEffect, useRef, useState} from "react";
import {ArrowRight} from "lucide-react";

type QuestionBoxProps = {
    question: Question;
}


export default function QuestionBox(props: QuestionBoxProps) {
    const {question, solution} = props.question;
    //const [answer, setAnswer] = useState("");
    //const [answers, setAnswers] = useState<Record<number|string, string>>({})
    const answers = useRef<Record<string | number, string>>({})
    const [questionStatus, setQuestionStatus] = useState<"unanswered" | "correct" | "incorrect">("unanswered");
    const checkAnswer = () => {
        if (typeof solution === "object" && "x" in solution && "y" in solution) {
            const xCorrect = (answers.current.x ?? "").trim() === solution.x.toString().trim();
            const yCorrect = solution.y
                ? (answers.current.y ?? "").trim() === solution.y.toString().trim()
                : true;
            setQuestionStatus(xCorrect && yCorrect ? "correct" : "incorrect");
        } else if (typeof solution === "string") {
            if ((answers.current[0] ?? "").trim() === solution.toString().trim()) {
                setQuestionStatus("correct");
            }
        } else {
            const solutions = (solution as string[]).map(s => s.trim()).sort();
            const answersArray = Object.values(answers.current).map(s => s.trim()).sort();

            const allMatch =
                solutions.length === answersArray.length &&
                solutions.every((s, i) => s === answersArray[i]);

            if (allMatch) {
                setQuestionStatus("correct");
            } else {
                setQuestionStatus("incorrect");
            }
        }

        /*
        if (answer.trim() === solution.toString().trim()) {
            setQuestionStatus("correct");
        } else {
            setQuestionStatus("incorrect");
        }

         */
    }

    const ringColor =
        questionStatus === "correct"
            ? "ring-2 ring-green-500"
            : questionStatus === "incorrect"
                ? "ring-2 ring-red-500"
                : "";

    useEffect(() => {
        if (typeof solution === "string") answers.current[0] = ""
        else if ("x" in solution && "y" in solution) {
            answers.current["x"] = "";
            answers.current["y"] = ""
        } else (solution as string[]).forEach((_, index) => answers.current[index] = "")
    }, [solution])

    return (
        <div
            className={"p-4 flex bg-amber-300 text-stone-900 rounded-lg flex-col items-center justify-center gap-4 w-1/2"}>
            <div className={"w-3/4"}>
                <div>
                    {question[0]}
                </div>
                <div className={"flex flex-col gap-2 w-full m-3 bg-amber-100 rounded-xl"}>
                    {question.map((s, i) => i > 0 ? <BlockMath key={i}>{s}</BlockMath> : null)}
                </div>
            </div>
            <div className="flex flex-row gap-2">
                {
                    Object.keys(answers.current).map((key, index) => {
                        if (key === "x" || key === "y") {
                            return (
                                <div>
                                    <label>{key}</label>
                                    <input className={`p-2 bg-amber-100 rounded-lg ${ringColor}`}
                                           placeholder="your answer" key={key}
                                           onChange={(e) => {
                                               answers.current[key] = e.target.value
                                           }}/>
                                </div>
                            )
                        } else {
                            return (
                                <div>
                                    <input className={`p-2 bg-amber-100 rounded-lg ${ringColor}`}
                                           placeholder="your answer" key={index}
                                           onChange={(e) => {
                                               answers.current[key] = e.target.value
                                           }}/>
                                </div>
                            )
                        }
                    })
                }
                <input className={`p-2 bg-amber-100 rounded-lg ${ringColor}`} placeholder="your answer"
                       onChange={(e) => {/*set answer here*/
                       }}/>
                {questionStatus === "unanswered" ? (
                    <button className="p-2 bg-amber-400 rounded-lg hover:bg-black hover:text-amber-100 transition-all"
                            onClick={checkAnswer}>submit</button>
                ) : (
                    <button
                        className="p-2 bg-black text-amber-100 rounded-lg hover:text-black hover:bg-amber-100 transition-all"
                        onClick={() => console.log("next question")}
                    >
                        <ArrowRight size={20}/>
                    </button>
                )}
            </div>
        </div>
    )
}
//remember me, no matter what this result means