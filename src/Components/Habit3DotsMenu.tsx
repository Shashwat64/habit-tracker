import { editHabit, achiveHabit, deleteHabit  } from "../app/actions/habits";


type Habit3DotsMenu = {
  habitId: number
  threeDotsMenu:number
  setThreeDotsMenu:React.Dispatch<React.SetStateAction<number>> 
}

export default function Habit3DotsMenu({ habitId, threeDotsMenu, setThreeDotsMenu } : Habit3DotsMenu){
  return( 
    <div className="absolute -bottom-40 -left-full z-50 flex flex-col bg-dropdown p-2 gap-1 rounded-md min-w-32 shadow-lg">
      <button 
        className="w-full text-left px-3 py-2 hover:bg-card-hover rounded-md"
        onClick={() => {
          editHabit(habitId);
          setThreeDotsMenu(-1);
        }}
      >
        Edit
      </button>

      <button 
        className="w-full text-left px-3 py-2 hover:bg-card-hover rounded-md"
        onClick={() => {
          achiveHabit(habitId);
          setThreeDotsMenu(-1);
        }}
      >
        Achieve
      </button>

      <hr className="border-border" />

      <button 
        className="w-full text-left px-3 py-2 text-red-400 hover:bg-red-500/10 rounded-md"
        onClick={() => {
          deleteHabit(habitId);
          setThreeDotsMenu(-1);
        }} 
      >
        Delete
      </button>
    </div>
  )
}