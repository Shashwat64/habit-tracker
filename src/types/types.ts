export type DayData = {
  day:string
  status: 'done' | 'missed'
  startDate: string
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
  completedDates:string[]

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
}