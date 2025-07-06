import expressionsAreEqual from "@/actions/reusable-utils/expressions-are-equal";
import normalizeMathExpression from "@/actions/reusable-utils/normalize-math-expression";

export default function markLinearEquation(providedAnswer: Record<string, string|number>, solution: Record<string, string|number>) {
    const answer = providedAnswer.ans.toString();
    const actual_solution = solution.ans.toString();
    return expressionsAreEqual(normalizeMathExpression(answer), normalizeMathExpression(actual_solution));
}