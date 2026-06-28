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
  totalTime:number
  setTotalTime: React.Dispatch<React.SetStateAction<number>>
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

export default function CircularTimer({durationInSeconds, timeLeft, setTimeLeft, width, height, isRunning, setIsRunning, timerMode, totalTime, setTotalTime}:CircularTimer){
  
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
          className="mx-2 border border-border bg-surface p-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
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

        <div className="bg-input py-2 px-15 rounded-lg">{totalTime/60} mins</div>

        <button 
          disabled={totalTime>=3600}
          className="mx-2 border border-border bg-surface p-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
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
              className="flex justify-center gap-2 bg-primary py-2 w-50 border border-border rounded-md"
              onClick={()=>{
                setIsRunning(true); 
                setTimerState("running");
              }}
            ><Play /> Start</button>
          </div>
          :
          <div>
            <button 
              className="flex justify-center gap-2 bg-primary py-2 w-50 border border-border rounded-md"
              onClick={()=>{
                setIsRunning(false); 
                setTimerState("idle");
                setTimeLeft(totalTime);
              }}
            ><Coffee /> Finish Now</button>
          </div>
        }
      </div>
    </div>
  )
}