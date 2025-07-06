import expressionsAreEqual from "@/actions/reusable-utils/expressions-are-equal";
import normalizeMathExpression from "@/actions/reusable-utils/normalize-math-expression";

export default function markBinomialExpansion(
  providedAnswer: Record<string, string | number>,
  solution: Record<string, string | number>
): {
  correct: boolean;
  inputStatus: Record<string, "correct" | "incorrect">;
} {
  const aUser = providedAnswer.a?.toString() ?? "";
  const bUser = providedAnswer.b?.toString() ?? "";
  const cUser = providedAnswer.c?.toString() ?? "";

  const aSol = solution.a?.toString() ?? "";
  const bSol = solution.b?.toString() ?? "";
  const cSol = solution.c?.toString() ?? "";

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
      a: aCorrect ? "correct" : "incorrect",
      b: bCorrect ? "correct" : "incorrect",
      c: cCorrect ? "correct" : "incorrect",
    },
  };
}
