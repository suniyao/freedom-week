"use server";

import {DifficultyRanking} from "@/app/types";
import RandomInt from "@/actions/reusable-utils/random-int";

export default async function generateQuadraticFactoringQuestion(difficulty: DifficultyRanking) {
    // (x+a)(x+b) = x^2 + ax + bx + ab
    // (ax+b)(cx+d) = acx^2 + adx + bcx + bd
    // stuff like that

    if (difficulty === "easy") {
        const a: number = RandomInt(0, 5)
        const b: number = RandomInt(0, 5)
        const equation: string = `x^2 + ${a + b}x + ${a * b}`

        return {equation}
    } else if (difficulty === "medium") {
        const a: number = RandomInt(-10, 10)
        const b: number = RandomInt(-10, 10)
        const equation: string = `x^2 + ${a + b}x + ${a * b}`

        return {equation}
    } else if (difficulty === "hard") {
        //TODO: hard diff
    }
}