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
    "SELECT * FROM focus_categories WHERE id = $1",
    [userId]
  );


  const focusCategories: FocusCategories[] = result.rows.map(cate=>({
    id:cate.id,
    userId:cate.user_id,
    name: cate.name,
    color: cate.colour,
    createdAt: cate.created_at,
  }));

  return focusCategories;
}

export async function addFocusCategory(data: AddFocusCategoryProps) {

  const session = await getServerSession(authOptions);

  if (!session) return;

  const userId = session.user.id;

  const { name, color } = data;
  
  await db.query(
    "INSERT INTO focus_categories (user_id, name, color) VALUES ($1, $2, $3)",
    [userId, name, color]
  )
  revalidatePath("/home/focus");
}