import SingleProblemReview from "./SingleProblemReview";
import { testQuestionEasy, testQuestionMedium, testQuestionHard } from "@/app/example/testQuestion";
export default function Review() {
  return (
<div className="min-h-screen w-full bg-amber-50 text-stone-900 py-16 px-4 sm:px-8">
      <div className="max-w-3xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-center mb-8">📝 Review Your Answers</h1>
        <SingleProblemReview index={0} problem={testQuestionEasy} userAnswer={""} isCorrect={true} />
        <SingleProblemReview index={0} problem={testQuestionMedium} userAnswer={""} isCorrect={false} />
        <SingleProblemReview index={0} problem={testQuestionHard} userAnswer={""} isCorrect={true} />
      </div>
    </div>
  )
}