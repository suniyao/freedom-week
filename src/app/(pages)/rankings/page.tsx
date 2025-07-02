import RankEntry from "@/app/components/RankEntry"

export default function Rankings() {
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