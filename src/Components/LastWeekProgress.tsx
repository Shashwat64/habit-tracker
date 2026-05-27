import { Check, X } from "lucide-react"

//helper functions
import { getDayName, getDateAfterXDays, getDateOf1WeekAgo, isOneDayApart } from "../utils/helperFunctions"

import type { dayData, habitDetails } from "../types/types"

//data
import { tempLastData } from "../utils/tempData"


export default function LastWeekProgress({
      completedDates,
      startDate,
    }: {
      completedDates: string[]
      startDate: string
    }) {

  const weekBeforeDate:string = getDateOf1WeekAgo()

  

  return(
    <div className="flex w-70">
      {Array.from({ length: 7 }).map((_, i) => {
        const next = getDateAfterXDays(weekBeforeDate, i)
        const data = completedDates.find((info:string)=>info === next)
        return(
          <div key={i} className="flex flex-col justify-between w-12 items-center">
            <p>{i==6 ? "Today" : getDayName(next)}</p>
            <div>
              {next < startDate ? "-" :  data ? <Check className="text-secondary w-5 h-5" /> : <X className="text-secondary w-5 h-5"/> }
            </div>
          </div>
        )})}
    </div>
  )
}