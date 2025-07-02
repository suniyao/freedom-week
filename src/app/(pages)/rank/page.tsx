import RankEntry from "../../components/RankEntry";

export default function Rank() {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="w-120">
        <RankEntry userId="000000"/>
        <RankEntry userId="000000"/>
        <RankEntry userId="000000"/>
      </div>
    </div>
  )
}