export default function RandomInt(
    min: number,
    max: number,
    nonZero: boolean = false
): number {
    if (min > max) {
        throw new Error("min cannot be greater than max");
    }

    if (nonZero) {
        if (min <= 0 && max >= 0) {
            if (min === 0 && max === 0) {
                throw new Error("Cannot generate non-zero integer in range [0, 0]");
            }
            do {
                const result = Math.floor(Math.random() * (max - min + 1)) + min;
                if (result !== 0) return result;
            } while (true);
        }
    }

    return Math.floor(Math.random() * (max - min + 1)) + min;
}