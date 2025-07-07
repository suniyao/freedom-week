import SingleProblemReview from "./SingleProblemReview";
import { usePlaySession } from "./PlaySessionContext";
import { QuestionAttemptData } from "@/app/types";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  NotebookPen,
  AlarmClock,
  PencilRuler,
  CheckCircle,
  XCircle,
} from "lucide-react";
import clsx from "clsx";

export default function Review() {
  const playSession = usePlaySession();

  const correctArray = playSession.attemptedQuestions.filter((q) => q.correct);
  const incorrectArray = playSession.attemptedQuestions.filter(
    (q) => !q.correct
  );
  const correct_percentage =
    Math.round(
      (correctArray.length / playSession.attemptedQuestions.length) * 1000
    ) / 10;

  const milliseconds_spent =
    (playSession.endTime as number) - (playSession.startTime as number);
  const totalSecondsSpent = milliseconds_spent / 1000;
  const minutesSpent = Math.floor(totalSecondsSpent / 60);
  const secondsSpent = Math.floor(totalSecondsSpent % 60);

  const [questionTypes, setQuestionTypes] = useState<
    Record<string, { correct: number; incorrect: number }>
  >({});
  const router = useRouter();

  useEffect(() => {
    const newQuestionTypes: Record<
      string,
      { correct: number; incorrect: number }
    > = {};

    correctArray.forEach((question) => {
      if (!newQuestionTypes[question.question.type])
        newQuestionTypes[question.question.type] = {
          correct: 0,
          incorrect: 0,
        };
      newQuestionTypes[question.question.type].correct += 1;
    });

    incorrectArray.forEach((incorrect) => {
      if (!newQuestionTypes[incorrect.question.type])
        newQuestionTypes[incorrect.question.type] = {
          correct: 0,
          incorrect: 0,
        };
      newQuestionTypes[incorrect.question.type].incorrect += 1;
    });
    setQuestionTypes(newQuestionTypes);
  }, []);

  return (
    <div className="min-h-screen w-full bg-amber-50 text-stone-900 py-16 px-4 sm:px-8">
      <div className="mx-auto space-y-6 flex flex-col items-center">
        <h1 className="text-3xl font-bold text-center">Review</h1>
        <div className="flex flex-col gap-6 px-3 bg-white w-3/4 rounded-xl border">
          <div className="flex flex-row items-center justify-between border-b">
            <div className="m-1 p-3 rounded-xl flex flex-row gap-1">
              <PencilRuler
                size={20}
                className="text-gray-500 translate-y-[4px]"
              />
              <div>
                <span className="">Score:</span>
                <span className="text-xl font-bold">
                  {" "}
                  {Math.floor(playSession.calculateScore() * 100) / 100}
                </span>
              </div>
            </div>
            <div className="m-2 p-3 rounded-xl flex flex-row gap-1">
              <NotebookPen
                size={20}
                className="text-gray-500 translate-y-[4px]"
              />
              <div>
                Percentage Correct:
                <span className="text-xl text-red-500">
                  {" "}
                  {correct_percentage}%
                </span>
              </div>
            </div>
            <div className="m-2 p-3 rounded-xl flex flex-row gap-1">
              <AlarmClock
                size={20}
                className="text-gray-500 translate-y-[4px]"
              />
              <div>
                Time Spent:
                <span className="text-xl">
                  {" "}
                  {minutesSpent}:
                  {secondsSpent < 10 ? "0" + secondsSpent : secondsSpent}
                </span>
              </div>
            </div>
          </div>
          <div className="bg-white px-3 mb-5 rounded-xl">
            <span className="text-2xl">Breakdown by type</span>
            <div className="flex flex-row gap-4">
              {Object.keys(questionTypes).map((k) => (
                <div className={clsx("my-1 p-2 rounded-lg shadow-lg", 
                  questionTypes[k].correct === 0
                  ? 'bg-red-100'
                  : questionTypes[k].incorrect === 0
                  ? 'bg-green-100'
                  : 'bg-yellow-100')} key={k}>
                  <div className="text-md">{k}</div>
                  <div className="flex flex-row gap-6 justify-center">
                    <div className="text-green-500 text-sm flex flex-row gap-2">
                      <CheckCircle className="translate-y-[2px]" size={15} />{" "}
                      {questionTypes[k].correct}
                    </div>
                    <div className="text-red-500 text-sm flex flex-row gap-2">
                      <XCircle className="translate-y-[2px]" size={15} />{" "}
                      {questionTypes[k].incorrect}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-5 w-3/4 justify-center justify-self-center">
          {playSession.attemptedQuestions.map(
            (question: QuestionAttemptData, index) => (
              <SingleProblemReview
                key={index}
                index={index}
                attempt={question}
              />
            )
          )}
        </div>
      </div>
    </div>
  );
}
