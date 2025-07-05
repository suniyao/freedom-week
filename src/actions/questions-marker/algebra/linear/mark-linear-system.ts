import normalizeMathExpression from "@/actions/reusable-utils/normalize-math-expression";
import expressionsAreEqual from "@/actions/reusable-utils/expressions-are-equal";
import {XYShape} from "@/app/types";

export default function markLinearSystem(providedAnswer: XYShape, solution: XYShape) {
    const xCorrect = expressionsAreEqual(normalizeMathExpression(providedAnswer.x.toString()), normalizeMathExpression(solution.x.toString()));
    const yCorrect = expressionsAreEqual(normalizeMathExpression(providedAnswer.y.toString()), normalizeMathExpression(solution.y.toString()));

    return xCorrect && yCorrect;
}