"use client";

import { useState, useEffect } from "react";


import { Play, Coffee, Plus, Minus } from "lucide-react"

type CircularTimer = {
  durationInSeconds:number
  width:number
  height:number
  timeLeft:number
  setTimeLeft: React.Dispatch<React.SetStateAction<number>>
  isRunning:boolean
  setIsRunning: React.Dispatch<React.SetStateAction<boolean>>
  timerMode: "focus" | "break" | "longBreak"
  setTimerMode: React.Dispatch<React.SetStateAction<"focus" | "break" | "longBreak">>
  totalTime:number
  setTotalTime: React.Dispatch<React.SetStateAction<number>>
  currectSession:number
  setCurrectSession: React.Dispatch<React.SetStateAction<number>>
}

const timerColor={
  focus: {
    ring: "var(--focus-ring)",
    track: "var(--focus-ring-bg)",
    card: "var(--focus-card)",
  },
  break: {
    ring: "var(--break-ring)",
    track: "var(--break-ring-bg)",
    card: "var(--break-card)",
  },
  longBreak: {
    ring: "var(--long-break-ring)",
    track: "var(--long-break-ring-bg)",
    card: "var(--long-break-card)",
  },
}

export default function CircularTimer({durationInSeconds, timeLeft, setTimeLeft, width, height, isRunning, setIsRunning, timerMode, setTimerMode, totalTime, setTotalTime, currectSession, setCurrectSession}:CircularTimer){
  
  const [timerState, setTimerState] = useState<"idle" | "running">("idle");

  useEffect(() => {
    if (!isRunning ) return;

    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

  const radius = 100;
  const circumference = 2 * Math.PI * radius;

  const progress = timeLeft/durationInSeconds;

  const buttonClass = "flex justify-center gap-2 bg-primary py-2 w-50 border border-border rounded-md transition-all duration-150 hover:scale-[1.02] hover:brightness-110 active:scale-[0.98] active:brightness-95 cursor-pointer"

  return(
    <div className="flex flex-col items-center">
      <h2 className="text-center font-bold text-2xl mt-4">{timerMode==="focus" ? "Focus" : timerMode==="break" ? "Break" : "Long Break"}</h2>
      <div className="relative w-[width] ">
        <h2 className="text-4xl font-bold z-10 absolute inset-0 flex items-center tabular-nums justify-center">{String(Math.floor(timeLeft/60)).padStart(2, "0")} : {String(timeLeft % 60).padStart(2, "0")}</h2>
        <svg 
          width={width}
          height={height}
          style = {{transform:'rotate(-90deg)' }}
        >
          <circle  
            cx={width/2}
            cy={height/2}
            r={radius}
            fill="none"
            stroke={timerColor[timerMode].track}
            strokeWidth={8}  
          />

          <circle  
            cx={width/2}
            cy={height/2}
            r={radius}
            fill="none"
            stroke={timerColor[timerMode].ring}
            strokeWidth={8}
            strokeDasharray ={circumference}
            strokeDashoffset={(1-progress)*circumference}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-linear"
          />
        </svg>
      </div>


      <div className="flex flex-col items-center">
        <div className="flex items-center mb-6">
          <button 
            className="mx-2 border border-border bg-surface p-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-150 hover:scale-[1.02] hover:brightness-110 active:scale-[0.98] active:brightness-95 cursor-pointer"
            onClick={()=>{
              if(totalTime>=300 && timeLeft>=300){
                setTotalTime(prev=>prev-300)
                setTimeLeft(prev=>prev-300)
              }else{
                setTimerState("idle");
                setIsRunning(false);
                //have to add function that will add session here
                setTimeLeft(totalTime)
              }
            }}
          ><Minus /></button>

          <div className="bg-input w-50 flex justify-center py-2 px-15 rounded-lg">{totalTime/60} mins</div>

          <button 
            disabled={totalTime>=3600}
            className="mx-2 border border-border bg-surface p-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-150 hover:scale-[1.02] hover:brightness-110 active:scale-[0.98] active:brightness-95 cursor-pointer"
            onClick={()=>{
              if(totalTime<=3600){
                setTotalTime(prev=>prev+300)
                setTimeLeft(prev=>prev+300)
              }
            }}
          ><Plus /></button>
        </div>

        {timerState==="idle" && !isRunning ? 
          <div>
            <button 
              className={buttonClass}
              onClick={()=>{
                setIsRunning(true); 
                setTimerState("running");
              }}
            ><Play /> Start</button>
          </div>
          : timerMode === "focus" ?
          /* this will show during focus session */
          <div>
            <button 
              className={buttonClass}
              onClick={()=>{
                setCurrectSession(prev=>prev<4 ? prev+1 : 1);
                setTimerMode(currectSession === 4 ? "longBreak" : "break");
                setTimeLeft(currectSession === 4 ? 900 : 300);
                setTotalTime(currectSession === 4 ? 900 : 300);
              }}
            ><Coffee/> Finish Now</button>
          </div>
          :
          /* This will show during break session */
          <div>
            <button 
              className={buttonClass}
              onClick={()=>{
                setTimerMode("focus") 
                setIsRunning(false); 
                setTimerState("idle");
                setTimeLeft(totalTime);
              }}
            ><Coffee /> End Break</button>
          </div>
        }
      </div>
    </div>
  )
}