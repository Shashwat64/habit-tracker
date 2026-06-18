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