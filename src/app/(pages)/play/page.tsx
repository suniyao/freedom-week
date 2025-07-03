"use client";

import { InlineMath, BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';
import QuestionBox from "@/app/components/QuestionBox";
import ProblemTypeMenu from '@/app/components/ProblemTypeMenu';

export default function PlayPage() {
    return (
        <div className="h-dvh w-full flex bg-amber-100 text-stone-900">
            <div className='w-60 p-2 bg-amber-200 rounded-lg'>
                <ProblemTypeMenu />
            </div>

            {/* Main content */}
            <div className="flex-1 flex items-center justify-center">
                <QuestionBox question={{ question: "9+10", solution: "21" }} />
            </div>
        </div>
    )
}