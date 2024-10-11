// middleware.ts
import type { NextRequest } from "next/server";
import authConfig from "@/auth.config";
import NextAuth from "next-auth";
import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
} from "@/index"; // Adjust the import path as necessary

const { auth } = NextAuth(authConfig);

export default auth((req): any => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  // Determine if the route is an API auth route
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  // Determine if the route is a public route
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  // Determine if the route is an authentication-related route
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  // Allow API auth routes to pass through
  if (isApiAuthRoute) {
    return null;
  }

  // Redirect authenticated users away from auth routes (e.g., login, register)
  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return null;
  }

  // Redirect unauthenticated users trying to access protected routes
  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL('/auth/register', nextUrl));
  }

  // Proceed to the requested page
  return null;
});

// Matcher configuration
export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
