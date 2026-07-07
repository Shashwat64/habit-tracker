"use server";
import db from "@/src/lib/db";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/src/lib/auth";
import { revalidatePath } from "next/cache";

import type { FocusCategories } from "@/src/types/types";

type AddFocusCategoryProps = {
  name:string
  color:string
}

export async function getFocusCategory(){
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/signin");
  }

  const userId = session.user.id;

  const result = await db.query(
    "SELECT * FROM focus_categories WHERE user_id = $1",
    [userId]
  );

  const focusCategories: FocusCategories[] = result.rows.map(cate=>({
    id:cate.id,
    userId:cate.user_id,
    name: cate.name,
    color: cate.colour,
    isArchived: cate.is_archived,
    createdAt: cate.created_at,
  }));

  return focusCategories;
}

export async function addFocusCategory(data: AddFocusCategoryProps) {

  const session = await getServerSession(authOptions);

  if (!session) return;

  const userId = session.user.id;

  const { name, color } = data;

  console.log("Data in addFocusCategory", data)
  
  await db.query(
    "INSERT INTO focus_categories (user_id, name, color) VALUES ($1, $2, $3)",
    [userId, name, color]
  )
  revalidatePath("/home/focus");
}

export async function editFocusCategory(data: AddFocusCategoryProps, id:number) {

  const session = await getServerSession(authOptions);

  if (!session) return;

  const userId = session.user.id;

  const { name, color } = data;
  
  await db.query(
    `UPDATE focus_categories 
    SET  name = $1, 
      color = $2
    WHERE id = $3 AND user_id = $4
    `,
    [name, color, id, userId]
  )
  revalidatePath("/home/focus");
}

export async function archivedFocusCategory(id:number) {

  const session = await getServerSession(authOptions);

  if (!session) return;

  const userId = session.user.id;
  
  await db.query(
    `UPDATE focus_categories 
      SET is_archived = TRUE
    WHERE id = $1 AND user_id = $2
    `,
    [id, userId]
  )
  revalidatePath("/home/focus");
}


export async function unarchivedFocusCategory(id:number) {

  const session = await getServerSession(authOptions);

  if (!session) return;

  const userId = session.user.id;
  
  await db.query(
    `UPDATE focus_categories 
      SET is_archived = FALSE
    WHERE id = $1 AND user_id = $2
    `,
    [id, userId]
  )
  revalidatePath("/home/focus");
}


export async function deleteFocusCategory(id:number) {

  const session = await getServerSession(authOptions);

  if (!session) return;

  const userId = session.user.id;
  
  await db.query(
    `DELETE FROM focus_categories 
    WHERE id = $1 AND user_id = $2
    `,
    [id, userId]
  )
  revalidatePath("/home/focus");
}