type MixedRecord = Record<string, string | number>;

export function formatAnswerByType(type: string, ans: MixedRecord | undefined): string {
  if (!ans || typeof ans !== "object" || Array.isArray(ans)) {
    return ""; // or return "Invalid answer" if you want feedback
  }

  switch (type) {
    case "binomial-expansion": {
      const A = toNum(ans.A);
      const B = toNum(ans.B);
      const C = toNum(ans.C);
      return `${formatTerm(A, "x^2")}${formatTerm(B, "x")}${formatTerm(C)}`.trim();
    }

    case "quadratic-factoring": {
      const coef = cleanCoef(ans.coefficient);
      const c1 = cleanCoef(ans.coefficient_1);
      const k1 = formatConstant(ans.constant_1);
      const c2 = cleanCoef(ans.coefficient_2);
      const k2 = formatConstant(ans.constant_2);
      return `${coef}(${c1}x${k1})(${c2}x${k2})`;
    }

    case "quadratic-vertex":
      return `(${ans.x}, ${ans.y})`;

    case "linear-system":
      return `x = ${ans.x}, y = ${ans.y}`;

    case "linear-equation":
      return `x = ${ans.x}`;

    default:
      return Object.entries(ans)
        .map(([key, val]) => `${key} = ${val}`)
        .join(", ");
  }
}


// for solution, just reuse the same formatter
export function formatSolutionByType(type: string, sol: MixedRecord): string {
  return formatAnswerByType(type, sol);
}

// ===== Helpers =====

function toNum(val: string | number | undefined): number {
  const n = typeof val === "number" ? val : Number(val);
  return isNaN(n) ? 0 : n;
}

function formatTerm(coef: number, variable: string = ""): string {
  if (coef === 0) return "";
  const sign = coef > 0 ? "+" : "-";
  const absVal = Math.abs(coef);
  const val = absVal === 1 && variable ? "" : absVal;
  return ` ${sign} ${val}${variable}`;
}

function formatConstant(val: string | number | undefined): string {
  const num = toNum(val);
  return num >= 0 ? `+${num}` : `${num}`;
}

function cleanCoef(val: string | number | undefined): string {
  const num = toNum(val);
  if (num === 1) return "";
  if (num === -1) return "-";
  return num.toString();
}
