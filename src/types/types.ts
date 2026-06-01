export type DayData = {
  day:string
  status: 'done' | 'missed'
  startDate: string
}

export type HabitDetailsFull = {
  id:number
  userId:number
  name:string
  goal:string
  details:string
  freq:string
  startDate:string
  completedDates:string[]
  isAchieved:boolean
  isDeleted:boolean
}

export type HabitDetails = Omit<HabitDetailsFull, "id" | "userId">