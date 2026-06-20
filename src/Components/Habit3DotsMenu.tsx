
type Habit3DotsMenu = {
  habitId: number
  threeDotsMenu:number
  setThreeDotsMenu:React.Dispatch<React.SetStateAction<number>> 
}

export default function Habit3DotsMenu({ habitId } : {habitId:number}){
  return( 
    <div className="absolute -bottom-40 -left-full z-50 flex flex-col bg-dropdown p-2 gap-1 rounded-md min-w-32 shadow-lg">
  <button className="w-full text-left px-3 py-2 hover:bg-card-hover rounded-md">
    Edit
  </button>

  <button className="w-full text-left px-3 py-2 hover:bg-card-hover rounded-md">
    Complete
  </button>

  <hr className="border-border" />

  <button className="w-full text-left px-3 py-2 text-red-400 hover:bg-red-500/10 rounded-md">
    Delete
  </button>
</div>
  )
}