import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const loggedIn = request.cookies.get("userId");

  if (!loggedIn) {
    return NextResponse.redirect(new URL("/login-manga", request.url));
  }
}

export const config = {
  matcher: "/favourites",
};
