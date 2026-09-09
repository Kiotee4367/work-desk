import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { DM_Sans, Open_Sans } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { getActiveBrand } from "@/lib/brand";
import { authConfigured } from "@/lib/env";
import Header from "@/components/Header";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans", display: "swap" });
const openSans = Open_Sans({ subsets: ["latin"], variable: "--font-open-sans", display: "swap" });

export async function generateMetadata(): Promise<Metadata> {
  const brand = await getActiveBrand();
  return {
    title: {
      default: `${brand.shortName} work desk`,
      template: `%s | ${brand.shortName} work desk`,
    },
    description: brand.tagline,
  };
}

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const brand = await getActiveBrand();
  const brandStyle = {
    "--brand-primary": brand.primary,
    "--brand-accent": brand.accent,
    "--brand-ink": brand.ink,
    "--brand-paper": brand.paper,
    "--brand-heading": brand.headingFont,
    "--brand-body": brand.bodyFont,
  } as CSSProperties;

  const shell = (
    <html
      lang="en"
      className={`${dmSans.variable} ${openSans.variable} h-full antialiased`}
      style={brandStyle}
    >
      <body className="min-h-full flex flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:z-50 focus:rounded focus:bg-paper focus:px-3 focus:py-2 focus:text-ink"
        >
          Skip to content
        </a>
        <Header brand={brand} />
        <Nav />
        <main id="main" className="w-full max-w-5xl mx-auto px-4 py-6 flex-1">
          {children}
        </main>
        <Footer brand={brand} />
      </body>
    </html>
  );

  // Without Clerk keys the app runs in preview mode (development only; production refuses
  // to start, see proxy.ts). This lets the owner check screens before sign-in is set up.
  const localization = {
    signIn: {
      start: {
        title: `Sign in to your ${brand.shortName} work desk`,
        subtitle: "Welcome back. Sign in to continue.",
      },
    },
    signUp: {
      start: {
        title: `Create your ${brand.shortName} work desk account`,
        subtitle: "Takes under a minute.",
      },
    },
  };
  return authConfigured() ? <ClerkProvider localization={localization}>{shell}</ClerkProvider> : shell;
}
