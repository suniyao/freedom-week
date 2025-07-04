"use client"


import { useState } from "react";
import QuestionStatusPreview from "./QuestionStatusPreview";

type QuestionStatus = {
  answered: boolean;
  flagged: boolean;
};


type QuestionCounterProps = {
  totalQuestions: number | string;
  currentQuestionIndex: number;
  questionStatuses: QuestionStatus[];
};

export default function QuestionCounter({
  totalQuestions,
  currentQuestionIndex,
  questionStatuses,
}: QuestionCounterProps) {
  const [openPopup, setOpenPopup] = useState(false);

  return (
    <div className="relative w-fit mx-auto">
      <div
        className="text-lg text-amber-800 text-center cursor-pointer"
        onClick={() => setOpenPopup(!openPopup)}
      >
        {currentQuestionIndex + 1} of {totalQuestions}
      </div>

      {openPopup && (
        <div className="absolute top-full mt-8 -translate-x-8 z-10 w-64 bg-white border rounded-xl shadow-xl p-4">
          <h3 className="text-sm font-semibold text-stone-700">Question Status</h3>
          <div className="grid grid-cols-5 gap-2">
            {questionStatuses.map((status, idx) => (
              <QuestionStatusPreview
                key={idx}
                idx={idx}
                status={status}
                currentQuestionIndex={currentQuestionIndex}
              />
            ))}
          </div>
          <div className="pt-2 text-xs text-stone-500 space-y-1">
            <div>
              <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-2"></span>
              Answered
            </div>
            <div>
              <span className="inline-block w-3 h-3 bg-gray-300 rounded-full mr-2"></span>
              Unanswered
            </div>
            <div>
              <span className="inline-block w-3 h-3 bg-red-500 rounded-full mr-2"></span>
              Flagged
            </div>
            <div>
              <span className="inline-block w-3 h-3 border-2 border-amber-500 rounded-full mr-2"></span>
              Current
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
