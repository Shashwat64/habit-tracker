"use client"

import Link from "next/link"
import { useState, useEffect, useRef } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Plus } from "lucide-react" 

//types
import type { DayData, HabitDetailsFull } from "@/src/types/types" 


//components
import HabitsCard from "@/src/Components/HabitsCard"
import AddHabitModal from "@/src/Components/AddHabitsModal"



export default function HabitsPage({ habits } : { habits:HabitDetailsFull[] }) {

  const [isAddHabitOpen, setIsAddHabitOpen] = useState<boolean>(false)

  const [threeDotsMenu, setThreeDotsMenu] = useState<number>(-1)
  const menuRef = useRef<HTMLDivElement>(null);


  console.log("in HabitsPage", threeDotsMenu)

  const [search, setSearch] = useState<string>("");




  const router = useRouter()
  const searchParams = useSearchParams()
  
  const serarchParam = searchParams.get('filter') || 'all'

  useEffect(() => {
    if (!searchParams.get('filter')) {
      router.replace('?filter=all')
    }
  }, [searchParams, router])

  console.log(habits);

  //filtering based on the Status
  habits = habits.filter(habit =>
    serarchParam === "all" ||
    habit.status.toLowerCase() === serarchParam)

  //filtering based on the input field (name, goal and details)
  habits = habits.filter(habit=>
    habit.name.toLowerCase().includes(search.toLowerCase()) || 
    habit.goal.toLowerCase().includes(search.toLowerCase()) || 
    habit.details.toLowerCase().includes(search.toLowerCase())
  )


  const underlineClass = `relative
    text-primary
    font-bold
    after:absolute
    after:left-0
    after:bottom-0
    after:h-[2px]
    after:w-full
    after:bg-[var(--primary)]`


  return (
    <main className="p-10">
      {isAddHabitOpen && <AddHabitModal isAddHabitOpen={isAddHabitOpen} setIsAddHabitOpen={setIsAddHabitOpen}/>}
      <section className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold">Habits</h1>
          <h2 className="text-muted mt-2">Build consistant habits and transform your life</h2>
        </div>
        

        <div className="flex gap-5">
          <input 
            type="text" 
            className="flex gap-1 px-3 py-2 rounded-lg border border-border" 
            placeholder="Search habits"
            onChange={(e) => setSearch(e.target.value)}
          />

          <button className="flex gap-1 px-3 py-2 bg-primary rounded-lg hover:scale-105 active:scale-95" onClick={()=>setIsAddHabitOpen(prev=>!prev)}> <Plus /> Add Habit</button>
        </div>
      </section>

      <section className="my-6 flex justify-between items-center">
        <div className="flex gap-5 text-secondary">
          <Link 
            href="?filter=all"
            className={`px-2 py-1 mx-1 ${serarchParam==="all" ? underlineClass : ""}`}
          >All</Link>
          <Link 
            href="?filter=active"
            className={`px-2 py-1 mx-1 ${serarchParam==="active" ? underlineClass : ""}`}
          >Active</Link>
          <Link 
            href="?filter=achieved"
            className={`px-2 py-1 mx-1 ${serarchParam==="achieved" ? underlineClass : ""}`}
          >Achieved</Link>
        </div>
        
      </section>

      <section className="flex flex-col gap-3">
        {habits.map((data:HabitDetailsFull, i:number)=>
          <HabitsCard key={i} habitData={data} threeDotsMenu={threeDotsMenu} setThreeDotsMenu={setThreeDotsMenu} menuRef={threeDotsMenu === data.id ? menuRef : undefined} />)
        }
      </section>

    </main>
  )
}