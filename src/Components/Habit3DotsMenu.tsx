
type Habit3DotsMenu = {
  habitId: number
  threeDotsMenu:number
  setThreeDotsMenu:React.Dispatch<React.SetStateAction<number>> 
}

export default function Habit3DotsMenu({ habitId } : {habitId:number}){

  console.log(habitId)
  return( 
    <div className="z-5 absolute -bottom-22 -left-full flex flex-col items-baseline bg-dropdown p-2 gap-2 rounded-md">
      <button className="w-full px-2 py-1 hover:bg-card-hover rounded-md">Edit</button>
      <button className="w-full px-2 py-1 hover:bg-card-hover rounded-md">Delete</button>
    </div>
  )
}