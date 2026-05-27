export type dayData = {
  day:string
  status: 'done' | 'missed'
  startDate: string
}

export type habitDetails = {
  id?:number
  userId?:number
  name:string
  details:string
  freq:string
  startDate:string
  completedDates:string[]
  isAchieved:boolean
  isDeleted:boolean
}