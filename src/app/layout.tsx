import type { Metadata } from "next";
import { Outfit, Kanit } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { MantineProvider } from "@mantine/core";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AosProvider from "@/components/providers/AosProvider";
import { mantineTheme } from "@/lib/mantine-theme";
import "./globals.css";
import "@mantine/core/styles.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const kanit = Kanit({
  subsets: ["latin", "thai"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-kanit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Niti Surakongka | Portfolio",
  description: "Niti Surakongka's portfolio",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="th" data-theme="earthport">
      <body
        className={`${outfit.variable} ${kanit.variable} font-Outfit flex min-h-screen flex-col`}
      >
        <MantineProvider theme={mantineTheme}>
          <AosProvider>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </AosProvider>
          <SpeedInsights />
        </MantineProvider>
      </body>
    </html>
  );
};

export default RootLayout;
