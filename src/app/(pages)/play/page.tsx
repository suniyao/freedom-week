"use client";

import { InlineMath, BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';
import QuestionBox from "@/app/components/QuestionBox";

export default function PlayPage() {
    return (
        <div>
            <QuestionBox question={{question: "9+10", solution: "21"}} />
        </div>
    )
}