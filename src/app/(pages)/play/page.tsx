"use client";

import { InlineMath, BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';
import QuestionBox from "@/app/components/QuestionBox";
import ProblemTypeMenu from '@/app/components/ProblemTypeMenu';
import Score from '@/app/components/Score';

export default function PlayPage() {
    return (
        <div className="h-dvh w-full flex bg-amber-100 text-stone-900">
            <div className='w-60 p-2 bg-amber-200'>
                <ProblemTypeMenu />
            </div>

            {/* Main content */}
            <div className="flex-1 flex items-center justify-center">
                <QuestionBox question={{ question: "9+10", solution: "21", difficulty: "hard", type: "linear-equation" }} />
            </div>
            <div className='relative top-5 right-10'>
                <div className='bg-amber-300 p-4 rounded-lg font-semibold'>
                    <Score score={1337} />
                </div>
            </div>
        </div>
    )
}