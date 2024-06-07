import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { i18nRouter } from "next-i18n-router";
import i18nConfig from "./i18nConfig";

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/favourites")) {
    // This logic is only applied to /favourites
    const loggedIn = request.cookies.get("userId");

    if (!loggedIn?.value) {
      return NextResponse.redirect(new URL("/login-manga", request.url));
    } else {
      NextResponse.next();
    }
  }
  return i18nRouter(request, i18nConfig);
}

export const config = {
  matcher: ["/favourites", "/((?!api|static|.*\\..*|_next).*)"],
};
