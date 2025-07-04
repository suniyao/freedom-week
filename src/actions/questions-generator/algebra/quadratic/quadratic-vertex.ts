"use server";

import {DifficultyRanking, Question} from "@/app/types";
import RandomInt from "@/actions/reusable-utils/random-int";
import formatTerm from "@/actions/reusable-utils/format-term";

export default async function generateQuadraticVertexQuestion(difficulty: DifficultyRanking): Promise<Question> {
    //basically find the vertex based on an arbitrary quadratic function
    if (difficulty === "easy") {
        //vertex form f(x) = a(x-h)^2 + c
        let a, h, c
        a = RandomInt(-10, 10, true)
        h = RandomInt(-10, 10, true)
        c = RandomInt(-10, 10, true)

        const equation = `${a}(x ${formatTerm(h)})^2 ${formatTerm(c)}`
        return {question: equation, solution: {x: h, y: c}, difficulty}
    } else if (difficulty === "medium") {
        //factored form f(x) = a(x-m)(x-n)
        let a, m, n
        a = RandomInt(-10, 10, true)
        m = RandomInt(-10, 10, true)
        n = RandomInt(-10, 10, true)

        const equation = `${a}(x ${formatTerm(m)})(x ${formatTerm(n)})`
        const vertexX = (m + n) / 2;
        const vertexY = a * (vertexX - m) * (vertexX - n);
        return {question: equation, solution: {x: vertexX, y: vertexY}, difficulty};
    } else {
        //standard form f(x) = ax^2+bx+c
        //maybe just make vertex form and then like go from there?

        const a = RandomInt(-10, 10, true);
        const h = RandomInt(-10, 10, true);
        const k = RandomInt(-10, 10, true);

        // expand a(x - h)^2 + k
        // f(x) = a(x^2 - 2hx + h^2) + k
        const B = -2 * a * h;
        const C = a * h * h + k;

        const equation = `${a}x^2 ${formatTerm(B, "x")} ${formatTerm(C)}`;
        return {
            question: equation,
            solution: { x: h, y: k },
            difficulty
        };
    }
}