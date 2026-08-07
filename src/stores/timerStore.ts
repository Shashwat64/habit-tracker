import { create } from "zustand";

import type { FocusCategories, FocusSession } from "@/src/types/types";

type TimerMode = "focus" | "break" | "longBreak";

type TimerStore = {

  timerMode: TimerMode;
  setTimerMode: (mode: TimerMode) => void;

  isRunning: boolean;
  toggleIsRunning: () => void;
 

  timeLeft: number;
  setTimeLeft: (amount: number) => void;
  changeTimeLeft: (amount: number) => void;

  totalTime: number;
  setTotalTime: (amount: number) => void;
  changeTotalTime: (amount: number) => void;  
};


const useTimerStore = create <TimerStore> (set=>({
  timerMode:"focus",
  setTimerMode: (mode: TimerMode)=>
    set({timerMode: mode}),
  
  isRunning:false,
  toggleIsRunning:()=>
    set((state: TimerStore)=>({
      isRunning: !state.isRunning
    })),
    
  timeLeft:0,
  setTimeLeft:(amount:number)=>
    set({timeLeft: amount}),
  changeTimeLeft: (amount: number)=>
    set((state: TimerStore)=>({timeLeft: state.timeLeft + amount})),
  
  totalTime:0,
  setTotalTime:(amount:number)=>
    set({totalTime: amount}),
  changeTotalTime: (amount: number)=>
    set((state: TimerStore)=>({totalTime: state.totalTime + amount})),  
}))


type SessionStore = {
  currentSession: number;
  setCurrentSession: (sessionNumber: number) => void;

  sessionTitle: string;
  setSessionTitle: (title: string) => void;
}

const useSessionStore = create <SessionStore> (set=>({
  currentSession:0,
  setCurrentSession:(sessionNumber:number)=>set({currentSession:sessionNumber}),

  sessionTitle:"",
  setSessionTitle:(title:string)=>
    set({sessionTitle: title}),
}))



type CategoryStore = {
  isCategoryOpen: boolean;
  toggleIsCategory: () => void;

  isManageCategoryOpen: boolean;
  toggleIsManageCategoryOpen: () => void;

  selectedCategoryId: number | null;
  setSelectedCategoryId: (id: number | null) => void;
}

const useCategoryStore = create <CategoryStore> (set=>({
  isCategoryOpen:false,
  toggleIsCategory:()=>
    set((state: CategoryStore)=>({
      isCategoryOpen: !state.isCategoryOpen
    })),

  isManageCategoryOpen:false,
  toggleIsManageCategoryOpen:()=>
    set((state: CategoryStore)=>({
      isManageCategoryOpen: !state.isManageCategoryOpen
    })),

  selectedCategoryId:null,
  setSelectedCategoryId:(id:number|null)=>
    set({selectedCategoryId: id}),
}))
