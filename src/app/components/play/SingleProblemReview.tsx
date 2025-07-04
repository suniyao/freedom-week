import { Question } from "@/app/types";

type SingleProblemReviewProps = {
  index: number;
  problem: {
    id: string;
    question: Question;
  };
  userAnswer: string | string[] | { x: number; y?: number };
  isCorrect: boolean;
};


export default function SingleProblemReview( {index, problem}: SingleProblemReviewProps ) {
  return (
    <div>
      
    </div>
  )
} 