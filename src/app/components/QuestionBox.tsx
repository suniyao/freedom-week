"use client";

import {Question} from "@/app/types";
import { BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';

type QuestionBoxProps = {
    question: Question;
}


export default function QuestionBox(props: QuestionBoxProps) {
    const {question, solution} = props.question;

    return (
        <div className={"p-4 flex bg-amber-300 text-stone-900 flex-col items-center justify-center gap-4"}>
            <BlockMath>
                {question}
            </BlockMath>
            <div>
                <input className={"p-2 bg-amber-100"}/>
            </div>
        </div>
    )
}