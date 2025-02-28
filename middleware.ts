import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { HEADER_AUTH_KEY } from "./utils/constants";

export function middleware(request: NextRequest) {
  const userIdCookie = request.cookies.get(HEADER_AUTH_KEY);
  const isGameRoute = request.nextUrl.pathname.startsWith("/game");

  if (isGameRoute && !userIdCookie) {
    return NextResponse.redirect(new URL("/auth", request.url));
  }

  return NextResponse.next();
}
