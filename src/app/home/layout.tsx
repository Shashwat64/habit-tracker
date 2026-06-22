"use server";

import Sidebar from "../../Components/Sidebar";
import { getServerSession } from "next-auth";
import { authOptions } from "@/src/lib/auth";
import { redirect } from "next/navigation";
import { getUserDetails } from "../actions/habits";

import type { UserDetails } from "@/src/types/types";

import { UserProvider } from "@/src/context/UserContext";

export default async function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/signin");
  }

  const userDetails: UserDetails = await getUserDetails();

  return (
    <UserProvider userDetails={userDetails}>
      <Sidebar />
      <div className="ml-75 text-primary">
        {children}
      </div>
    </UserProvider>
  );
}