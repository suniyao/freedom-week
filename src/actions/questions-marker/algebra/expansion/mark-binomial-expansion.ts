import expressionsAreEqual from "@/actions/reusable-utils/expressions-are-equal";
import normalizeMathExpression from "@/actions/reusable-utils/normalize-math-expression";


export default function markBinomialExpansion(providedAnswer: Record<string, string|number>, solution: Record<string, string|number>): boolean {
    const answer = `${providedAnswer.a.toString()}x^2 + ${providedAnswer.b.toString()}x + ${providedAnswer.c.toString()}`
    const actual_solution = solution.ans.toString();
    return expressionsAreEqual(normalizeMathExpression(answer), normalizeMathExpression(actual_solution));
}