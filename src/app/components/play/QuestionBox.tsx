"use client";

import {Question} from "@/app/types";
import {BlockMath} from 'react-katex';
import 'katex/dist/katex.min.css';
import {useEffect, useState} from "react";
import {ArrowRight} from "lucide-react";
import AnswerBox from "./AnswerBox";
import markQuestion from "@/actions/questions-marker/mark-question";

type QuestionBoxProps = {
    question: Question;
}

export default function QuestionBox(props: QuestionBoxProps) {
    const {question, solution, type} = props.question;
    const [inputStatus, setInputStatus] = useState<Record<string, "correct" | "incorrect" | "unanswered">>({});
    const [answers, setAnswers] = useState<Record<string, string | number>>({})
    // const answers = useRef<Record<string | number, string>>({})
    const [questionStatus, setQuestionStatus] = useState<"unanswered" | "correct" | "incorrect">("unanswered");
    const checkAnswer = () => {
        const correct = markQuestion(type, answers, solution);
        if (correct) {
            setQuestionStatus("correct")

        } else setQuestionStatus("incorrect");
        /*
        if (isXYSolution(solution)) {
            const normalizedX = normalizeMathExpression(answers.x ?? "");
            const normalizedSolutionX = normalizeMathExpression(solution.x.toString());

            const normalizedY = normalizeMathExpression(answers.y ?? "");
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
        }  else if (typeof solution === "string") {
            const normalizedUser = normalizeMathExpression(answers[0] ?? "");
            const normalizedSolution = normalizeMathExpression(solution);

            setQuestionStatus(normalizedUser === normalizedSolution ? "correct" : "incorrect");
        }  else {
            // array solutions
            const solutions = (solution as string[]).map(normalizeMathExpression).sort();
            const answersArray = Object.values(answers).map(normalizeMathExpression).sort();

            const allMatch =
                solutions.length === answersArray.length &&
                solutions.every((s, i) => s === answersArray[i]);

            setQuestionStatus(allMatch ? "correct" : "incorrect");
        }

         */
        //TODO: new checkAnswer function, maps types to markQuestion functions
    };

    const ringColor =
        questionStatus === "correct"
            ? "ring-2 ring-green-500"
            : questionStatus === "incorrect"
                ? "ring-2 ring-red-500"
                : "";

    useEffect(() => {
        const newAnswers: Record<string | number, string> = {};
        const newStatuses: Record<string, "correct" | "incorrect" | "unanswered"> = {};

        Object.keys(solution).forEach((key) => {
            newAnswers[key] = "";
            newStatuses[key] = "unanswered";
        });
        setAnswers(newAnswers);
        console.log(answers);
        console.log(solution);
        console.log(Object.keys(answers));
    }, [props]); //TODO: plug in a function that changes the question box component based on question type
    //TODO: need helper function to map type to component


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
                    {["quadratic-vertex", "quadratic-factoring", "binomial-expansion", "linear-system"].includes(type) ? (
                        <AnswerBox
                            values={answers}
                            onValuesChange={(newValues) => setAnswers(newValues)}
                            questionType={type}
                        />
                    ) : (
                        // fallback to individual inputs for simple types like 'linear-equation'
                        Object.keys(answers).map((key) => (
                            <div key={key} className="m-2 text-center">
                                <label className="mx-3">{key}</label>
                                <AnswerBox
                                    values={{[key]: answers[key]}}
                                    onValuesChange={(v) => setAnswers(prev => ({...prev, ...v}))}
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
                        onClick={() => console.log("next question")}
                    >
                        <ArrowRight size={20}/>
                    </button>
                )}
                {
                    questionStatus === "correct" && (
                        <div>correct!!!</div>
                    )
                }
                {
                    questionStatus === "incorrect" && (
                        <div>incorrect!!!
                            {Object.entries(solution).map((val) => <div>{val[1]}</div>)}

                        </div>
                    )
                }
            </div>
        </div>
    )
}
//remember me, no matter what this result means 
// BRUH WHAT?