import normalizeMathExpression from "../reusable-utils/normalize-math-expression";
import markBinomialExpansion from "@/actions/questions-marker/algebra/expansion/mark-binomial-expansion";
import markLinearEquation from "@/actions/questions-marker/algebra/linear/mark-linear-equation";
import markLinearSystem from "@/actions/questions-marker/algebra/linear/mark-linear-system";
import markQuadraticFactoring from "@/actions/questions-marker/algebra/quadratic/mark-quadratic-factoring";
import markQuadraticVertex from "@/actions/questions-marker/algebra/quadratic/mark-quadratic-vertex";

export default function markQuestion(
  type: string,
  providedAnswer: Record<string, string | number>,
  solution: any
): {
  correct: boolean;
  inputStatus: Record<string, "correct" | "incorrect">;
} {
  switch (type) {
    case "linear-system":
      return markLinearSystem(providedAnswer, solution);
    case "binomial-expansion":
      return markBinomialExpansion(providedAnswer, solution);
    case "quadratic-factoring":
      return markQuadraticFactoring(providedAnswer, solution);
    case "quadratic-vertex":
      return markQuadraticVertex(providedAnswer, solution);
    case "linear-equation":
      return markLinearEquation(providedAnswer, solution);
    default:
      // fallback: treat as single-answer check
      const normalizedAnswer = (providedAnswer[0]?.toString() || "");
      const normalizedSolution = normalizeMathExpression(solution.toString());
      const singleCorrect = normalizedAnswer === normalizedSolution;
      return {
        correct: singleCorrect,
        inputStatus: {
          "0": singleCorrect ? "correct" : "incorrect",
        },
      };
  }
}