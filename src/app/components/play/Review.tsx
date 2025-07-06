import SingleProblemReview from "./SingleProblemReview";
import {usePlaySession} from "@/app/components/play/PlaySessionContext";
import {QuestionAttemptData} from "@/app/types";

export default function Review() {
    const playSession = usePlaySession();

    return (
        <div className="min-h-screen w-full bg-amber-50 text-stone-900 py-16 px-4 sm:px-8">
            <div className="max-w-3xl mx-auto space-y-6">
                <h1 className="text-3xl font-bold text-center mb-8">Review Your Answers</h1>
                <div className="flex flex-col gap-6">
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
