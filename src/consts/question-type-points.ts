export const QuestionTypePoints: Record<string, number> = {
    "binomial-expansion": 1,
    "linear-equation": 1,
    "linear-system": 1.1,
    "quadratic-factoring":1.5,
    "quadratic-vertex":1.5
}

//TODO: find a way to categorize question types into categories? maybe later
//ex. algebra => linear => quadratic
// geometry => triangles => trigonometry
// functions => trigonometry => identities
// category => subcategory => unit?

export const QuestionPointMultipliers = {
    "easy": 0.50,
    "medium": 1.00,
    "hard": 1.30
}