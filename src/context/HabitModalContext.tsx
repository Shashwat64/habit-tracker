"use client";

import { createContext, useContext } from "react";

import type { ManageHabitContext } from "../types/types";


export const HabitModalContext = createContext<ManageHabitContext | null>(null);

type UserProviderProps = ManageHabitContext & {
  children: React.ReactNode;
}

export function HabitModalProvider({
  threeDotsMenu,
  setThreeDotsMenu,
  isHabitModalOpen,
  setIsHabitModalOpen,
  children,
}: UserProviderProps) {
  return (
   <HabitModalContext.Provider
  value={{
    threeDotsMenu,
    setThreeDotsMenu,
    isHabitModalOpen,
    setIsHabitModalOpen,
  }}
>
      {children}
    </HabitModalContext.Provider>
  );
}

/* export function useUser() {
  const user = useContext(UserContext);

  if (!user) {
    throw new Error("useUser must be used inside UserProvider");
  }

  return user;
} */