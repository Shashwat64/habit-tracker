"use server";
import db from "@/src/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/src/lib/auth";
import { revalidatePath } from "next/cache";

type AddHabbitProps = {
  name: string
  goal: string
  detail: string
  frequency: string
}

export async function addHabit(data: AddHabbitProps) {

  const session = await getServerSession(authOptions);

  if (!session) return;

  const userId = session.user.id;

  const { name, goal, detail, frequency } = data;

  const todayDate =  new Date().toISOString().split("T")[0];;
  
  await db.query(
    "INSERT INTO habits (user_id, name, goal, details, frequency, status, start_date) VALUES ($1, $2, $3, $4, $5, $6, $7)",
    [userId, name, goal, detail, frequency, "active", todayDate]
  )
  revalidatePath("/home/habits");
}

export async function getHabits() {
  const session = await getServerSession(authOptions);

  if (!session) return [];

  const result = await db.query(
    "SELECT * FROM habits WHERE user_id = $1 AND NOT is_deleted ORDER BY created_at DESC",
    [session.user.id]
  );

  return result.rows;
}

export async function getCompletedDates() {
  const session = await getServerSession(authOptions);

  if (!session) return [];

  const result = await db.query(
    "SELECT * FROM habits WHERE user_id = $1 ORDER BY created_at DESC",
    [session.user.id]
  );

  return result.rows;
}

export async function editHabit(habitId:number){
  const session = await getServerSession(authOptions);

  if (!session) return [];
 
  
  const result = await db.query(
    `UPDATE habits
      SET is_deleted = true
      WHERE id = $1 AND user_id = $2;`,
    [habitId, session.user.id]
  );

  return result.rows;

  revalidatePath("/home/habits");
  
}

export async function achiveHabit(habitId:number){
  const session = await getServerSession(authOptions);

  if (!session) return [];
 
  
  const result = await db.query(
    `UPDATE habits
      SET is_deleted = true
      WHERE id = $1 AND user_id = $2;`,
    [habitId, session.user.id]
  );

  return result.rows;

  revalidatePath("/home/habits");
  
}

export async function deleteHabit(habitId:number){
  const session = await getServerSession(authOptions);

  if (!session) return [];
 
  
  const result = await db.query(
    `UPDATE habits
      SET is_deleted = true
      WHERE id = $1 AND user_id = $2;`,
    [habitId, session.user.id]
  );
  revalidatePath("/home/habits");

  return result.rows;
  
}