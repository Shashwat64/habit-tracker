export type DayData = {
  day:string
  status: 'done' | 'missed'
  startDate: string
}

export type CompletedDate = {
  completedOn:Date
  habitId:number
  id:number
  progress:number | null
  target:number | null
}

export type HabitDetailsFull = {
  id: number;
  userId: number;

  name: string;
  goal: string;
  details: string;
  frequency: string;

  status: string;
  isDeleted: boolean;
  completedDates:CompletedDate[]

  startDate: string;
  createdAt: Date;
  updatedAt: Date;
};

export type HabitDetails = Omit<HabitDetailsFull, "id" | "userId">

export type UserDetails = {
  createdAt: Date,
  email: string,
  firstName: string,
  lastName: string,
  username: string,
  id: number,
}

export type ManageHabitContext = {
  threeDotsMenu:number
  setThreeDotsMenu:React.Dispatch<React.SetStateAction<number>> 
  isHabitModalOpen:boolean
  setIsHabitModalOpen:React.Dispatch<React.SetStateAction<boolean>>
  habitId:number
  setHabitId:React.Dispatch<React.SetStateAction<number>>
}

//Focus tab

export type FocusCategories = {
  id:number
  userId: number

  name:string
  color: string

  createdAt: string
}