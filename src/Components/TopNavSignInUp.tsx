"use client"
export default function TopNav(){

  return(
    <nav className="fixed inset-0 h-16 flex items-center pl-4 gap-2">
      <img src="logo.png" alt="" className="w-8"/>
      <p className="text-white text-2xl">Focura</p>
    </nav>
  )
}