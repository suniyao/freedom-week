export type DifficultyRanking = "easy" | "medium" | "hard"

export type EquationResult = {equation: string, solution: {x: number, y?: number}}
export type SystemResult = {equation_1: string, equation_2: string, solution: {x: number, y: number} }
export type FactoringResult = {equation: string, factors: string[]}
export type ExpansionResult = {expression: string, solution: string}

export interface Question {
    question: string,
    solution: string | string[] | {x: number, y?: number}
}

export interface QuestionSession {
    id: string
    owner_id: string,
    questions: QuestionAttemptData[],
    ranked: boolean,
    total_milliseconds_spent: number
}

export interface QuestionAttemptData {
    id?: string,
    type: string
    milliseconds_spent: number
    correct: boolean
}

export type PublicUser = {
    id: string,
    username: string,
    profile_picture_url: string,
    bio: string,
}

export type DatabaseUser = PublicUser & {
    email: string,
    password: string
}