import "server-only";
import { cookies } from "next/headers";
import {
  defaultLocale,
  hasLocale,
  localeCookieName,
  type Locale,
} from "./config";

export const getRequestLocale = async (): Promise<Locale> => {
  const value = (await cookies()).get(localeCookieName)?.value;
  return value && hasLocale(value) ? value : defaultLocale;
};
