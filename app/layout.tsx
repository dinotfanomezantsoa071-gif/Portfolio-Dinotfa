import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { SkipLink } from "@/components/layout/SkipLink";
import { MotionProvider } from "@/components/providers/MotionProvider";
import { ReadingProgress } from "@/components/ui/ReadingProgress";
import { profile } from "@/data/profile";
import { SITE_URL } from "@/lib/constants";
import { themeInitScript } from "@/lib/theme-script";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

const siteTitle = "Dinot — Développement Web, Mobile & Full-Stack";
const siteDescription =
  "Portfolio de Dinot, étudiant en L3 Informatique spécialisé dans le développement Web, Mobile et Full-Stack.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: siteTitle,
    template: "%s | Dinot",
  },
  description: siteDescription,
  applicationName: "Portfolio Dinot",
  authors: [{ name: profile.fullName, url: profile.github }],
  creator: profile.fullName,
  keywords: [
    "Dinot",
    "portfolio",
    "développeur web",
    "développeur mobile",
    "full-stack",
    "React",
    "Node.js",
    "React Native",
    "Python",
    "Madagascar",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Dinot",
    title: siteTitle,
    description: siteDescription,
    locale: "fr_FR",
    alternateLocale: ["en_US"],
  },
  twitter: {
    card: "summary",
    title: siteTitle,
    description: siteDescription,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#07070b" },
  ],
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="fr"
      suppressHydrationWarning
      className={`${inter.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-screen bg-background font-sans text-foreground antialiased">
        <MotionProvider>
          <SkipLink />
          <Navbar />
          <ReadingProgress />
          {children}
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}