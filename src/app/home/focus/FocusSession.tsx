"use client"

import { ChevronDown, Divide } from "lucide-react";

import { useState } from "react";

import CircularTimer from "./(focus-session)/CircularTimer";


const dummyCategory = ["Coding", "DSA", "Project"]



export default function FocusSession(){
  const [timeLeft, setTimeLeft] = useState<number>(1200); //value should be durationInSeconds
  const [totalTime, setTotalTime] = useState<number>(1200); //value should be durationInSeconds

  const [currectSession, setCurrectSession] = useState<number>(1); //value should be durationInSeconds


  const [isRunning, setIsRunning] = useState<boolean>(false); 
  const [timerMode, setTimerMode] = useState<"focus" | "break" | "longBreak">("focus"); 
  const [isCategoryOpen, setIsCategoryOpen] = useState<boolean>(false);

  return(
    <div className=" flex flex-col bg-card w-1/2 h-full rounded-lg p-5 border-2 border-border">
      {isCategoryOpen && 
      <div>
        
      </div>}
      <div className="flex flex-col">
        <h2 className="text-xl font-bold mb-3">Focus Session</h2>
        <label className="flex flex-col gap-2">
          Category
          <div className="flex gap-2">
            <div className="relative flex flex-col gap-2 flex-1">
              <select defaultValue=""
                name="category" 
                id="category" 
                className="bg-input p-3 rounded-md appearance-none">
                <option value="" disabled>Select a category</option>
                {dummyCategory.map((cate, i)=><option key={i} className="" value={cate}>{cate}</option>)}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2" />
            </div>
            <button 
              className="bg-primary px-2 rounded-md transition-all duration-150 hover:scale-[1.02] hover:brightness-110 active:scale-[0.98] active:brightness-95 cursor-pointer"
              onClick={()=>{setIsCategoryOpen(true)}}
              >Add Category</button>
              
          </div>
              <button
                type="button"
                className="mt-2 text-sm self-center p-1 text-primary hover:underline cursor-pointer "
              >
                Manage categories
              </button>
        </label>
        <label className="flex flex-col gap-2 relative ">
          Title
          <input 
            placeholder="Solve 2 DSA Question"
            type="text" 
            className="bg-input p-3 rounded-md appearance-none " 
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
          setTimerMode={setTimerMode}
          totalTime={totalTime}
          setTotalTime={setTotalTime}
          currectSession={currectSession}
          setCurrectSession={setCurrectSession}
        />
      </div>
       <hr className="my-4 border-gray-600"/>
      <div className=" py-2  flex-1 flex flex-col">
          <h2 className="text-2xl mb-2">Today:</h2>

        <div className="flex justify-between">
          <p>Current Focus: {currectSession}/4</p>
          <p>Next: {currectSession===4 ? "Long Break 20 mins" : "Short Break 5 mins"}</p>
        </div>
      </div>
      
    </div>
  )
}