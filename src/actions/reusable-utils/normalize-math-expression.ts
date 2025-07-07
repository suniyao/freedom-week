import {simplify} from "mathjs";

export default function normalizeMathExpression(input: string): string {
    try {
        return simplify(input).toString();
    } catch {
        return input
            .trim()
            .replace(/^\(+|\)+$/g, "")
            .replace(/\s+/g, "");
    }
}