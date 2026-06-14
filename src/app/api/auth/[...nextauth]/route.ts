// app/api/auth/[...nextauth]/route.ts

import db from "@/src/lib/db";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const result = await db.query(
          "SELECT * FROM users WHERE email = $1",
          [credentials?.email]
        );
        const user = result.rows[0];
        console.log(user)
        if (!user) return null;
        return user;
      }
    })
  ],
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };