import expressionsAreEqual from "@/actions/reusable-utils/expressions-are-equal";
import normalizeMathExpression from "@/actions/reusable-utils/normalize-math-expression";

export default function markBinomialExpansion(
  providedAnswer: Record<string, string | number>,
  solution: Record<string, string | number>
): {
  correct: boolean;
  inputStatus: Record<string, "correct" | "incorrect">;
} {
  const aUser = providedAnswer.A?.toString() ?? "";
  const bUser = providedAnswer.B?.toString() ?? "";
  const cUser = providedAnswer.C?.toString() ?? "";

  const aSol = solution.A?.toString() ?? "";
  const bSol = solution.B?.toString() ?? "";
  const cSol = solution.C?.toString() ?? "";

  const aCorrect = expressionsAreEqual(
    normalizeMathExpression(aUser),
    normalizeMathExpression(aSol)
  );
  const bCorrect = expressionsAreEqual(
    normalizeMathExpression(bUser),
    normalizeMathExpression(bSol)
  );
  const cCorrect = expressionsAreEqual(
    normalizeMathExpression(cUser),
    normalizeMathExpression(cSol)
  );

  return {
    correct: aCorrect && bCorrect && cCorrect,
    inputStatus: {
      A: aCorrect ? "correct" : "incorrect",
      B: bCorrect ? "correct" : "incorrect",
      C: cCorrect ? "correct" : "incorrect",
    },
  };
}
