import type { Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { MantineProvider } from "@mantine/core";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AosProvider from "@/components/providers/AosProvider";
import { getDictionary } from "@/i18n/dictionaries";
import { createCanonicalAlternates, metadataBase } from "@/i18n/metadata";
import { getRequestLocale } from "@/i18n/server";
import { mantineTheme } from "@/lib/mantine-theme";
import { fontVariables } from "./fonts";
import "@mantine/core/styles.layer.css";
import "./globals.css";

interface RootLayoutProps {
  children: React.ReactNode;
}

export const generateMetadata = async (): Promise<Metadata> => {
  const locale = await getRequestLocale();
  const dictionary = await getDictionary(locale);

  return {
    metadataBase,
    title: dictionary.metadata.homeTitle,
    description: dictionary.metadata.homeDescription,
    alternates: createCanonicalAlternates(),
  };
};

const RootLayout = async ({ children }: RootLayoutProps) => {
  const locale = await getRequestLocale();
  const dictionary = await getDictionary(locale);

  return (
    <html lang={locale} data-theme="earthport" data-scroll-behavior="smooth">
      <body
        className={`${fontVariables} flex min-h-screen flex-col font-thai`}
      >
        <MantineProvider theme={mantineTheme}>
          <AosProvider>
            <a
              href="#main-content"
              className="btn btn-primary fixed top-3 left-3 z-50 -translate-y-24 focus:translate-y-0"
            >
              {dictionary.navigation.skipToContent}
            </a>
            <Navbar
              locale={locale}
              copy={{
                navigation: dictionary.navigation,
                language: dictionary.language,
              }}
            />
            <main id="main-content" tabIndex={-1} className="flex-1">
              {children}
            </main>
            <Footer
              copy={{
                navigation: dictionary.navigation,
                footer: dictionary.footer,
                common: dictionary.common,
              }}
            />
          </AosProvider>
          <SpeedInsights />
        </MantineProvider>
      </body>
    </html>
  );
};

export default RootLayout;
