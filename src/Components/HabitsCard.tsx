"use client"

import { capitalise } from "../utils/helperFunctions"

import LastWeekProgress from "./LastWeekProgress"

import { EllipsisVertical, Check} from "lucide-react" 

export default function HabitsCards(){
  
   const habitsDetails ={
      name:"Drink water",
      detail:"8 Glasses Daily",
      freq:"daily",
      streak:10,
      completedDates:["2026-05-20", "2026-05-21"], //This will have date when the habits was done
    }

    const progress = 80

  return(
      <div className="bg-card rounded-2xl py-4 px-6 flex items-center">
        <div className="flex justify-between flex-1">
          <div className=" ">
            <h2 className="font-bold">{habitsDetails.name}</h2>
            <p className="text-secondary text-sm">{habitsDetails.detail}</p>
          </div>
          <div>
            <h2 className="font-bold">Frequency</h2>
            <p>{capitalise(habitsDetails.freq)}</p>
          </div>

          <div>
            <h2 className="font-bold">Streak</h2>
            <p>{habitsDetails.streak}</p>
          </div>

          <div className="flex flex-col justify-between w-50">
            <h2>Completion %</h2>
            <div className="flex items-center gap-2">
              <p>{progress}%</p>
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>
          <LastWeekProgress/>
        </div>
        <div className="bg-primary-hover p-1 rounded-lg ml-6">
          <EllipsisVertical />
        </div>
      </div>
  )
}