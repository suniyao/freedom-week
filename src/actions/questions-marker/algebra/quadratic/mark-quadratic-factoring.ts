import expressionsAreEqual from "@/actions/reusable-utils/expressions-are-equal";
import normalizeMathExpression from "@/actions/reusable-utils/normalize-math-expression";

export default function markQuadraticFactoring(providedAnswers: Record<string, string|number>, solution: Record<string, string|number>) {
    const fullAnswer = Object.values(providedAnswers).map((a) => `(${a})`).join("");
    return expressionsAreEqual(normalizeMathExpression(fullAnswer), normalizeMathExpression(Object.values(solution).join("")));
}