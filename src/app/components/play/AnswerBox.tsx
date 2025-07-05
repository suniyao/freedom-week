import { InlineMath } from "react-katex";

// type QuestionType = 
//   | 'binomial-expansion'
//   | 'linear-equation'
//   | 'linear-system'
//   | 'quadratic-factoring'
//   | 'quadratic-vertex';

type AnswerBoxProps = {
  ringColor?: string;
  value?: string;
  onChange?: (value: string) => void;
  questionType?: string;
  key?: string;
}

export default function AnswerBox({ ringColor, value, key, onChange, questionType }: AnswerBoxProps) {
  const inputClass = `p-2 bg-amber-100 rounded-lg w-10 ${ringColor}`;

  switch (questionType) {
    case 'binomial-expansion':
      return (
        <div>
          <input className={inputClass} />
          <InlineMath> ~ x^2 + ~ </InlineMath>
          <input className={inputClass} />
          <InlineMath>~ x  + ~</InlineMath>
          <input className={inputClass} />
        </div>
      )

    case 'linear-equation':
      return (
        <div>
          <InlineMath>x = </InlineMath>
          <input className={inputClass} />
        </div>
      )
      
    case 'linear-system':
      return (
        <div className="flex flex-col gap-2">
          <div>
            <InlineMath> x:~</InlineMath>
            <input className={inputClass} />
          </div>
          <div>
            <InlineMath> y:~</InlineMath>
            <input className={inputClass} />
          </div>
        </div>
      )
    case 'quadratic-factoring':
      return (
        <div>
          <input className={inputClass} />
          <InlineMath>~(~</InlineMath>
          <input className={inputClass} />
          <InlineMath>~ + ~</InlineMath>
          <input className={inputClass} />
          <InlineMath>~)(~</InlineMath>
          <input className={inputClass} />
          <InlineMath>~ + </InlineMath>
          <input className={inputClass} />
          <InlineMath>~)</InlineMath>
        </div>
      )

    case 'quadratic-vertex':
      return (
        <div>
          <InlineMath>(~</InlineMath>
          <input className={inputClass} />
          <InlineMath>~,~ </InlineMath>
          <input className={inputClass} />
          <InlineMath>~)</InlineMath>
        </div>
      )
  }
  return (
    <div></div>
  )
}