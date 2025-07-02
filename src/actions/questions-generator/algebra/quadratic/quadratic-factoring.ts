"use server";

import {DifficultyRanking} from "@/app/types";
import RandomInt from "@/actions/reusable-utils/random-int";

export default async function generateQuadraticFactoringQuestion(difficulty: DifficultyRanking) {


    // stuff like that

    if (difficulty === "easy") {
        // (x+a)(x+b) = x^2 + ax + bx + ab
        const a: number = RandomInt(0, 5)
        const b: number = RandomInt(0, 5)
        const equation: string = `x^2 + ${a + b}x + ${a * b}`

        return {equation}
    } else if (difficulty === "medium") {
        // (ax+b)(cx+d) = acx^2 + adx + bcx + bd
        const a: number = RandomInt(-10, 10, true)
        const b: number = RandomInt(-10, 10, true)
        const c: number = RandomInt(-10, 10, true)
        const d = RandomInt(-10, 10, true)
        const equation: string = `${a*c}x^2 + ${a*d + b*c}x + ${b*d}`

        return {equation}
    } else {
        // k(ax+b)(cx+d) = k(acx^2 + adx + bcx + bd)
        const a: number = RandomInt(-10, 10, true)
        const b: number = RandomInt(-10, 10, true)
        const c: number = RandomInt(-10, 10, true)
        const d: number = RandomInt(-10, 10, true)
        const k: number = RandomInt(-10, 10, true)
        const equation: string = `${k * a * c}x^2 + ${k * (a*d + b*c)}x + ${k * (b * d)}`
        return {equation}
    }
}