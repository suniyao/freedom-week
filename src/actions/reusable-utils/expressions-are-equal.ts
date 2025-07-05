import {simplify} from "mathjs";

export default function expressionsAreEqual(a: string, b: string) {
    try {
        const diff = simplify(`(${a}) - (${b})`);
        const zero = simplify("0")
        return diff.equals(zero)
    } catch (e) {
        return false
    }
}