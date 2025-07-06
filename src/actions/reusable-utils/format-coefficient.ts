export default function formatCoefficient(coef: number, variable: string = ""): string {
  if (coef === 1) return "";
  if (coef === -1) return "-";
  return coef.toString();
}