"use server"

import db from "@/src/lib/db"

type addHabitProps = {
  name:string
  goal:string
  detail:string
  freq:string
}

export async function addHabit(data:addHabitProps) {
  /* await db.query(
    "INSERT INTO habits (name) VALUES ($1)",
    [name]
  ) */
 console.log(JSON.stringify(data, null, 2))
}

export async function toggleTodayHabit(){ //this will be replaced by id, and I will use today date (in server) to add of remove the dates from the date list

} 