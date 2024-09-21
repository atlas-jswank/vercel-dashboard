import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { sql } from "@vercel/postgres";
import bcrypt from "bcryptjs";
import type { User } from "@/lib/definitions";
import { fetchUser } from "./lib/data";

export const { handlers, signIn, signOut, auth } = NextAuth({
  theme: {
    brandColor: "#1ED2AF",
    logo: "/logo.png",
    buttonText: "#ffffff",
  },
  providers: [
    Credentials({
      credentials: {
        email: {
          label: "Email",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      //@ts-ignore
      authorize: async (credentials: { email: string; password: string }) => {
        const { email, password } = credentials;
        const user = await fetchUser(email);
        if (!user) return null;
        const passwordsMatch = await bcrypt.compare(password, user.password);
        if (passwordsMatch) return user;
        return null;
      },
    }),
  ],
  callbacks: {
    authorized: async ({ auth }) => {
      // Logged in users are authenticated, otherwise redirect to login page
      return !!auth;
    },
  },
});
