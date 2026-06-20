import { readRouteCacheEntry } from "next/dist/client/components/segment-cache/cache"

export function capitalise(string:string){
  return (string.slice(0,1).toUpperCase() + string.slice(1))
}

export function getDayName(dateString:string){
  const dayName = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  return dayName[new Date(dateString).getDay()]
}

export function getTomorrowDate(dateString:string){
  const date = new Date(dateString)
  date.setDate(date.getDate() + 1)
  return date.toLocaleDateString('en-CA').slice(0, 10)
}

export function getDateAfterXDays(dateString:string, x:number){
  const date = new Date(dateString)
  date.setDate(date.getDate() + x)
  return date.toLocaleDateString('en-CA').slice(0, 10)
}

export function getDateBeforeXDays(dateString:string, x:number){
  const date = new Date(dateString)
  date.setDate(date.getDate() - x)
  return date.toLocaleDateString('en-CA').slice(0, 10)
}

export function getDateOf1WeekAgo(){
  return new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toLocaleDateString('en-CA')
}

export function isOneDayApart(date1:string, date2:string){
  const date1Obj = new Date(date1)
  const date2Obj = new Date(date2)

  const diff = Math.abs(date2Obj.getTime() - date1Obj.getTime())

  return diff === 24 * 60 * 60 * 1000
}

export function getYYYYMMDD(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function findingStreak(dateArray:string[]){

  if(dateArray?.length===0){
    return 0;
  }

  const sortedDate = dateArray.sort((a:string,b:string)=>b.localeCompare(a))

  let streak = 0
  const todayDate = new Date().toLocaleDateString("en-CA")

  const yesterdayDate = getDateBeforeXDays(todayDate, 1)
  if(sortedDate[0]===todayDate){
    streak = 1
  }else if(sortedDate[0]===yesterdayDate){
    streak = 1
  }else{
    return 0
  }

  for(let i=0; i<sortedDate.length-1; i++){

    if(isOneDayApart(sortedDate[i], sortedDate[i+1])){
      streak+=1;
    }else{
      break
    }
  }

  return streak
}