"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { LayoutDashboard, ClipboardCheck, Focus, ChartColumn, Settings, UserRoundPen, LucideIcon } from "lucide-react"





type SideNavElementProps = {
  title: string
  href: string
  Icon: string
}

export default function SideNavElement({title, href, Icon}:SideNavElementProps){

  const pathname = usePathname()
  const isActive = href.includes(pathname)

  const iconMap: Record<string, LucideIcon> = {
    "LayoutDashboard": LayoutDashboard,
    "ClipboardCheck": ClipboardCheck,
    "Focus": Focus,
    "ChartColumn" : ChartColumn,
  }
  const IconValue = iconMap[Icon]

  return(
    <Link
      href={href}
      className={`
        flex items-center gap-3 py-3 px-2 ml-2 rounded-lg hover:bg-card text-secondary transition-colors my-2
        ${isActive ? "text-primary font-bold bg-primary" : "bg-primary-hover"}
      `}
    >
      <IconValue className="h-5 w-5" />

      <span>{title}</span>
    </Link>
  )
}