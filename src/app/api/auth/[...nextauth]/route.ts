import CredentialsProvider from "next-auth/providers/credentials";
import { connToDB } from "./db";
import User from "@/models/user.model";
import bcrypt from "bcryptjs";

import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";
export const authOptions: NextAuthOptions = {

  callbacks: {
    async jwt(token, user) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
};
const handler= NextAuth(authOptions)
export {handler as GET,handler as POST}
