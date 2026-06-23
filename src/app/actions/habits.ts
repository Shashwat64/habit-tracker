"use server";
import db from "@/src/lib/db";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/src/lib/auth";
import { revalidatePath } from "next/cache";

import type { UserDetails } from "@/src/types/types";

type AddHabbitProps = {
  name: string
  goal: string
  detail: string
  frequency: string
}

export async function getUserDetails(){
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/signin");
  }

  const userId = session.user.id;

  const result = await db.query(
    "SELECT * FROM users WHERE id = $1",
    [userId]
  );


  const userDetails: UserDetails = {
  createdAt: result.rows[0].created_at,
  email: result.rows[0].email,
  firstName: result.rows[0].first_name,
  lastName: result.rows[0].last_name,
  username: result.rows[0].username,
  id: result.rows[0].id,
};
  return userDetails;
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
    `SELECT cd.*
      FROM habit_completions cd
      JOIN habits h
        ON cd.habit_id = h.id
      WHERE h.user_id = $1`,
    [session.user.id]
  );
  return result.rows;
}

export async function editCompletedDates(habitId:number, date:string) {
  const session = await getServerSession(authOptions);

  if (!session) return [];

  const result = await db.query(
      `SELECT EXISTS (
        SELECT 1
        FROM habit_completions cd
        JOIN habits h
          ON cd.habit_id = h.id
        WHERE h.user_id = $1
          AND cd.habit_id = $2
          AND cd.completed_on = $3
      );`,
    [session.user.id, habitId, date]
  );

  console.log("in editCompletedDates, ", result.rows[0].exists)

  const doesDateExists = result.rows[0].exists;

  if(doesDateExists){
    const removedDate = await db.query(
        `DELETE FROM habit_completions cd
          USING habits h
          WHERE cd.habit_id = h.id
            AND h.user_id = $1
            AND cd.habit_id = $2
            AND cd.completed_on = $3;
        `,
      [session.user.id, habitId, date]
    );
  }else{
    const addedDate = await db.query(
      `INSERT INTO habit_completions (
        habit_id,
        completed_on,
        progress,
        target
      )
      VALUES ($1, $2, $3, $4)
      `,
      [habitId, date, null, null]
    );
  }
  revalidatePath("/home/habits");
  return doesDateExists;
}



export async function editHabit(habitId:number, data: AddHabbitProps){
  const session = await getServerSession(authOptions);

  if (!session) return [];
 
  const userId = session.user.id;
  const { name, goal, detail, frequency } = data;
  
  await db.query(
    `UPDATE habits
      SET
        name = $1,
        goal = $2,
        details = $3,
        frequency = $4,
        updated_at = NOW()
      WHERE id = $5
        AND user_id = $6
      RETURNING *;
    `,
    [name, goal, detail, frequency, habitId, userId]
  );
  revalidatePath("/home/habits");

  const result = await db.query(
    `UPDATE habits
      SET is_deleted = true
      WHERE id = $1 AND user_id = $2;`,
    [habitId, session.user.id]
  );



  revalidatePath("/home/habits");
  return result.rows;  
}

export async function achieveHabit(habitId:number){
  const session = await getServerSession(authOptions);

  if (!session) return [];
 
  try{
    const result = await db.query(
      `UPDATE habits
          SET status = 'achieved'
          WHERE id = $1 AND user_id = $2;`,
      [habitId, session.user.id]
    );
    revalidatePath("/home/habits");
    return result.rows;
  }catch (error) {
    return {
      success: false,
      error: error,
    };
  }
}

export async function unachieveHabit(habitId:number){
  const session = await getServerSession(authOptions);

  if (!session) return [];
 
  try{
    const result = await db.query(
      `UPDATE habits
          SET status = 'active'
          WHERE id = $1 AND user_id = $2;`,
      [habitId, session.user.id]
    );
    revalidatePath("/home/habits");
    return result.rows;
  }catch (error) {
    return {
      success: false,
      error: error,
    };
  }
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