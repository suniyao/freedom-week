import normalizeMathExpression from "@/actions/reusable-utils/normalize-math-expression";
import expressionsAreEqual from "@/actions/reusable-utils/expressions-are-equal";

export default function markLinearSystem(
  providedAnswer: Record<string, string | number>,
  solution: Record<string, string | number>
): {
  correct: boolean;
  inputStatus: Record<string, "correct" | "incorrect">;
} {
  const normalizedX = normalizeMathExpression(providedAnswer.x.toString());
  const normalizedY = normalizeMathExpression(providedAnswer.y.toString());
  const solutionX = normalizeMathExpression(solution.x.toString());
  const solutionY = normalizeMathExpression(solution.y.toString());

  const xCorrect = expressionsAreEqual(normalizedX, solutionX);
  const yCorrect = expressionsAreEqual(normalizedY, solutionY);

  return {
    correct: xCorrect && yCorrect,
    inputStatus: {
      x: xCorrect ? "correct" : "incorrect",
      y: yCorrect ? "correct" : "incorrect",
    },
  };
}