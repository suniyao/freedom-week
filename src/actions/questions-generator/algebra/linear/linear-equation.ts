"use server";

import { DifficultyRanking, Question } from "@/app/types";
import RandomInt from "@/actions/reusable-utils/random-int";
import formatTerm from "@/actions/reusable-utils/format-term";

const q_text = "Solve for x.";

export default async function generateLinearEquationQuestion(difficulty: DifficultyRanking): Promise<Question> {
    if (difficulty === "easy") {
        // form of ax + b = c, solve for x
        let a = RandomInt(1, 10); // just in case

        const b = RandomInt(-10, 10);
        const x = RandomInt(-10, 10);
        const c = a * x + b;

        return {
            question: [q_text, `${a}x + ${b} = ${c}`],
            solution: { x },
            difficulty,
            type: "linear-equation",
        };
    } else if (difficulty === "medium") {
        // form of ax + b = c, solve for x (a can be negative)
        let a = RandomInt(-10, 10);
        while (a === 0) a = RandomInt(-10, 10);

        const x = RandomInt(-10, 10);
        const b = RandomInt(-10, 10);
        const c = a * x + b;

        return {
            question: [q_text, `${a}x ${formatTerm(b)} = ${c}`],
            solution: { x },
            difficulty,
            type: "linear-equation",
        };
    } else {
        // form of ax + b = cx + d, solve for x
        let a = RandomInt(-10, 10, true);
        let c = RandomInt(-10, 10, true);
        while (a === c) {
            a = RandomInt(-10, 10, true);
            c = RandomInt(-10, 10, true);
        }

        const b = RandomInt(-10, 10, true);
        const x = RandomInt(-30, 30, true);
        const d = (a - c) * x + b;

        return {
            question: [q_text, `${a}x ${formatTerm(b)} = ${c}x ${formatTerm(d)}`],
            solution: { x },
            difficulty,
            type: "linear-equation",
        };
    }
}
