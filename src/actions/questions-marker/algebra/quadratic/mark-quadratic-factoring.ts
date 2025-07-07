import expressionsAreEqual from "@/actions/reusable-utils/expressions-are-equal";
import normalizeMathExpression from "@/actions/reusable-utils/normalize-math-expression";

export default function markQuadraticFactoring(
  providedAnswers: Record<string, string | number>,
  solution: Record<string, string | number>
): {
  correct: boolean;
  inputStatus: Record<string, "correct" | "incorrect">;
} {
  const keys = Object.keys(solution); // assumes order is consistent (a, b, c, d, etc.)

  const inputStatus: Record<string, "correct" | "incorrect"> = {};
  let allCorrect = true;

  for (const key of keys) {
    const userVal = normalizeMathExpression(providedAnswers[key]?.toString() ?? "");
    const correctVal = normalizeMathExpression(solution[key]?.toString() ?? "");

    const isCorrect = expressionsAreEqual(userVal, correctVal);
    inputStatus[key] = isCorrect ? "correct" : "incorrect";

    if (!isCorrect) allCorrect = false;
  }

  return {
    correct: allCorrect,
    inputStatus,
  };
}
