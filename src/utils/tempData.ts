import type { dayData, habitDetails } from "../types/types"



export const tempLastData:dayData[] = [
    {day:"2026-05-23", status:'done', startDate:"2026-05-22"},
    {day:"2026-05-24", status:'done', startDate:"2026-05-22" },
    {day:"2026-05-25", status:'missed', startDate:"2026-05-22" },
    {day:"2026-05-26", status:'done', startDate:"2026-05-22" },
    {day:"2026-05-27", status:'done', startDate:"2026-05-22" }
  ]

const userDetails = {
  id:1,
  firstName:"",
  lastName:"",
  email:"",
  username:"",
}

export const dummyDataForHabits:habitDetails[] = [
  {
    id:1,
    userId:2, //both id will be sent by the server
    name:"Drink water",
    details:"8 Glasses Daily", //This should be short
    //streak I have to calculate
    freq:"daily",
    startDate:"2026-05-22",
    completedDates:[ // this will only have days when the habit is being completed, so after start date, all no included will be considered missed
      "2026-05-23","2026-05-24", "2026-05-26","2026-05-27" //this will contain date when user have completed habit 
    ],
    isAchieved: false,
    isDeleted: false    
  }
]