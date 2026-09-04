import { NextResponse, type NextRequest } from "next/server";
import {
  createLocaleCookie,
  shouldUseSecureCookie,
  stripLegacyLocale,
} from "@/i18n/config";

export function proxy(request: NextRequest) {
  const legacyRoute = stripLegacyLocale(request.nextUrl.pathname);
  if (!legacyRoute) return NextResponse.next();

  const redirectUrl = request.nextUrl.clone();
  redirectUrl.pathname = legacyRoute.pathname;

  const response = NextResponse.redirect(redirectUrl, 307);
  response.cookies.set(
    createLocaleCookie(legacyRoute.locale, shouldUseSecureCookie()),
  );

  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
