// app/home/habits/page.tsx

import { getHabits, getCompletedDates } from "@/src/app/actions/habits";
import HabitsPage from "./components/HabitsPage";





export default async function Page() {
  const habits = await getHabits();
  
  const allCompletedDates = await getCompletedDates();

  const habitsWithDates = habits.map(habit=>{
    const comDateForHabit = allCompletedDates.filter(dateInfo => dateInfo.habit_id === habit.id)
      .map(date =>({
        completedOn:date.completed_on,
        habitId:date.habit_id,
        id: date.id,
        progress: date.progress,
        target: date.target
      }))

    return {
      id: habit.id,
      userId: habit.user_id,

      name: habit.name,
      goal: habit.goal,
      details: habit.details,

      frequency: habit.frequency,
      status: habit.status,
      isDeleted: habit.is_deleted,

      startDate: habit.start_date,
      createdAt: habit.created_at,
      updatedAt: habit.updated_at,
      completedDates:comDateForHabit
    }
  })

  console.log("habitsWithDates is ", habitsWithDates);
  
  return <HabitsPage habits={habitsWithDates} />;
}