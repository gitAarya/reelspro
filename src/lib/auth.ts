import { NextAuthOptions } from "next-auth";
import { CredentialsProvider } from "next-auth/providers/credentials";
import { connToDB } from "./db";
import bcrypt from "bcryptjs";
import User from "@/models/user.model";
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: { email: any; password: string; },req: any) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing Email or Password");
        }
        try {
          await connToDB();
          const user = await User.findOne({ email: credentials.email });
          if (!user) {
            throw new Error("no user found");
          }

          const isvalid = await bcrypt.compare(
            credentials.password,
            user.password
          );
          if (!isvalid) {
            throw new Error("Invalid Password");
          }
          return {
            id: user._id.toString(),
            email: user.email,
          };
        } catch (error) {
          throw error;
        }
      },
    }),
  ],
};