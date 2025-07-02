export type DifficultyRanking = "easy" | "medium" | "hard"

export type EquationResult = {equation: string, solution: {x: number, y?: number}}
export type SystemResult = {equation_1: string, equation_2: string, solution: {x: number, y: number} }
export type FactoringResult = {equation: string, factors: string[]}
export type ExpansionResult = {expression: string, solution: string}