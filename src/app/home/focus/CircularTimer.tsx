"use client";

import { useState, useEffect } from "react";

type CircularTimer = {
  durationInSeconds:number
  width:number
  height:number
  timeLeft:number
  setTimeLeft: React.Dispatch<React.SetStateAction<number>>
}

export default function CircularTimer({durationInSeconds, timeLeft, setTimeLeft,  width, height}:CircularTimer){
  

  useEffect(() => {
    if (timeLeft === 0) return;

    const interval = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  const radius = 100;
  const circumference = 2 * Math.PI * radius;

  const progress = timeLeft/durationInSeconds;

  return(
    <div className="relative">
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
        stroke="var(--card)"
        strokeWidth={8}  
      />

      <circle  
        cx={width/2}
        cy={height/2}
        r={radius}
        fill="none"
        stroke="var(--primary)"
        strokeWidth={8}
        strokeDasharray ={circumference}
        strokeDashoffset={(1-progress)*circumference}
        strokeLinecap="round"
        className="transition-all duration-1000 ease-linear"
      />
    </svg>
    </div>
  )
}