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

  const {categoryId, mode, plannedDuration, actualDuration, status, startedAt, title} = data

  const userId = session.user.id;

  try{
    await db.query(
    `INSERT INTO focus_sessions 
      (user_id, category_id, mode, planned_duration, actual_duration, status, started_at, title) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
    [userId, categoryId, mode, plannedDuration, actualDuration, status, startedAt, title]
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
      SELECT
          fs.*,
          fc.name AS category_name,
          fc.color AS category_color
      FROM focus_sessions AS fs
      LEFT JOIN focus_categories AS fc
          ON fs.category_id = fc.id
      WHERE fs.user_id = $1
        AND fs.started_at >= $2
        AND fs.started_at < $3;
      `,
      [userId, date, nextDay]
    );

    const formatedData = res.rows.map(data => ({
      id:data.id,
      userId: data.user_id,

      categoryName: data.category_name,

      title: data.title,

      categoryId: data.category_id,
      categoryColor: data.category_color,

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
}

