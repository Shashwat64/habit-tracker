"use server";
import db from "@/src/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/src/lib/auth";

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

