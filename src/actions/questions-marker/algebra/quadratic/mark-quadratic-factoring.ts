import expressionsAreEqual from "@/actions/reusable-utils/expressions-are-equal";
import normalizeMathExpression from "@/actions/reusable-utils/normalize-math-expression";

export default function markQuadraticFactoring(providedAnswers: string[], solution: string[]){
    const fullAnswer = providedAnswers.map((a) => `(${a})`).join("");
    return expressionsAreEqual(normalizeMathExpression(fullAnswer), normalizeMathExpression(solution.join("")));
}