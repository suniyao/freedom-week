export default function formatTerm(coef: number, variable: string = ""): string {
    if (coef === 0) return "";
    const sign = coef > 0 ? "+" : "-";
    const absVal = Math.abs(coef);
    return ` ${sign} ${absVal}${variable}`;
}