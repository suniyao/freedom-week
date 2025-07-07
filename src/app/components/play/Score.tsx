type ScoreProps = {
  score: number;
};

export default function Score({ score }: ScoreProps) {
  return (
    <div className="text-lg text-amber-800">
      Score: {Math.floor(score * 100) / 100}
    </div>
  )
}