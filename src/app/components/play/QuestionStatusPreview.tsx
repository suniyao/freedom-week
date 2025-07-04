'use client';

import { Bookmark } from "lucide-react";

type QuestionStatus = {
  answered: boolean;
  flagged: boolean;
};

type QuestionStatusPreviewProps = {
  idx: number;
  status: QuestionStatus;
  currentQuestionIndex: number;
};

export default function QuestionStatusPreview({
  idx,
  status,
  currentQuestionIndex,
}: QuestionStatusPreviewProps) {
  const getStatusColor = (status: QuestionStatus) => {
    if (status.answered) return "bg-black text-white";
    if (idx === currentQuestionIndex) return "ring-2 ring-amber-400 bg-amber-200 text-black";
    return "bg-white border border-black text-black";
  };

  return (
    <div className="relative w-8 h-8">
      {/* Bookmark icon if flagged */}
      {status.flagged && (
        <Bookmark fill="#FF0000" className="absolute -top-1 -right-1 w-4 h-4" />
      )}

      <div
        className={`w-full h-full rounded-full text-xs font-medium flex items-center justify-center cursor-pointer transition-all duration-150
          ${getStatusColor(status)}
        `}
      >
        {idx + 1}
      </div>
    </div>
  );
}