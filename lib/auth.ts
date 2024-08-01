import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { UserRole } from "@prisma/client"
import { getUserById } from "@/data/user"
import { db } from "@/../lib/db"
import authConfig from "@/../auth.config"

// auth
// Configuration object
const authOptions = {
  adapter: PrismaAdapter(db),
  pages: {
    signIn: '/auth/login',
    error: '/auth/error',
  },
  events: {
    async linkAccount({ user }: { user: { id: string } }) {
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() }
      })
    }
  },
  callbacks: {
    async signIn({ user, account }: { user: { id: string }; account: any }) {
      if(account?.provider !== "credentials") return true;
      const existingUser = await getUserById(user.id ?? '');
      if(!existingUser?.emailVerified) return false;
      return true;
    },
    async session({ session, token }: { session: any; token: any }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      if(token.role && session.user) {
        session.user.role = token.role as UserRole;
      }  
      return session;
    },
    async jwt ({ token }: { token: { sub: string; role?: UserRole } }) {
      if(!token.sub) return token;
      const existingUser = await getUserById(token.sub);
      if(!existingUser) return token;
      token.role = existingUser.role;
      return token;
    },
  },
  session: { strategy: "jwt" },
  ...authConfig,
}

// Log the return value of NextAuth to ensure it is as expected
const authInstance = NextAuth(authOptions);
console.log(authInstance);

export const {
  handlers: {GET, POST},
  auth,
  signIn,
  signOut,
} = authInstance;