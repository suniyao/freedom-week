"use server";

import {DifficultyRanking, Question} from "@/app/types";
import RandomInt from "@/actions/reusable-utils/random-int";
import formatTerm from "@/actions/reusable-utils/format-term";
import {gcd} from "mathjs";

const q_text = "Factor the following quadratic expression."



export default async function generateQuadraticFactoringQuestion(difficulty: DifficultyRanking): Promise<Question> {
    if (difficulty === "easy") {
        // (x+a)(x+b) = x^2 + ax + bx + ab
        const a: number = RandomInt(0, 5, true)
        const b: number = RandomInt(0, 5, true)
        const equation: string = `x^2 ${formatTerm(a + b, "x")} ${formatTerm(a * b)}`
        //const factors = [`(x+${a})`, `(x+${b})`]

        const solution = {
            coefficient: 1,
            coefficient_1: 1,
            constant_1: a,
            coefficient_2: 1,
            constant_2: b
        }

        return {question: [q_text, equation], solution, difficulty, type: "quadratic-factoring"}
    } else if (difficulty === "medium") {
        // (ax+b)(cx+d) = acx^2 + adx + bcx + bd
        const a: number = RandomInt(-10, 10, true)
        const b: number = RandomInt(-10, 10, true)
        const c: number = RandomInt(-10, 10, true)
        const d = RandomInt(-10, 10, true)

        const gcd_1 = gcd(a, b)
        const gcd_2 = gcd(a, b)

        const new_a = a/gcd_1
        const new_b = b/gcd_2
        const new_c = c/gcd_1
        const new_d = d/gcd_2

        const equation: string = `${new_a * new_c}x^2 ${formatTerm(new_a * new_d + new_b * new_c, "x")} ${formatTerm(new_b * new_d)}`
        //const factors = [`(${a}x ${formatTerm(b)})`, `(${c}x ${formatTerm(d)})`]

        const solution = {
            coefficient: 1,
            coefficient_1: new_a,
            coefficient_2: new_c,
            constant_1: new_b,
            constant_2: new_d
        }

        return {question: [q_text, equation], solution, difficulty, type: "quadratic-factoring"}
    } else {
        // k(ax+b)(cx+d) = k(acx^2 + adx + bcx + bd)
        const a: number = RandomInt(-10, 10, true)
        const b: number = RandomInt(-10, 10, true)
        const c: number = RandomInt(-10, 10, true)
        const d: number = RandomInt(-10, 10, true)
        const k: number = RandomInt(-10, 10, true)
        const equation: string = `${k * a * c}x^2 + ${k * (a * d + b * c)}x + ${k * (b * d)}`

        const coefficient = k * gcd(a, b) * gcd(c, d)

        const solution = {
            coefficient,
            coefficient_1: a / gcd(a, b),
            constant_1: b / gcd(a, b),
            coefficient_2: c / gcd(c, d),
            constant_2: d / gcd(c, d)
        }

        //const factors = [`${k}`, `${a}x ${formatTerm(b)}`, `${c}x ${formatTerm(d)}`]
        return {question: [q_text, equation], solution, difficulty, type: "quadratic-factoring"}
    }
}