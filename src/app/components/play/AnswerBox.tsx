import { InlineMath } from "react-katex";

// type QuestionType = 
//   | 'binomial-expansion'
//   | 'linear-equation'
//   | 'linear-system'
//   | 'quadratic-factoring'
//   | 'quadratic-vertex';

type AnswerBoxProps = {
  values?: Record<string, string|number>;
  onValuesChange?: (newValues: Record<string, string|number>) => void;
  questionType?: string;
  inputStatuses?: Record<string, "correct" | "incorrect" | "unanswered">;
}

export default function AnswerBox({ values, onValuesChange, questionType, inputStatuses }: AnswerBoxProps) {
  const inputClass = `p-2 bg-amber-100 rounded-lg w-10`;
  const getRingColor = (key: string) => {
    if (inputStatuses?.[key] === "correct") return "ring-2 ring-green-500";
    if (inputStatuses?.[key] === "incorrect") return "ring-2 ring-red-500";
    return "";
  };
  switch (questionType) {
    case 'binomial-expansion':
      return (
        <div>
          <input className={inputClass + `${getRingColor("A")}`} 
            value={values?.a ?? ""}
            onChange={(e) => onValuesChange?.({ ...values, a: e.target.value })}/>
          <InlineMath> ~ x^2 + ~ </InlineMath>
          <input className={inputClass + `${getRingColor("B")}`} 
            value={values?.b ?? ""}
            onChange={(e) => onValuesChange?.({ ...values, b: e.target.value })}/>
          <InlineMath>~ x  + ~</InlineMath>
          <input className={inputClass + `${getRingColor("C")}`} 
            value={values?.c ?? ""}
            onChange={(e) => onValuesChange?.({ ...values, c: e.target.value })}/>
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
        <div className="flex flex-row gap-2">
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
          <InlineMath>~x + ~</InlineMath>
          <input className={inputClass} />
          <InlineMath>~)(~</InlineMath>
          <input className={inputClass} />
          <InlineMath>~x + </InlineMath>
          <input className={inputClass} />
          <InlineMath>~)</InlineMath>
        </div>
      )

    case 'quadratic-vertex':
      return (
        <div>
          <InlineMath>(~</InlineMath>
          <input className={inputClass} 
            value={values?.x ?? ""}
            onChange={(e) => onValuesChange?.({ ...values, x: e.target.value })}
          />
          <InlineMath>~,~ </InlineMath>
          <input className={inputClass}
            value={values?.y ?? ""}
            onChange={(e) => onValuesChange?.({ ...values, y: e.target.value })}
          />
          <InlineMath>~)</InlineMath>
        </div>
      )
  }
  return (
    <div></div>
  )
}