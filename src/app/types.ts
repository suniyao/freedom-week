export type DifficultyRanking = "easy" | "medium" | "hard"

export type EquationResult = {x: number, equation: string}
export type SystemResult = {equation_1: string, equation_2: string, solution: {x: number, y: number} }
export type FactoringResult = {equation: string, factors: string[]}