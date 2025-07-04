type ScoreProps = {
  score: number;
};

export default function Score({ score }: ScoreProps) {
  return (
    <div className="text-lg text-amber-800">
      Score: {score}
    </div>
  )
}