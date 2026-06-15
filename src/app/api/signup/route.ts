import db from "@/src/lib/db";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  // const { firstName, lastName, username, email, password } = await request.json();

    const body = await request.json();
    console.log(body);  // ← add this
    
    const { firstName, lastName, username, email, password } = body;
    console.log({ firstName, lastName, username, email, password }); 

  // check if user already exists
  const existing = await db.query(
    "SELECT * FROM users WHERE email = $1 OR username = $2",
    [email, username]
  );
  if (existing.rows[0]) {
    return Response.json({ error: "User already exists" }, { status: 400 });
  }

  // hash password
  const hashed = await bcrypt.hash(password, 10);

  // insert user
  await db.query(
    "INSERT INTO users (first_name, last_name, username, email, password_hash) VALUES ($1, $2, $3, $4, $5)",
    [firstName, lastName, username, email, hashed]
  );

  return Response.json({ success: true });
}