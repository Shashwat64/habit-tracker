"use client"

import { ChevronDown } from "lucide-react";

import { useState } from "react";

import CircularTimer from "./(focus-session)/CircularTimer";


const dummyCategory = ["Coding", "DSA", "Project"]



export default function FocusSession(){
  const [timeLeft, setTimeLeft] = useState<number>(1200); //value should be durationInSeconds
  const [totalTime, setTotalTime] = useState<number>(1200); //value should be durationInSeconds


  const [isRunning, setIsRunning] = useState<boolean>(false); 
  const [timerMode, setTimerMode] = useState<"focus" | "break" | "longBreak">("focus"); 

  return(
    <div className=" bg-card w-1/2 h-full rounded-lg p-5 border-2 border-border">
      <div className="flex flex-col ">
        <h2 className="text-xl font-bold mb-5">Focus Session</h2>
        <label className="flex flex-col gap-2 mb-3 relative">
          Category
          <select 
            name="category" 
            id="category" 
            className="bg-input p-3 rounded-md appearance-none">
            {dummyCategory.map((cate, i)=><option key={i} className="" value={cate}>{cate}</option>)}
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-7/10 -translate-y-1/2" />
        </label>
        <label className="flex flex-col gap-2 relative">
          Title
          <input 
            placeholder="Solve 2 DSA Question"
            type="text" 
            className="bg-input p-3 rounded-md appearance-none" 
          />
        </label>

        <hr className="my-4 border-gray-600"/>
      </div>
      <div className="flex flex-col items-center justify-center">
        <CircularTimer 
          durationInSeconds={totalTime} 
          width={250} 
          height={250} 
          timeLeft={timeLeft} 
          setTimeLeft={setTimeLeft} 
          isRunning={isRunning} 
          setIsRunning={setIsRunning} 
          timerMode={timerMode}
          totalTime={totalTime}
          setTotalTime={setTotalTime}
        />
        <div>

        </div>
      </div>

      
    </div>
  )
}