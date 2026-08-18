import type { Metadata } from "next";
import { Noto_Sans_Thai, Outfit, Sarabun } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { MantineProvider } from "@mantine/core";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AosProvider from "@/components/providers/AosProvider";
import { mantineTheme } from "@/lib/mantine-theme";
import "@mantine/core/styles.layer.css";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const notoSansThai = Noto_Sans_Thai({
  subsets: ["latin", "thai"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-noto-thai",
  display: "swap",
});

const sarabun = Sarabun({
  subsets: ["latin", "thai"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sarabun",
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
        className={`${outfit.variable} ${notoSansThai.variable} ${sarabun.variable} flex min-h-screen flex-col font-thai`}
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
