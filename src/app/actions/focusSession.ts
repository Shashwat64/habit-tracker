//To have action related to the sessions

"use server";
import db from "@/src/lib/db";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/src/lib/auth";
import { revalidatePath } from "next/cache";

import type { FocusSessionData, FocusSession } from "@/src/types/types";
import { Timestamp } from "next/dist/server/lib/cache-handlers/types";

type AddFocusSessionProps= {
  category_id:number
  mode: "focus" | "break" | "longBreak"

  planned_duration: number
  actual_duration: number

  status:'completed' | 'cancelled'
  
  started_at:Timestamp
}

export async function addFocusSession(data: FocusSessionData) {

  console.log("Add focus session ran", data);

  const session = await getServerSession(authOptions);


  if (!session) return;

  const {categoryId, mode, plannedDuration, actualDuration, status, startedAt} = data

  const userId = session.user.id;

  try{
    await db.query(
    `INSERT INTO focus_sessions 
      (user_id, category_id, mode, planned_duration, actual_duration, status, started_at) 
      VALUES ($1, $2, $3, $4, $5, $6, $7)`,
    [userId, categoryId, mode, plannedDuration, actualDuration, status, startedAt]
  )
  }catch(err){
    return err;
  }
  
  
  revalidatePath("/home/focus");
}

export async function getFocusSessionByDate(date: Date): Promise<FocusSession[]> {


  const session = await getServerSession(authOptions);


  if (!session) return[];

  const userId = session.user.id;
  const nextDay = new Date(date);
  nextDay.setDate(nextDay.getDate() + 1);
  nextDay.setHours(0,0,0,0)

  try{
    const res = await db.query(
      `
      SELECT *
      FROM focus_sessions
      WHERE user_id = $1
        AND started_at >= $2
        AND started_at < $3
      `,
      [userId, date, nextDay]
    );

    const formatedData = res.rows.map(data => ({
      id:data.id,
      userId: data.user_id,

      categoryId: data.category_id,
      mode: data.mode,

      plannedDuration: data.planned_duration,
      actualDuration: data.actual_duration,

      status: data.status,

      startedAt:data.started_at,
    }))
    return formatedData;
  }catch(err){
    console.error(err);
    throw new Error("Failed to fetch focus sessions");
  }
  
  
  revalidatePath("/home/focus");
}

