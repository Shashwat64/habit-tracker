import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import db from "@/src/lib/db";

export const authOptions: NextAuthOptions = {
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
        if (!user) return null;
        const valid = await bcrypt.compare(credentials?.password ?? "", user.password_hash);
        if (!valid) return null;
        return {
          id: user.id,
          name: `${user.first_name} ${user.last_name}`,
          email: user.email,
        };
      },
    }),
  ],
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub as string;
      }
      return session;
    }
  }
};