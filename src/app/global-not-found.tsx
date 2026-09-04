import type { Metadata } from "next";
import NotFoundContent from "@/components/ui/NotFoundContent";
import { getDictionary } from "@/i18n/dictionaries";
import { getRequestLocale } from "@/i18n/server";
import { fontVariables } from "./fonts";
import "./globals.css";

export const generateMetadata = async (): Promise<Metadata> => {
  const locale = await getRequestLocale();
  const dictionary = await getDictionary(locale);

  return {
    title: dictionary.errors.notFoundTitle,
    description: dictionary.errors.notFoundDescription,
  };
};

const GlobalNotFound = async () => {
  const locale = await getRequestLocale();
  const dictionary = await getDictionary(locale);

  return (
    <html lang={locale} data-theme="earthport">
      <body className={`${fontVariables} bg-base-100 font-thai text-base-content`}>
        <NotFoundContent
          title={dictionary.errors.notFoundTitle}
          description={dictionary.errors.notFoundDescription}
          recoveryHref="/"
          recoveryLabel={dictionary.errors.backHome}
          standalone
        />
      </body>
    </html>
  );
};

export default GlobalNotFound;
