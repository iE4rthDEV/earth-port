import { NextResponse, type NextRequest } from "next/server";
import {
  createLocaleCookie,
  hasLocale,
  shouldUseSecureCookie,
} from "@/i18n/config";

const getRequestedLocale = async (
  request: NextRequest,
): Promise<string | undefined> => {
  try {
    const body: unknown = await request.json();
    if (!body || typeof body !== "object" || !("locale" in body)) {
      return undefined;
    }

    return typeof body.locale === "string" ? body.locale : undefined;
  } catch {
    return undefined;
  }
};

export async function POST(request: NextRequest): Promise<NextResponse> {
  const locale = await getRequestedLocale(request);
  if (!locale || !hasLocale(locale)) {
    return NextResponse.json(
      { error: "unsupported-locale" },
      { status: 400 },
    );
  }

  const response = new NextResponse(null, { status: 204 });
  response.cookies.set(
    createLocaleCookie(locale, shouldUseSecureCookie()),
  );
  return response;
}
