import expressionsAreEqual from "@/actions/reusable-utils/expressions-are-equal";
import normalizeMathExpression from "@/actions/reusable-utils/normalize-math-expression";

export default function markLinearEquation(providedAnswer: string[], solution: string) {
    const answer = providedAnswer[0]
    return expressionsAreEqual(normalizeMathExpression(answer), normalizeMathExpression(solution));
}