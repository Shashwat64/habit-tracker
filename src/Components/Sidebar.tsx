import SideNavElement from "./SideNavElement"
import Link from "next/link"


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
  },
  {
    title: "Settings",
    href:"/home/settings",
    icon: "Settings"
  },
  {
    title: "Profile",
    href:"/home/profile",
    icon: "UserRoundPen"
  }
]

export default function Sidebar(){
  return(
    <nav className=" bg-surface text-primary fixed top-0 left-0 bottom-0 px-2 py-10 w-75 flex flex-col justify-between select-none">

      <div>
        <Link href="/" className="font-bold text-xl mb-8 ml-4">Habit Tracker</Link>
        {sideNavData.slice(0, 4).map((navElem, i)=>(
          <SideNavElement
            key={i}
            title={navElem.title}
            href={navElem.href}
            Icon={navElem.icon}
          />
        ))}
      </div>

      <div>
          {sideNavData.slice(4).map((navElem, i)=>(
            <SideNavElement
              key={i}
              title={navElem.title}
              href={navElem.href}
              Icon={navElem.icon}
            />
          ))}
      </div>
      
    </nav>
  )
}