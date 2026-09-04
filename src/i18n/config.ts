export const locales = ["th", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";
export const localeCookieName = "earthport-locale";
export const localeCookieMaxAge = 60 * 60 * 24 * 365;

export const shouldUseSecureCookie = (nodeEnv = process.env.NODE_ENV): boolean =>
  nodeEnv === "production";

export const createLocaleCookie = (locale: Locale, secure: boolean) => ({
  name: localeCookieName,
  value: locale,
  path: "/",
  maxAge: localeCookieMaxAge,
  httpOnly: true,
  sameSite: "lax" as const,
  secure,
});

export const hasLocale = (value: string): value is Locale =>
  locales.some((locale) => locale === value);

export const getPathnameLocale = (pathname: string): Locale | undefined => {
  const [, segment] = pathname.split("/");
  return segment && hasLocale(segment) ? segment : undefined;
};

export const stripLegacyLocale = (
  pathname: string,
): { locale: Locale; pathname: string } | undefined => {
  const locale = getPathnameLocale(pathname);
  if (!locale) return undefined;

  const cleanPathname = pathname.replace(
    new RegExp(`^/${locale}(?=/|$)`),
    "",
  );

  return { locale, pathname: cleanPathname || "/" };
};
