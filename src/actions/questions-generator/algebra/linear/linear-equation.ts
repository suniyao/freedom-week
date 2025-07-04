"use server";

import {DifficultyRanking, Question} from "@/app/types";
import RandomInt from "@/actions/reusable-utils/random-int";
import formatTerm from "@/actions/reusable-utils/format-term";

export default async function generateLinearEquationQuestion(difficulty: DifficultyRanking): Promise<Question> {
    if (difficulty === "easy") {
        // form of ax + b = c, solve for x
        const a = RandomInt(0, 10)
        const b = RandomInt(-10, 10)
        const c = RandomInt(-30, 30)

        const x = (c - b)/a;

        return {question: `${a}x + ${b} = ${c}`, solution: {x}, difficulty, type: "linear-equation"};
    } else if (difficulty === "medium") {
        // form of ax + b = c, solve for x (a can be negative)
        const a = RandomInt(-10, 10)
        const b = RandomInt(-10, 10)
        const c = RandomInt(-30, 30)

        const x = (c - b) / a;

        return {question: `${a}x ${formatTerm(b)} = ${c}`, solution:{x}, difficulty, type: "linear-equation"}
    } else {
        // form of ax + b = cx + d, solve for x
        const a = RandomInt(-10, 10, true)
        const b = RandomInt(-10, 10, true)
        const c = RandomInt(-10, 10, true)
        const d = RandomInt(-30, 30, true)

        const x = (a - c)/(d - b)

        return {question: `${a}x ${formatTerm(b)} = ${c}x ${formatTerm(d)}`, solution:{x}, difficulty, type: "linear-equation"}
    }
}