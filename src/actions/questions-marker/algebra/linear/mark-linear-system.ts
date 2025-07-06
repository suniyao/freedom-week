import normalizeMathExpression from "@/actions/reusable-utils/normalize-math-expression";
import expressionsAreEqual from "@/actions/reusable-utils/expressions-are-equal";

export default function markLinearSystem(providedAnswer: Record<string, string|number>, solution: Record<string, string|number>) {
    const xCorrect = expressionsAreEqual(normalizeMathExpression(providedAnswer.x.toString()), normalizeMathExpression(solution.x.toString()));
    const yCorrect = expressionsAreEqual(normalizeMathExpression(providedAnswer.y.toString()), normalizeMathExpression(solution.y.toString()));

    return xCorrect && yCorrect;
}