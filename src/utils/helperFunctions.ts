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