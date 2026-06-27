"use client";
import SideNavElement from "./SideNavElement"
import Link from "next/link"

import { signOut } from "next-auth/react";

import { useState, useRef, useEffect } from "react";

import { useUser } from "@/src/context/UserContext";

import { Settings, UserRoundPen, LogOut, ChevronDown } from "lucide-react"
import type { LucideIcon } from "lucide-react";




const sideNavData = [
  {
    title: "Dashboard",
    href:"/home/dashboard",
    icon: "LayoutDashboard"
  },
  {
    title: "Habits",
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

type DropMenuItems = {
  title: string
  icon: LucideIcon 
  link: string
}

export default function Sidebar(){

  const userDetails = useUser();

  const [isDropdown, setIsDropdown] = useState<boolean>(false)

  const dropdownRef = useRef<HTMLDivElement>(null);

  const dropMenuItems:DropMenuItems[] = [
    {
      title: "Settings",
      icon: Settings,
      link: "/home/settings"
    }
    
  ]

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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

        <div ref={dropdownRef} className="relative">
          {isDropdown && (
            <div
              className="absolute flex flex-col gap-1 bottom-full left-0 right-0 mb-2 rounded-md border border-border p-4"
            >
              {dropMenuItems.map((data) => (
                <Link
                  key={data.title}
                  href={data.link}
                  className="flex items-center gap-3 rounded-md px-3 py-2 hover:cursor-pointer hover:bg-card-hover"
                  onClick={() => setIsDropdown(false)}
                >
                  <data.icon size={20} />
                  {data.title}
                </Link>
              ))}

              <button
                type="button"
                className="flex items-center gap-3 rounded-md px-3 py-2 text-left hover:cursor-pointer hover:bg-card-hover"
                onClick={() => {
                  setIsDropdown(false);
                  signOut();
                }}
              >
                <LogOut size={20} />
                Sign out
              </button>
            </div>
          )}

          <div 
            className="flex items-center gap-3 py-3 px-2 ml-2 rounded-lg border-2 border-border  bg-subtle-hover"
            onClick={(e)=>{setIsDropdown(prev => !prev);}}
          >
            <div className="text-2xl font-bold bg-primary w-10 h-10 flex items-center justify-center rounded-lg">
              {/* to do: have to add profile option too */}
              <p>
                {userDetails.firstName.slice(0,1).toUpperCase()}{userDetails.lastName.slice(0,1).toUpperCase()}
              </p>
            </div>
            <div className="ml-1">
              <p>{userDetails.firstName} {userDetails.lastName}</p>
              <p className="text-secondary text-sm">{userDetails.email}</p>
            </div>
            <ChevronDown className={`ml-auto mr-2 transition-all duration-200 ${isDropdown ? "rotate-180" : "rotate-0"}`}/>
          </div>      
        </div>
    </nav>
  )
}