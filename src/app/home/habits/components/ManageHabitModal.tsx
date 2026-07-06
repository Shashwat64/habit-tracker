"use client"

import { X } from "lucide-react" 
import { useState, useContext, SubmitEvent } from "react"
import { addHabit, editHabit } from "@/src/app/actions/habits"

//context
import { HabitModalContext } from "../../../../context/HabitModalContext"

//types
import type { HabitDetailsFull } from "@/src/types/types" 

export default function ManageHabitModal({habits}:{habits:HabitDetailsFull[]}){


  const context = useContext(HabitModalContext);

  if(!context) return;

  const {threeDotsMenu, setThreeDotsMenu, isHabitModalOpen, setIsHabitModalOpen, habitId,setHabitId } = context

  const habit = habits?.find(habit=>habit.id===habitId)

  console.log("Habit is ", habit)

  const [formData, setFormData] = useState({
    name: habit?.name ||  "",
    goal: habit?.goal || "",
    details: habit?.details || "",
    frequency: habit?.frequency ||  "daily",
  });

  const isEdit = habitId !== -1;

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e: SubmitEvent<HTMLFormElement>){
    e.preventDefault()

    const formData = new FormData(e.currentTarget)

    const data = {
      name: formData.get("name") as string,
      goal: formData.get("goal") as string,
      detail: formData.get("detail") as string,
      frequency: formData.get("frequency") as string,
    }

    if(isEdit){
      await editHabit(habitId, data)
      setHabitId(-1);
    }else{
      await addHabit(data)
    }
    
    setIsHabitModalOpen(false)
  }

  
  return(
    <section className="fixed inset-0 bg-black/60 z-10 flex items-center justify-evenly" onClick={e=>(setIsHabitModalOpen(false))}>
      <div 
        onClick={(e) => e.stopPropagation()}
        className="h-150 flex flex-col w-120 bg-background rounded-xl p-6 border border-border"
      >
        <div className="relative">
        <X 
          className="absolute right-0 rounded-md hover:bg-red-400"
          onClick={e=>(setIsHabitModalOpen(false))}
        />
          <h2 className="text-2xl font-bold mb-3">{isEdit ? "Edit" : "Add"} habit</h2>
          <p className="text-muted text-sm">Create a new habit to start your journey.</p>
        </div>
        <form onSubmit={handleSubmit} className="mt-8 flex-1 flex flex-col gap-2 justify-between">
          <label>
            Habit Name
            <input 
              type="text" 
              name="name"
              className="w-full h-12 rounded-lg bg-input mt-2 px-4"
              placeholder="Reading"
              value={formData.name}
              onChange={handleChange}
              required
              />
          </label>

          <label>
            Goals
            <input 
              type="text"
              name="goal"
              className="w-full h-12 rounded-lg bg-input mt-2 px-4"
              placeholder="For 20 minutes"
              value={formData.goal}
              onChange={handleChange}
              required
              />
          </label>

          <label>
            Details
            <textarea 
              name="details"
              className="w-full h-25 rounded-lg bg-input mt-2 px-4 py-2"
              placeholder="Read 10 pages of Thus Spake Zarathustra by Friedrich Nietzsche"
              value={formData.details}
              onChange={handleChange}
              required
            ></textarea>
          </label>

          <label>
            Frequency
            <select 
              name="frequency" 
              className="block w-full bg-input px-4 py-2 rounded-lg text-muted"
              onChange={handleChange}
            >
              <option value="daily">Daily</option>
            </select>
          </label>

          <button className="self-end bg-primary px-4 py-2 rounded-lg">{isEdit ? "Edit" : "Add"} habit</button>

        </form>
      </div>
    </section>
  )
}