"use server";

import {DifficultyRanking, Question} from "@/app/types";
import RandomInt from "@/actions/reusable-utils/random-int";
import formatTerm from "@/actions/reusable-utils/format-term";

export default async function generateQuadraticFactoringQuestion(difficulty: DifficultyRanking): Promise<Question> {
    if (difficulty === "easy") {
        // (x+a)(x+b) = x^2 + ax + bx + ab
        const a: number = RandomInt(0, 5)
        const b: number = RandomInt(0, 5)
        const equation: string = `x^2 ${formatTerm(a + b, "x")} ${formatTerm(a * b)}`
        const factors = [`(x+${a})`, `(x+${b})`]

        return {question: equation, solution: factors, difficulty}
    } else if (difficulty === "medium") {
        // (ax+b)(cx+d) = acx^2 + adx + bcx + bd
        const a: number = RandomInt(-10, 10, true)
        const b: number = RandomInt(-10, 10, true)
        const c: number = RandomInt(-10, 10, true)
        const d = RandomInt(-10, 10, true)
        const equation: string = `${a*c}x^2 ${formatTerm(a*d + b*c, "x")} ${formatTerm(b*d)}`
        const factors = [`(${a}x ${formatTerm(b)})`, `(${c}x ${formatTerm(d)})`]

        return {question: equation, solution: factors, difficulty}
    } else {
        // k(ax+b)(cx+d) = k(acx^2 + adx + bcx + bd)
        const a: number = RandomInt(-10, 10, true)
        const b: number = RandomInt(-10, 10, true)
        const c: number = RandomInt(-10, 10, true)
        const d: number = RandomInt(-10, 10, true)
        const k: number = RandomInt(-10, 10, true)
        const equation: string = `${k * a * c}x^2 + ${k * (a*d + b*c)}x + ${k * (b * d)}`
        const factors = [`${k}`, `${a}x ${formatTerm(b)}`, `${c}x ${formatTerm(d)}`]
        return {question: equation, solution: factors, difficulty}
    }
}