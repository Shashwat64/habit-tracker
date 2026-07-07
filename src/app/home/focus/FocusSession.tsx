"use client"

import { ChevronDown, Divide } from "lucide-react";

import { useState, useEffect } from "react";

import CircularTimer from "./components/CircularTimer";
import ModifyCategoryModal from "./components/ModifyCategoryModal";
import ManageCategories from "./components/ManageCategories";

import type { FocusCategories } from "@/src/types/types";



type FocusSessionProps = {
  categories:FocusCategories[]
}



export default function FocusSession({categories}:FocusSessionProps){

  const unarchievedCategories = categories.filter(cate=>!cate.isArchived)


  const [timeLeft, setTimeLeft] = useState<number>(1200); //value should be durationInSeconds
  const [totalTime, setTotalTime] = useState<number>(1200); //value should be durationInSeconds

  const [currectSession, setCurrectSession] = useState<number>(1); //value should be durationInSeconds


  const [isRunning, setIsRunning] = useState<boolean>(false); 
  const [timerMode, setTimerMode] = useState<"focus" | "break" | "longBreak">("focus"); 
  const [isCategoryOpen, setIsCategoryOpen] = useState<boolean>(false) //make this false
  const [isManageCategoryOpen, setIsManageCategoryOpen] = useState<boolean>(false) //make this false

  const [sessionTitle, setSessionTitle] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(unarchievedCategories?.[0]?.id ?? null);


  useEffect(() => {
    const originalOverflow = document.body.style.overflow;

    if (isCategoryOpen || isManageCategoryOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = originalOverflow;
    }

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isCategoryOpen, isManageCategoryOpen]);


  return(
    <div className=" flex flex-col bg-card w-1/2 h-full rounded-lg p-5 border-2 border-border">
      {isCategoryOpen && <ModifyCategoryModal setIsCategoryOpen={setIsCategoryOpen}/>}
      {isManageCategoryOpen && <ManageCategories setIsManageCategoryOpen={setIsManageCategoryOpen} categories={categories}/>} 
      <div className="flex flex-col">
        <h2 className="text-xl font-bold mb-3">Focus Session</h2>
        <label className="flex flex-col gap-2">
          Category
          <div className="flex gap-2">
            <div className="relative flex flex-col gap-2 flex-1">
              <select
                value={selectedCategoryId ?? ""}
                name="category" 
                id="category" 
                className="bg-input p-3 rounded-md appearance-none"
                onChange={(e) => setSelectedCategoryId(Number(e.target.value))}
              >
                {!selectedCategoryId && (
                  <option value="" disabled>
                    Select a category
                  </option>
                )}

                {unarchievedCategories.map((cate, i)=><option key={i} className="" value={cate.id}>{cate.name}</option>)
                
                }
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
            className="mt-2 text-sm self-center p-1 text-primary hover:underline cursor-pointer"
            onClick={()=>{setIsManageCategoryOpen(true)}}
          >
            Manage categories
          </button>
        </label>
        <label className="flex flex-col gap-2 relative ">
          Title
          <input 
            placeholder="Solve 2 DSA Question"
            value={sessionTitle}
            type="text" 
            className="bg-input p-3 rounded-md appearance-none" 
            onChange={(e) => setSessionTitle(e.target.value)}
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