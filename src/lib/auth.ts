import { NextAuthOptions } from "next-auth";
import  CredentialsProvider  from "next-auth/providers/credentials";
import { connToDB } from "./db";
import bcrypt from "bcryptjs";
import User from "@/models/user.model";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "email" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          console.log(credentials?.email ,credentials?.password);
          
          throw new Error(" email or password is missing");
        }
        try {
          await connToDB();

          const user = await User.findOne({ email: credentials.email });
          if (!user) {
            throw new Error("no user found!");
          }
          const isValid = await bcrypt.compare(
            credentials.password,
            user.password
          );
          if (!isValid) {
            throw new Error("invalid password");
          }
          console.log("user found", user);
          return {
            
            
            id: user._id.toString(),
            email: user.email,
          };
        } catch (error) {
          console.log("auth error", error);

          throw error;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
       session.user.id=token.id as string
      }
      return session;
    },
  },
  pages:{
    signIn:"/login",
    error:"/login"
  },
  session:{
    strategy:"jwt",
    maxAge:30*24*60*60
  },
  secret:process.env.NEXTAUTH_SECRET!
};