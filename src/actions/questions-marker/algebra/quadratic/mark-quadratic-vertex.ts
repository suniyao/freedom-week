import {XYShape} from "@/app/types";
import expressionsAreEqual from "@/actions/reusable-utils/expressions-are-equal";
import normalizeMathExpression from "@/actions/reusable-utils/normalize-math-expression";

export default function markQuadraticVertex(providedAnswer: XYShape, solution: XYShape) {
    const xCorrect = expressionsAreEqual(normalizeMathExpression(providedAnswer.x.toString()), normalizeMathExpression(solution.x.toString()));
    const yCorrect = expressionsAreEqual(normalizeMathExpression(providedAnswer.y.toString()), normalizeMathExpression(solution.y.toString()));

    return xCorrect && yCorrect;
}

//the clock is ticking towards midnight
//a desperate search