"use server";

import {DifficultyRanking, EquationResult} from "@/app/types";
import RandomInt from "@/actions/reusable-utils/random-int";

export default async function generateLinearEquationQuestion(difficulty: DifficultyRanking): Promise<EquationResult> {
    if (difficulty === "easy") {
        // form of ax + b = c, solve for x
        const a = RandomInt(0, 10)
        const b = RandomInt(-10, 10)
        const c = RandomInt(-30, 30)

        const x = (c - b)/a;

        return {equation: `${a}x + ${b} = ${c}`, x}
    } else if (difficulty === "medium") {
        // form of ax + b = c, solve for x (a can be negative)
        const a = RandomInt(-10, 10)
        const b = RandomInt(-10, 10)
        const c = RandomInt(-30, 30)

        const x = (c - b) / a;

        return {equation: `${a}x + ${b} = ${c}`, x}
    } else {
        // form of ax + b = cx + d, solve for x
        const a = RandomInt(-10, 10)
        const b = RandomInt(-10, 10)
        const c = RandomInt(-10, 10)
        const d = RandomInt(-30, 30)

        const x = (a - c)/(d - b)

        return {equation: `${a}x + ${b} = ${c}x + ${d}`, x}
    }
}