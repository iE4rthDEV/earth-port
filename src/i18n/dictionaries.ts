import "server-only";
import type { Locale } from "./config";
import type { Dictionary } from "./dictionaries/th";

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  th: () => import("./dictionaries/th").then((module) => module.default),
  en: () => import("./dictionaries/en").then((module) => module.default),
};

export const getDictionary = async (locale: Locale): Promise<Dictionary> =>
  dictionaries[locale]();

export type { Dictionary };
