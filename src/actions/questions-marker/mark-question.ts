import markBinomialExpansion from "@/actions/questions-marker/algebra/expansion/mark-binomial-expansion";
import markLinearEquation from "@/actions/questions-marker/algebra/linear/mark-linear-equation";
import markLinearSystem from "@/actions/questions-marker/algebra/linear/mark-linear-system";
import markQuadraticFactoring from "@/actions/questions-marker/algebra/quadratic/mark-quadratic-factoring";
import markQuadraticVertex from "@/actions/questions-marker/algebra/quadratic/mark-quadratic-vertex";

export default function markQuestion(type: string, answer: Record<string, string|number>, solution: Record<string, string|number>){
    switch (type) {
        case "binomial-expansion":
            return markBinomialExpansion(answer,solution)
        case "linear-equation":
            return markLinearEquation(answer,solution)
        case "linear-system":
            return markLinearSystem(answer, solution)
        case "quadratic-factoring":
            return markQuadraticFactoring(answer, solution)
        case "quadratic-vertex":
            return markQuadraticVertex(answer, solution)
    }
}