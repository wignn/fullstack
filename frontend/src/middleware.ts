import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { notFound } from "next/navigation";
import { Global } from "@emotion/react";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  // console.log('Token:', token); // Log token untuk debugging

  const isAuthenticated = !!token;

  const isLoginPage = req.nextUrl.pathname.startsWith("/Login");
  if (isLoginPage && isAuthenticated) {
    return NextResponse.redirect(new URL("/profile", req.url));
  }

  const isProfilePage = req.nextUrl.pathname.startsWith("/profile");
  if (isProfilePage && !isAuthenticated) {
    return NextResponse.redirect(new URL("/Login", req.url));
  }

  const ispost = req.nextUrl.pathname.startsWith("/post");
  if (ispost && !isAuthenticated) {
    return NextResponse.redirect(new URL("/Login", req.url));
  }

  const AdminDash = req.nextUrl.pathname.startsWith("/admin");
  if (AdminDash && !isAuthenticated) {
    const notFoundPath = "/404"; 
    return NextResponse.redirect(new URL(notFoundPath, req.url));
  }

  const regis = req.nextUrl.pathname.startsWith("/Register");
  if (regis && isAuthenticated) {
    return NextResponse.redirect(new URL("/", req.url));
  }
  const message = req.nextUrl.pathname.startsWith("/GlobalMsg");
  if(message && !isAuthenticated){
    return NextResponse.redirect(new URL("/Login", req.url));
  }
  const adminPaths = req.nextUrl.pathname.startsWith("/DataBook");
  if (adminPaths && (!token || token.name !== "Admin")) {
    // return NextResponse.json(
    //   { status: 'error', message: 'Unauthorized' },
    //   { status: 401 }
    // );
    return NextResponse.redirect(new URL("/Login", req.url));
  }

  return NextResponse.next();
}
