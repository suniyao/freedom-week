"use server";

import {DifficultyRanking, Question} from "@/app/types";
import RandomInt from "@/actions/reusable-utils/random-int";
import formatTerm from "@/actions/reusable-utils/format-term";

const q_text = "Expand the following binomial."

export default async function generateBinomialExpansionQuestion(difficulty: DifficultyRanking): Promise<Question> {

    if (difficulty === "easy") {
        //(x+a)(x+b)
        let a,b
        a = RandomInt(-10, 10, true)
        b = RandomInt(-10, 10, true)

        const expression = `(x ${formatTerm(a)})(x ${formatTerm(b)})`;
        // const ans = `x^2 ${formatTerm(a+b, "x")} ${formatTerm(a*b)}`;
        const solution = {
            A: 1,
            B: a+b,
            C: a*b,
        }

        return {question: [q_text, expression], solution, difficulty, type: "binomial-expansion"};
    } else if (difficulty === "medium") {
        //(ax+b)(cx+d)
        let a,b,c,d
        a = RandomInt(-5, 5, true)
        b = RandomInt(-10, 10, true)
        c = RandomInt(-5, 5, true)
        d = RandomInt(-10, 10, true)

        const expression = `(${a}x ${formatTerm(b)})(${c}x ${formatTerm(d)})`;
        // const ans = `${a*c}x^2 ${formatTerm(b*c + d*a)} ${formatTerm(b*d)}`
        const solution = {
            A: a*c,
            B: b*c + d*a,
            C: b*d,
        }

        return {question: [q_text, expression], solution, difficulty, type: "binomial-expansion"};
    } else {
        //a(bx+c)(dx+e) + f(gx+h)(ix+j)
        //this will be fun

        let a,b,c,d,e,f,g,h,i,j //whole alphabet going on here
        a = RandomInt(-3, 3, true)
        b = RandomInt(-3, 3, true)
        c = RandomInt(-10, 10, true)
        d = RandomInt(-3, 3, true)
        e = RandomInt(-10, 10, true)

        f = RandomInt(-3, 3, true)
        g = RandomInt(-3, 3, true)
        h = RandomInt(-10, 10, true)
        i = RandomInt(-3, 3, true)
        j = RandomInt(-10, 10, true)

        const expression = `${a}(${b}x ${formatTerm(c)})(${d}x ${formatTerm(e)}) ${formatTerm(f)}(${g}x ${formatTerm(h)})(${i}x ${formatTerm(j)})`

        const solution = {
            A: a*b*d + f*g*i,
            B: (a * (b*e + c*d)) + (f * (g*j + h*i)),
            C: (a * c * e) + (f * h * j),
        }
        // const ans = `${(a * b * d) + (f * g * i)}x^2 ${formatTerm((a * (b*e + c*d)) + (f * (g*j + h*i)), "x")} ${formatTerm((a * c * e) + (f * h * j))}`
        return {question: [q_text, expression], solution, difficulty, type: "binomial-expansion"};
    }
}