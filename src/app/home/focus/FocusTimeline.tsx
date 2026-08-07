"use client";
//Icon
import { ChevronLeft, ChevronRight, Plus } from "lucide-react"

//action
import { getFocusSessionByDate } from "../../actions/focusSession";

//react
import { useState, useEffect } from "react";

//types
import type { FocusSession } from "@/src/types/types";
import { LucideIcon } from "lucide-react";

const formatDate = (date: Date)=> {
  return date.toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
}

const changeDate = (date: Date, day:number)=> {
  const previous = new Date(date);
  previous.setDate(previous.getDate() + day );
  previous.setHours(0, 0, 0, 0);

  return previous;
}

const formatDuration = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  if (hours === 0) return `${mins}m`;
  if (mins === 0) return `${hours}h`;

  return `${hours}h ${mins}m`;
}
  /* To get the top margin */
  const timeToIndex = (time:string, calenderheight:number)=>{
    const hrAndMin = time.split(":");
    if(!Number.isNaN(hrAndMin[0]) && !Number.isNaN(hrAndMin[1])){
      let index = Number(hrAndMin[0])*calenderheight + (Number(hrAndMin[1])/60)*calenderheight + 6;
      return index;
    }
    return -1;
  }



type InfoCardDetails = {
  icon: LucideIcon,
  title: string
  data: string
}

const InfoCard = ({cardInfo}: {cardInfo:InfoCardDetails}) => (
  <div className="flex flex-1 border-2 border-border gap-2 bg-card-light p-2 rounded-lg">
    <cardInfo.icon size={30}/>
    <div>
      <h2 className="text-sm">{cardInfo.title}</h2>
      <h2 className="font-bold">{cardInfo.data}</h2>
    </div>
  </div>
)

type SessionCardDetails = {
  focusSession:FocusSession
   calenderheight:number
}

const SessionCard = ({focusSession, calenderheight}: SessionCardDetails) => {

  const min = Math.floor(focusSession.actualDuration/60);
  const hr = Math.floor(min/60);

  const startTime = new Date(focusSession.startedAt).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  const height = hr*calenderheight + min*calenderheight/60

  if(height<15){
    return
  }



  return(
    <div className="absolute text-sm font-bold top-2.5 right-0 w-4/10 mr-10 flex items-center z-50 bg-red-600 rounded-md p-1 overflow-hidden"
     style={{ 
          top: `${timeToIndex(startTime, calenderheight)}px`,
          height: `${height}px`,         
      }}
    >
      <div className="flex flex-col w-1/2 self-start ">
        <p>{startTime}</p>
        {focusSession.title === "Untitled Session" || "" ? "" : 
        <p>{focusSession.title}</p>}
        <p>{focusSession.categoryName}</p>
      </div>
      <div className="flex w-1/2 self-end justify-end">
        {hr}h{min}m
      </div>
    </div>
)}

const hours = Array.from({ length: 25 }, (_, i) => i);

export default function FocusTimeline({todaySessions}:{todaySessions: FocusSession[]}){

  
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const [selectedDate, setSelectedDate] = useState<Date>(today)
  const [sessions, setSessions] = useState<FocusSession[]>(todaySessions);
  console.log(sessions)
  
  const [calenderheight, setCalenderheight] = useState<number>(100);

/*   const timeToIndex = (time:string)=>{
    const hrAndMin = time.split(":");
    if(!Number.isNaN(hrAndMin[0]) && !Number.isNaN(hrAndMin[1])){
      let index = Number(hrAndMin[0])*calenderheight + (Number(hrAndMin[1])/60)*calenderheight + 10;
      return index;
    }
    return -1;
  } */


  const [currentTime, setCurrentTime] = useState<string>(
    new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })
  );

  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(
        new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })
      );
    };

    updateTime();

    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  const focusSessions = sessions.filter(ses => ses.mode==="focus")
  const breakSessions = sessions.filter(ses => ses.mode!=="focus")

  const totalFocusTime = focusSessions.reduce(
    (total, session) => total + session.actualDuration,
    0
  );
  const totalBreakTime = breakSessions.reduce(
    (total, session) => total + session.actualDuration,
    0
  );

  useEffect(() => {
    async function loadSessions() {
      try {
        const sessionsFromDB = await getFocusSessionByDate(selectedDate);
        setSessions(sessionsFromDB);
        } catch (err) {
          console.error(err);
      }
    }

    loadSessions();
  }, [selectedDate]);

  const infoCardDetials:InfoCardDetails[] = [
    {
      icon: Plus,
      title: "Total Work",
      data: formatDuration(Math.floor(totalFocusTime/60)) //in minutes
    },
    {
      icon: Plus,
      title: "Break",
      data: formatDuration(Math.floor(totalBreakTime/60)) //in minutes
    },
    {
      icon: Plus,
      title: "Completed",
      data: `${focusSessions.length} Sessions` //in minutes
    }
  ];

  return(
    <section className="bg-card w-1/2 flex flex-col min-h-0 rounded-lg p-5 border-2 border-border ">
      <h2 className="text-xl font-bold">Day Timeline</h2>

      <div className="flex mt-5 justify-center">
        <button 
            onClick={()=>{setSelectedDate(prev=>changeDate(prev, -1))}}
            className="mx-2 border border-border bg-surface p-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-150 hover:scale-[1.02] hover:brightness-110 active:scale-[0.98] active:brightness-95 cursor-pointer"
            ><ChevronLeft /></button>

          <div className="bg-input w-50 flex justify-center py-2 rounded-lg">{formatDate(selectedDate)}</div>

          <button
            disabled = {today.getTime() === selectedDate.getTime()}
            onClick={()=>{setSelectedDate(prev=>changeDate(prev, 1))}}
            className="mx-2 border border-border bg-surface p-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-150 hover:scale-[1.02] hover:brightness-110 active:scale-[0.98] active:brightness-95 cursor-pointer"
            ><ChevronRight /></button>
      </div>

      <div className="flex justify-around mt-5 gap-2">
        {infoCardDetials.map((cardInfo, i)=><InfoCard key={i} cardInfo={cardInfo}/>)}
      </div>

        {/* calender */}
      <div className="mt-5 flex-1 relative min-h-0 border-2 border-border overflow-y-auto">
        {/* Current-time line */}
        {selectedDate.toDateString() === today.toDateString() && <div 
          className="absolute w-full flex items-center z-50"
          style={{ 
              top: `${timeToIndex(currentTime, calenderheight)}px`,
              transform: "translateY(-50%)",
          }}
        >
          <p className="bg-red-400 p-1 rounded-md">
            {currentTime}
          </p>
          <hr className="flex-1 m-0 border-0 border-t border-red-400" />
        </div>}

          {/* <div className="absolute text-sm font-bold top-2.5 right-0 w-4/10 mr-10 h-10 flex items-center z-50 bg-red-600 rounded-md p-1 overflow-hidden">
            <div className="flex flex-col w-1/2 self-start ">
              <p>01:50</p>
              <p>Title</p>
              <p>Category</p>
            </div>
            <div className="flex w-1/2 self-end justify-end">
              1h40m
            </div>
          </div> */}

          {todaySessions.map((session)=><SessionCard focusSession={session} calenderheight={calenderheight}/>)}
        
        <div>
          {hours.map(hour => (
            <div
              className="relative"
              key={hour}
              style={{ height: `${calenderheight}px` }}
            >
               <div className="flex items-center">
                <span className="w-12 text-sm z-20 ml-1">
                  {hour.toString().padStart(2, "0")}:00
                </span>

                <hr className="flex-1" />
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  )
}