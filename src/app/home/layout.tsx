import Sidebar from "../../Components/Sidebar"

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Sidebar />
      <div className="ml-75 text-primary">
        {children}
      </div>
    </>
  )
}