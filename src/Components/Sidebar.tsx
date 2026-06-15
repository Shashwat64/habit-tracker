"use client";
import SideNavElement from "./SideNavElement"
import Link from "next/link"

import { useState } from "react";

import { Settings, UserRoundPen } from "lucide-react"


const sideNavData = [
  {
    title: "Dashboard",
    href:"/home/dashboard",
    icon: "LayoutDashboard"
  },
  {
    title: "Habit",
    href:"/home/habits",
    icon: "ClipboardCheck"
  },
  {
    title: "Focus",
    href:"/home/focus?filter=active",
    icon: "Focus"
  },
  {
    title: "Analytics",
    href:"/home/analytics",
    icon: "ChartColumn"
  }  
]

export default function Sidebar(){

  const [isDropdown, setIsDropdown] = useState<boolean>(false)

  console.log(isDropdown);

  return(
    <nav className=" bg-surface text-primary fixed top-0 left-0 bottom-0 px-2 py-10 w-75 flex flex-col justify-between select-none">

      <div>
        <Link href="/" className="font-bold text-xl mb-8 ml-4">Habit Tracker</Link>
        {sideNavData.map((navElem, i)=>(
          <SideNavElement
            key={i}
            title={navElem.title}
            href={navElem.href}
            Icon={navElem.icon}
          />
        ))}
      </div>

      <div>
          <div 
            className="flex items-center gap-3 py-3 px-2 ml-2 rounded-lg hover:bg-card bg-primary-hover"
            onClick={()=>setIsDropdown(prev=>!prev)}
          >
            <Settings className="h-8 w-8"/>
            <div className="ml-1">
              <p>Your Name</p>
              <p className="text-secondary text-sm">email@gmail.com</p>
            </div>
          </div>
      </div>
      
    </nav>
  )
}

/* {
    title: "Settings",
    href:"/home/settings",
    icon: "Settings"
  },
  {
    title: "Profile",
    href:"/home/profile",
    icon: "UserRoundPen"
  } */