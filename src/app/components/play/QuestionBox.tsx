"use client";

import {Question} from "@/app/types";
import {BlockMath} from 'react-katex';
import 'katex/dist/katex.min.css';
import {useEffect, useRef, useState} from "react";
import {ArrowRight} from "lucide-react";
import normalizeMathExpression from "@/actions/reusable-utils/normalize-math-expression";

type QuestionBoxProps = {
    question: Question;
}

function isXYSolution(sol: unknown): sol is { x: string; y?: string } {
    return typeof sol === "object" && sol !== null && "x" in sol;
}

export default function QuestionBox(props: QuestionBoxProps) {
    const {question, solution} = props.question;
    //const [answer, setAnswer] = useState("");
    //const [answers, setAnswers] = useState<Record<number|string, string>>({})
    const answers = useRef<Record<string | number, string>>({})
    const [questionStatus, setQuestionStatus] = useState<"unanswered" | "correct" | "incorrect">("unanswered");
    const checkAnswer = () => {
        if (isXYSolution(solution)) {
            const normalizedX = normalizeMathExpression(answers.current.x ?? "");
            const normalizedSolutionX = normalizeMathExpression(solution.x.toString());

            const normalizedY = normalizeMathExpression(answers.current.y ?? "");
            const normalizedSolutionY = solution.y
                ? normalizeMathExpression(solution.y.toString())
                : "";

            const xCorrect = normalizedX === normalizedSolutionX;
            const yCorrect = solution.y ? normalizedY === normalizedSolutionY : true;

            console.log(xCorrect);
            console.log(yCorrect);
            console.log(normalizedX)
            console.log(normalizedSolutionX)

            setQuestionStatus(xCorrect && yCorrect ? "correct" : "incorrect");
        } else if (typeof solution === "string") {
            const normalizedUser = normalizeMathExpression(answers.current[0] ?? "");
            const normalizedSolution = normalizeMathExpression(solution);

            setQuestionStatus(normalizedUser === normalizedSolution ? "correct" : "incorrect");
        } else {
            // array solutions
            const solutions = (solution as string[]).map(normalizeMathExpression).sort();
            const answersArray = Object.values(answers.current).map(normalizeMathExpression).sort();

            const allMatch =
                solutions.length === answersArray.length &&
                solutions.every((s, i) => s === answersArray[i]);

            setQuestionStatus(allMatch ? "correct" : "incorrect");
        }
    };

    const ringColor =
        questionStatus === "correct"
            ? "ring-2 ring-green-500"
            : questionStatus === "incorrect"
                ? "ring-2 ring-red-500"
                : "";

    useEffect(() => {
        answers.current = {}
        if (typeof solution === "string") answers.current["answer"] = ""
        else if ("x" in solution && "y" in solution) {
            answers.current["x"] = "";
            if (solution.y) answers.current["y"] = ""
        } else (solution as string[]).forEach((_, index) => answers.current[index] = "")
        console.log(answers.current)
        console.log(solution)
        console.log(Object.keys(answers.current))
    }, [props])


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
                <div className={"flex flex-col gap-2"}>
                    {
                        Object.keys(answers.current).map((key, index) => {
                                return (
                                    <div key={key} className={"m-2 text-center"}>
                                        <label className={"mx-3"}>{key}</label>
                                        <input className={`p-2 bg-amber-100 rounded-lg ${ringColor}`}
                                               placeholder="your answer" key={key}
                                               onChange={(e) => {
                                                   answers.current[key] = e.target.value
                                               }}/>
                                    </div>
                                )
                        })
                    }
                </div>
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