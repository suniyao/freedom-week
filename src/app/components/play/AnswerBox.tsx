import { InlineMath } from "react-katex";
import clsx from "clsx";
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
            value={values?.A ?? ""}
            onChange={(e) => onValuesChange?.({ ...values, A: e.target.value })}/>
          <InlineMath> ~ x^2 + ~ </InlineMath>
          <input className={inputClass + `${getRingColor("B")}`} 
            value={values?.B ?? ""}
            onChange={(e) => onValuesChange?.({ ...values, B: e.target.value })}/>
          <InlineMath>~ x  + ~</InlineMath>
          <input className={inputClass + `${getRingColor("C")}`} 
            value={values?.C ?? ""}
            onChange={(e) => onValuesChange?.({ ...values, C: e.target.value })}/>
        </div>
      )

    case 'linear-equation':
      return (
        <div>
          <InlineMath>x = ~</InlineMath>
          <input className={clsx(inputClass, getRingColor("x"))} 
            value={values?.x ?? ""}
            onChange={(e) => onValuesChange?.({ ...values, x: e.target.value })}/>
        </div>
      )
      
    case 'linear-system':
      return (
        <div className="flex flex-row gap-2">
          <div>
            <InlineMath> x=~</InlineMath>
            <input className={clsx(inputClass, getRingColor("x"))} 
              value={values?.x ?? ""}
              onChange={(e) => onValuesChange?.({ ...values, x: e.target.value })}/>
          </div>
          <div>
            <InlineMath>, y=~</InlineMath>
            <input className={clsx(inputClass, getRingColor("y"))} 
              value={values?.y ?? ""}
              onChange={(e) => onValuesChange?.({ ...values, y: e.target.value })}/>
          </div>
        </div>
      )
    case 'quadratic-factoring':
      return (
        <div>
          <input className={clsx(inputClass, getRingColor("coefficient"))} 
              value={values?.coefficient ?? ""}
              onChange={(e) => onValuesChange?.({ ...values, coefficient: e.target.value })}/>
          <InlineMath>~(~</InlineMath>
          <input className={clsx(inputClass, getRingColor("coefficient_1"))} 
              value={values?.coefficient_1 ?? ""}
              onChange={(e) => onValuesChange?.({ ...values, coefficient_1: e.target.value })}/>
          <InlineMath>~x + ~</InlineMath>
          <input className={clsx(inputClass, getRingColor("constant_1"))} 
              value={values?.constant_1 ?? ""}
              onChange={(e) => onValuesChange?.({ ...values, constant_1: e.target.value })}/>
          <InlineMath>~)(~</InlineMath>
          <input className={clsx(inputClass, getRingColor("coefficient_2"))} 
              value={values?.coefficient_2 ?? ""}
              onChange={(e) => onValuesChange?.({ ...values, coefficient_2: e.target.value })}/>
          <InlineMath>~x + </InlineMath>
          <input className={clsx(inputClass, getRingColor("constant_2"))} 
              value={values?.constant_2 ?? ""}
              onChange={(e) => onValuesChange?.({ ...values, constant_2: e.target.value })}/>
          <InlineMath>~)</InlineMath>
        </div>
      )

    case 'quadratic-vertex':
      return (
        <div>
          <InlineMath>(~</InlineMath>
          <input className={clsx(inputClass, getRingColor("x"))} 
            value={values?.x ?? ""}
            onChange={(e) => onValuesChange?.({ ...values, x: e.target.value })}
          />
          <InlineMath>~,~ </InlineMath>
          <input className={clsx(inputClass, getRingColor("y"))} 
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