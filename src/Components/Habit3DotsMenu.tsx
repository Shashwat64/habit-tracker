import { useState, useContext, useEffect } from "react";
import { achieveHabit, unachieveHabit, deleteHabit  } from "../app/actions/habits";
import ManageHabitModal from "./ManageHabitModal";

import type { HabitDetailsFull } from "../types/types";

//context
import { HabitModalContext } from "../context/HabitModalContext"


type Habit3DotsMenu = {
  habitData: HabitDetailsFull
}

export default function Habit3DotsMenu({ habitData } : Habit3DotsMenu){
  const isAchieved = habitData.status.toLowerCase() === "achieved"

    const context = useContext(HabitModalContext);

    if (!context) return null;

    const {threeDotsMenu, setThreeDotsMenu, isHabitModalOpen, setIsHabitModalOpen, habitId,setHabitId } = context

    console.log("habitId before useEffect", habitId);
    useEffect(()=>{
      setHabitId(habitData.id) 
    },[])
    console.log("habitId after useEffect", habitId);
  
  return( 
    <div className="absolute -bottom-40 -left-full z-50 flex flex-col bg-dropdown p-2 gap-1 rounded-md min-w-32 shadow-lg">
      <button 
        className="w-full text-left px-3 py-2 hover:bg-card-hover rounded-md"
        onClick={() => {
          setIsHabitModalOpen(true);
          setThreeDotsMenu(-1);
        }}
      >
        Edit
      </button>

      <button 
        className="w-full text-left px-3 py-2 hover:bg-card-hover rounded-md"
        onClick={() => {
          isAchieved
            ? unachieveHabit(habitData.id)
            : achieveHabit(habitData.id)
          setThreeDotsMenu(-1);
        }}
      >
        {isAchieved ? "Unachieve" : "Achieve"}
        
      </button>

      <hr className="border-border" />

      <button 
        className="w-full text-left px-3 py-2 text-red-400 hover:bg-red-500/10 rounded-md"
        onClick={() => {
          deleteHabit(habitData.id);
          setThreeDotsMenu(-1);
        }} 
      >
        Delete
      </button>
    </div>
  )
}