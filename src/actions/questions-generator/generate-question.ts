"use server";

import {DifficultyRanking, EquationResult, ExpansionResult, FactoringResult, SystemResult} from "@/app/types";
import generateBinomialExpansionQuestion from "@/actions/questions-generator/algebra/expansion/binomial-expansion";
import generateLinearEquationQuestion from "@/actions/questions-generator/algebra/linear/linear-equation";
import generateLinearSystemQuestion from "@/actions/questions-generator/algebra/linear/linear-system";
import generateQuadraticFactoringQuestion from "@/actions/questions-generator/algebra/quadratic/quadratic-factoring";
import generateQuadraticVertexQuestion from "@/actions/questions-generator/algebra/quadratic/quadratic-vertex";

export default async function generateQuestion(difficulty: DifficultyRanking, type: string): Promise<ExpansionResult|FactoringResult|EquationResult|SystemResult> {
    switch (type) {
        case "binomial-expansion":
            return generateBinomialExpansionQuestion(difficulty);
        case "linear-equation":
            return generateLinearEquationQuestion(difficulty);
        case "linear-system":
            return generateLinearSystemQuestion(difficulty);
        case "quadratic-factoring":
            return generateQuadraticFactoringQuestion(difficulty);
        case "quadratic-vertex":
            return generateQuadraticVertexQuestion(difficulty);
        default:
            throw new Error(`Unsupported question type "${type}"`);
    }
}