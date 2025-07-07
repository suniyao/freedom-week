import expressionsAreEqual from "@/actions/reusable-utils/expressions-are-equal";
import normalizeMathExpression from "@/actions/reusable-utils/normalize-math-expression";

export default function markLinearEquation(
  providedAnswer: Record<string, string | number>,
  solution: Record<string, string | number>
): {
  correct: boolean;
  inputStatus: Record<string, "correct" | "incorrect">;
} {
  const userAnswer = normalizeMathExpression(providedAnswer.x?.toString() ?? "");
  const correctAnswer = normalizeMathExpression(solution.x?.toString() ?? "");

  const isCorrect = expressionsAreEqual(userAnswer, correctAnswer);

  return {
    correct: isCorrect,
    inputStatus: {
      x: isCorrect ? "correct" : "incorrect"
    }
  };
}
