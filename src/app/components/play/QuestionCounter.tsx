"use client"

type QuestionCounterProps = {
  totalQuestions: number | string;
  currentQuestionIndex: number;
};

export default function QuestionCounter({ totalQuestions, currentQuestionIndex }: QuestionCounterProps) {
  return (
    <div className="text-lg text-amber-800 text-center">
      {currentQuestionIndex + 1} of {totalQuestions}
    </div>
  )
}