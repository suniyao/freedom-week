"use client";

import {Question} from "@/app/types";
import { BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';
import { useState } from "react";
import { ArrowRight } from "lucide-react";

type QuestionBoxProps = {
    question: Question;
}


export default function QuestionBox(props: QuestionBoxProps) {
    const {question, solution} = props.question;
    const [answer, setAnswer] = useState("");
    const [questionStatus, setQuestionStatus] = useState<"unanswered" | "correct" | "incorrect">("unanswered");
    const checkAnswer = () => {
        if (answer.trim() === solution.toString().trim()) {
            setQuestionStatus("correct");
        } else {
            setQuestionStatus("incorrect");
        }
    }

    const ringColor = 
        questionStatus === "correct" 
            ? "ring-2 ring-green-500"
            : questionStatus === "incorrect"
            ? "ring-2 ring-red-500"
            : "";

    return (
        <div className={"p-4 flex bg-amber-300 text-stone-900 rounded-lg flex-col items-center justify-center gap-4 w-80"}>
            <BlockMath>
                {question}
            </BlockMath>
            <div className="flex flex-row gap-2">
                <input className={`p-2 bg-amber-100 rounded-lg ${ringColor}`} placeholder="your answer" onChange={(e) => setAnswer(e.target.value)}/>
                {questionStatus === "unanswered" ? (
                <button className="p-2 bg-amber-400 rounded-lg hover:bg-black hover:text-amber-100 transition-all" onClick={checkAnswer}>submit</button>
                ): (
                <button
                    className="p-2 bg-black text-amber-100 rounded-lg hover:text-black hover:bg-amber-100 transition-all"
                    onClick={() => console.log("next question")}
                >
                 <ArrowRight size={20} />
                </button>
                )}
            </div>
        </div>
    )
}