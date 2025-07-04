import ProblemTypeMenu from "./ProblemTypeMenu";
import QuestionBox from "./QuestionBox";
import QuestionCounter from "./QuestionCounter";
import Score from "./Score";

export default function Play() {
  return (
    <div className="min-h-screen w-full flex bg-amber-100 text-stone-900">
      <div className='mt-5 ml-10'>
        <div className="bg-amber-200 p-4 rounded-lg font-semibold w-30">
          <QuestionCounter totalQuestions={10} currentQuestionIndex={0} />
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center">
        <QuestionBox question={{ question: "9+10", solution: "21", difficulty: "hard", type: "linear-equation" }} />
      </div>
      <div className='mt-5 mr-10'>
        <div className='bg-amber-200 p-4 rounded-lg font-semibold w-30'>
          <Score score={1337} />
        </div>
      </div>   
    </div>
  )
}