"use client"

import { Check, X } from "lucide-react"
import { useState } from "react"

//helper functions
import { getDayName, getDateAfterXDays, getDateOf1WeekAgo, isOneDayApart } from "../utils/helperFunctions"

import type { DayData, HabitDetails } from "../types/types"

import { editCompletedDates } from "../app/actions/habits"



export default function LastWeekProgress({
      completedDates,
      startDate,
      habitId
    }: {
      completedDates: string[]
      startDate: string
      habitId:number
    }) {

  const weekBeforeDate:string = getDateOf1WeekAgo()
  const [isTodayDone, setIsTodayDone] = useState<boolean>(false)

  const dateToChange = new Date().toISOString().split("T")[0];  

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
            <div 
              className="flex flex-col items-center"
              onClick={async()=>{await editCompletedDates(habitId, dateToChange)}}
            >
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
            </div>
          )}
            {i < 6 && (
          <div className="flex flex-col items-center">
            <p>{getDayName(next)}</p>
            <div>
              {next < startDate
                ? "-"
                : data
                  ? <Check className="text-secondary w-5 h-5" />
                  : <X className="text-secondary w-5 h-5" />
              }
            </div>
          </div>
        )}
          </div>
        )})}
    </div>
  )
}