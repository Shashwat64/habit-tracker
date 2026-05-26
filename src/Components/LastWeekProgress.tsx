import { Check, X } from "lucide-react"

//helper functions
import { getDayName, getDateAfterXDays } from "../utils/helperFunctions"

type dayData = {
  day:string
  status: 'done' | 'missed'
  startDate: string
}



const tempLastData:dayData[] = [
    {day:"2026-05-23", status:'done', startDate:"2026-05-22"},
    {day:"2026-05-24", status:'done', startDate:"2026-05-22" },
    {day:"2026-05-25", status:'missed', startDate:"2026-05-22" },
    {day:"2026-05-26", status:'done', startDate:"2026-05-22" },
    {day:"2026-05-27", status:'done', startDate:"2026-05-22" }
  ]

export default function LastWeekProgress(){

  const weekBeforeDate = new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toLocaleDateString('en-CA')
  console.log("now time is ", new Date().toISOString())
  console.log(weekBeforeDate)

  return(
    <div className="flex">
      {Array.from({ length: 7 }).map((_, i) => {
        const next = getDateAfterXDays(weekBeforeDate, i)
        console.log(next)
        const data = tempLastData.find((info:dayData)=>info.day === next)
        const startDate = tempLastData[0].startDate
        return(
          <div key={i} className="flex flex-col w-12 items-center">
            <p>{i==6 ? "Today" : getDayName(next)}</p>
            <div>
              {next < startDate ? "-" :  data?.status === "done" ? <Check /> : <X /> }
              
            </div>
          </div>
        )})}
    </div>
  )
}