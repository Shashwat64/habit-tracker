"use client";

import { createContext, useContext } from "react";

import type { UserDetails } from "../types/types";


export const UserContext = createContext<UserDetails | null>(null);

export function UserProvider({
  userDetails,
  children,
}: {
  userDetails: UserDetails;
  children: React.ReactNode;
}) {
  return (
    <UserContext.Provider value={userDetails}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const user = useContext(UserContext);

  if (!user) {
    throw new Error("useUser must be used inside UserProvider");
  }

  return user;
}