import Sidebar from "../Components/Sidebar"

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Sidebar />
      <div className="">
        {children}
      </div>
    </>
  )
}