"use client"

import { Check, X } from "lucide-react"
import { useState } from "react"

//helper functions
import { getDayName, getDateAfterXDays, getDateOf1WeekAgo, isOneDayApart } from "../utils/helperFunctions"

import type { DayData, HabitDetails } from "../types/types"

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
  const [isTodayDone, setIsTodayDone] = useState<boolean>(false)
  
  

  return(
    <div className="flex w-70">
      {Array.from({ length: 7 }).map((_, i) => {
        const next = getDateAfterXDays(weekBeforeDate, i)
        const data = completedDates.find((info:string)=>info === next)
        return(
          <div key={i} 
            className={`flex flex-col justify-between  items-center ${i===6 ? "bg-input w-18 rounded-lg hover:bg-card-hover hover:bg-(--card-hover)" : "w-12"}`}
            onClick={i === 6 ? ()=>{setIsTodayDone(prev=>!prev)} : undefined}
          >

            {i === 6 && (
            <>
              <p>Today</p>
              <div className="relative">
                {next < startDate ? "-" : isTodayDone
                  ? <Check className="text-secondary w-5 h-5" />
                  : <X className="text-secondary w-5 h-5" />
                }
                <div className="absolute ">
                  <p></p>
                </div>
              </div>
            </>
          )}
            {i < 6 && (
          <>
            <p>{getDayName(next)}</p>
            <div>
              {next < startDate
                ? "-"
                : data
                  ? <Check className="text-secondary w-5 h-5" />
                  : <X className="text-secondary w-5 h-5" />
              }
            </div>
          </>
        )}
          </div>
        )})}
    </div>
  )
}