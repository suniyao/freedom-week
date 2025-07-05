"use server";

import {DifficultyRanking, Question} from "@/app/types";
import RandomInt from "@/actions/reusable-utils/random-int";
import formatTerm from "@/actions/reusable-utils/format-term";

const q_text = "Solve for x and y in the following linear system."

export default async function generateLinearSystemQuestion(difficulty: DifficultyRanking): Promise<Question> {
    if (difficulty === "easy") {
        //format of:
        // y = ax + b
        // y = cx + d
        const x = RandomInt(-5, 5, true);
        const y = RandomInt(-5, 5);

        let a, c;
        do {
            a = RandomInt(1, 10);
            c = RandomInt(1, 10);
        } while (a === c);

        const b = y - a * x;
        const d = y - c * x;

        return {
            question: [q_text, `y = ${a}x + ${b}`, `y = ${formatTerm(c, "x")} + ${d}`],
            solution: { x, y },
            difficulty,
            type: "linear-system"
        }
    } else if (difficulty === "medium") {
        //format of:
        // ax + y = b
        // cx + dy = e
        //no negatives?

        const x = RandomInt(-5, 5, true);
        const y = RandomInt(-5, 5);

        let a, c, d;
        let det;
        do {
            a = RandomInt(1, 10);
            c = RandomInt(1, 10);
            d = RandomInt(1, 10);
            det = c - d * a;
        } while (det === 0);

        const b = a * x + y;
        const e = c * x + d * y;

        return {
            question: [q_text, `${a}x + y = ${b}`,`${c}x ${formatTerm(d, "y")} = ${e}`],
            solution: { x, y },
            difficulty,
            type: "linear-system"
        }
    } else {
        //format of:
        // ax + by = c
        // dx + ey = f
        //negatives allowed

        let det
        let a,b,d,e
        do {
            a = RandomInt(-10, 10, true)
            b = RandomInt(-10, 10, true)
            d = RandomInt(-10, 10, true)
            e = RandomInt(-10, 10, true)
            det = (b * d) - (a * e)
        } while (det === 0)

        let f,c
        c = RandomInt(-30, 30);
        f = RandomInt(-30, 30);


        // y = (c - ax)/b
        // dx + e((c - ax) / b) = f
        // dx + (ce - aex)/b = f
        // bdx + ce - aex = fb
        // bdx - aex = fb - ce
        // (bd - ae)x = fb - ce
        // x = (fb - ce) / (bd - ae)
        let x = (f * b - c * e) / (b * d - a * e);
        let y

        if (b === 0) {
            // use second equation
            y = (f - d * x) / e;
        } else {
            y = (c - a * x) / b;
        }

        return {
            question: [q_text, `${a}x ${formatTerm(b, "y")} = ${c}`, `${d}x ${formatTerm(e, "y")} = ${f}`],
            solution: {x, y},
            difficulty,
            type: "linear-system"
        }
    }
}