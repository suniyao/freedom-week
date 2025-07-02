"use server";

import {DifficultyRanking, ExpansionResult} from "@/app/types";
import RandomInt from "@/actions/reusable-utils/random-int";
import formatTerm from "@/actions/reusable-utils/format-term";

export default async function generateBinomialExpansionQuestion(difficulty: DifficultyRanking): Promise<ExpansionResult> {
    if (difficulty === "easy") {
        //(x+a)(x+b)
        let a,b
        a = RandomInt(-10, 10, true)
        b = RandomInt(-10, 10, true)

        const expression = `(x ${formatTerm(a)})(x ${formatTerm(b)})`;
        const solution = `x^2 ${formatTerm(a+b, "x")} ${formatTerm(a*b)}`;

        return {expression, solution}
    } else if (difficulty === "medium") {
        //(ax+b)(cx+d)
        let a,b,c,d
        a = RandomInt(-5, 5, true)
        b = RandomInt(-10, 10, true)
        c = RandomInt(-5, 5, true)
        d = RandomInt(-10, 10, true)

        const expression = `(${formatTerm(a, "x")} ${formatTerm(b)})(${formatTerm(c, "x")} ${formatTerm(d)})`;
        const solution = `${a*c}x^2 ${formatTerm(b*c + d*a)} ${formatTerm(b*d)}`

        return {expression, solution}
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
        const solution = `${(a * b * d) + (f * g * i)}x^2 ${formatTerm((a * (b*e + c*d)) + (f * (g*j + h*i)), "x")} ${formatTerm((a * c * e) + (f * h * j))}`
        return {expression, solution}
    }
}