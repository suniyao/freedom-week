export default function gcd (a: number, b: number): number {
    // When `a` is equal to `b`, return the result
    if (a === b) {
        return a
    }

    // When `a` is bigger than b, calculate the the GCD again
    // with the new `a` being `a - b`.
    if (a > b) {
        return gcd(a - b, b)
    }

    // If the new `b` is bigger than `a`,
    // subtract a from it.
    return gcd(a, b - a)
}