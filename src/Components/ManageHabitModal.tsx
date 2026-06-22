"use client"

import { X } from "lucide-react" 
import { useEffect } from "react"
import { addHabit, editHabit } from "@/src/app/actions/habits"

type ManageHabitModalProps = {
  isAddHabitOpen: boolean
  setIsAddHabitOpen: React.Dispatch<React.SetStateAction<boolean>>
  habitId?:number
}

export default function ManageHabitModal({isAddHabitOpen, setIsAddHabitOpen, habitId=-1}:ManageHabitModalProps ){

  const isEdit = habitId === -1;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault()

    const formData = new FormData(e.currentTarget)

    const data = {
      name: formData.get("name") as string,
      goal: formData.get("goal") as string,
      detail: formData.get("detail") as string,
      frequency: formData.get("frequency") as string,
    }

    if(isEdit){
      await addHabit(data)
    }else{
      await editHabit(habitId, data)
    }

    setIsAddHabitOpen(false)
  }

  
  return(
    <section className="fixed inset-0 bg-black/60 z-10 flex items-center justify-evenly" onClick={e=>(setIsAddHabitOpen(false))}>
      <div 
        onClick={(e) => e.stopPropagation()}
        className="h-150 flex flex-col w-120 bg-background rounded-xl p-6"
      >
        <div className="relative">
        <X 
          className="absolute right-0 rounded-md hover:bg-red-400"
          onClick={e=>(setIsAddHabitOpen(false))}
        />
          <h2 className="text-2xl font-bold mb-3">{isEdit ? "Add" : "Edit"} habit</h2>
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
              required
            />
          </label>

          <label>
            Details
            <textarea 
              name="detail"
              className="w-full h-25 rounded-lg bg-input mt-2 px-4 py-2"
              placeholder="Read 10 pages of Thus Spake Zarathustra by Friedrich Nietzsche"
              required
            ></textarea>
          </label>

          <label>
            Frequency
            <select name="frequency" className="block w-full bg-input px-4 py-2 rounded-lg text-muted">
              <option value="daily">Daily</option>
            </select>
          </label>

          <button className="self-end bg-primary px-4 py-2 rounded-lg">Add habit</button>

        </form>
      </div>
    </section>
  )
}