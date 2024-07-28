import bcrypt from "bcryptjs"
import type { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"

import Github from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import Discord from "next-auth/providers/discord"
import { LoginSchema } from "@/schema"
import { getUserByEmail } from "@/data/user"

export default {
  // Google & Github providers
  providers: [
    Github({
      clientId: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID ?? 'default',
      clientSecret: process.env.NEXT_PUBLIC_GITHUB_CLIENT_SECRET ?? 'default',
    }),
    Google({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? 'default',
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET ?? 'default',
    }),
    Discord({
      clientId: process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID ?? 'default',
      clientSecret: process.env.NEXT_PUBLIC_DISCORD_CLIENT_SECRET ?? 'default',
    }),

    Credentials({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },

      async authorize(credentials) {
        // Validate the credentials given by the user
        const validatedFields = await LoginSchema.safeParse(credentials)

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          const user = await getUserByEmail(email);
        
          if(!user || !user.password) return null;

          // check if passwords match
          const passwordsMatch = await bcrypt.compare(
            password, 
            user.password
          );
          // if the passwords match, return the user
          if(passwordsMatch) return user;
        }
        return null;
      }
    })
  ],
} satisfies NextAuthConfig