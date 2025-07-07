'use client';

import {useState} from "react";
import {motion, AnimatePresence} from "framer-motion";
import {CheckCircle, ChevronDown, ChevronUp, XCircle, AlarmClock} from "lucide-react";
import {QuestionAttemptData} from "@/app/types";
import Image from "next/image";
import formatTerm from "@/actions/reusable-utils/format-term";
import {BlockMath, InlineMath} from "react-katex";
type SingleProblemReviewProps = {
    index: number;
    attempt: QuestionAttemptData;
};

export default function SingleProblemReview({
                                                index,
                                                attempt,
                                            }: SingleProblemReviewProps) {
    const [open, setOpen] = useState(!attempt.correct);

    const {
        question: {question, solution, difficulty, type},
        answer,
        correct: isCorrect,
        milliseconds_spent,
    } = attempt;

    const formatAnswer = (ans: any, type:string) => {
        if (typeof ans === "string") return ans;
        if (Array.isArray(ans)) return ans.join(", ");
        if (typeof ans === "object") {
            if (ans.x && type!=="quadratic-vertex") {
                return `x= ${ans.x}${ans.y !== undefined ? `, y= ${ans.y}` : ""}`;
            } else if (type ==="quadratic-vertex") {
              return `(${ans.x}, ${ans.y})`;
            } else if (ans.A && ans.B && ans.C) {
                return `${ans.A}x^2 ${formatTerm(ans.B, "x")} ${formatTerm(ans.C)}`;
            } else if (ans.coefficient_1 && ans.coefficient_2 && ans.constant_1 && ans.constant_2) {
                return `${ans.coefficient === 1 ? ans.coefficient : ""}(${ans.coefficient_1}x ${formatTerm(ans.constant_1)})(${ans.coefficient_2}x ${formatTerm(ans.constant_2)})`;
            }
        }
        return JSON.stringify(ans);
    };

    const difficultyColors: Record<string, string> = {
        easy: "bg-green-100 text-green-700",
        medium: "bg-yellow-100 text-yellow-800",
        hard: "bg-red-100 text-red-700",
    };

    return (
        <motion.div
            className="w-full rounded-2xl border p-6 shadow-md bg-white space-y-4"
            initial={{opacity: 0, y: 10}}
            animate={{opacity: 1, y: 0}}
            transition={{delay: index * 0.05}}
        >
            <button
                onClick={() => setOpen(!open)}
                className="w-full flex justify-between items-center text-left"
            >
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 flex-1">
                    <span className="text-lg font-semibold">Problem {index + 1}</span>

                    <div className="flex items-center gap-2 text-sm">
            <span
                className={`px-2 py-1 text-xs rounded-full font-medium capitalize ${
                    difficultyColors[difficulty.toLowerCase()] || "bg-gray-200 text-gray-700"
                }`}
            >
              {difficulty}
            </span>

                        {isCorrect ? (
                            <CheckCircle className="text-green-500 w-5 h-5"/>
                        ) : (
                            <XCircle className="text-red-500 w-5 h-5"/>
                        )}

                        <span
                            className={`font-medium ${
                                isCorrect ? "text-green-600" : "text-red-600"
                            }`}
                        >
              {isCorrect ? "Correct" : "Incorrect"}
            </span>
                    </div>

                    <div className="text-sm flex flex-row gap-1">
                        <AlarmClock size={19} className="text-gray-500"/>
                        <span className="font-medium"> Time Spent: </span>
                        {(milliseconds_spent / 1000).toFixed(1)}s
                    </div>

                    <div className="text-sm">
                        <span className="font-medium">Your Answer: </span>
                        {formatAnswer(answer, type)}
                    </div>
                </div>

                <div className="ml-2 shrink-0">
                    {open ? (
                        <ChevronUp className="w-5 h-5"/>
                    ) : (
                        <ChevronDown className="w-5 h-5"/>
                    )}
                </div>
            </button>

            <AnimatePresence initial={false}>
                {open && (
                    <motion.div
                        key="details"
                        initial={{opacity: 0, maxHeight: 0, y: -6}}
                        animate={{opacity: 1, maxHeight: 500, y: 0}}
                        exit={{opacity: 0, maxHeight: 0, y: -6}}
                        transition={{duration: 0.3, ease: [0.4, 0, 0.2, 1]}}
                        className="overflow-hidden mt-4 border-t pt-4 space-y-3 flex flex-row"
                    >
                        <div className="w-6/7">
                            <div className="text-base whitespace-pre-wrap">
                                {question[0]}
                                <BlockMath>{question.slice(1).join("\n")}</BlockMath>
                            </div>

                            <div className="text-sm">
                                <span className="font-medium">Solution: </span>
                                <InlineMath>{formatAnswer(solution, type)}</InlineMath>
                            </div>
                            {/*<div className="text-sm">
                                <span className="font-medium">Solution: </span>
                                {formatSolutionByType(type, solution)}
                            </div>*/}

                            <div className="text-sm text-gray-500 italic">Type: {type}</div>
                        </div>
                        <div>
                            <Image
                                src={`/memes/${isCorrect ? "correct" : "incorrect"}/${Math.floor(Math.random() * 10) + 1}.jpg`}
                                width={64} height={64}
                                alt={`random cat meme for ${isCorrect ? "correct" : "incorrect"} question`}/>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
