"use client"
//helper functions
import { capitalise, findingStreak, getDateOf1WeekAgo, getYYYYMMDD } from "../utils/helperFunctions"
//component
import LastWeekProgress from "./LastWeekProgress"

//types
import type { DayData, HabitDetails } from "../types/types"

//icons
import { EllipsisVertical, Check} from "lucide-react" 

//data
import { tempLastData, dummyDataForHabits } from "../utils/tempData"

export default function HabitsCards({ habitData }: { habitData: HabitDetails }){

  console.log(habitData)
  const lastWeekDate = getDateOf1WeekAgo()
  const last7Completions = dummyDataForHabits[0].completedDates.filter(date=>date.localeCompare(lastWeekDate)>=0)

  const progressPercent = Math.round((last7Completions.length/7)*100)
  const streak = findingStreak(habitData.completedDates)


  return(
      <div className="bg-card rounded-2xl py-4 px-6 flex items-center">
        <div className="flex justify-between flex-1">
          <div className="flex flex-col justify-between">
            <h2 className="font-bold">{habitData.name}</h2>
            <p className="text-secondary text-sm">{habitData.goal}</p>
          </div>
          <div className="flex flex-col justify-between">
            <h2 className="font-bold">Frequency</h2>
            <p className="text-secondary text-sm">{capitalise(habitData.frequency)}</p>
          </div>

          <div className="flex flex-col justify-between">
            <h2 className="font-bold">Streak</h2>
            <p className="text-secondary text-sm">{streak}</p>
          </div>

          <div className="flex flex-col justify-between w-50">
            <h2>Completion %</h2>
            <div className="flex items-center gap-2">
              <p className="text-secondary text-sm">{progressPercent}%</p>
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          </div>
          <LastWeekProgress completedDates={habitData.completedDates} startDate={habitData.startDate} />
        </div>
        <div className="bg-primary-hover p-1 rounded-lg ml-6">
          <EllipsisVertical />
        </div>
      </div>
  )
}