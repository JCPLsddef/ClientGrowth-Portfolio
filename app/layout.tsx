import type { Metadata } from "next";
import { Jost, Archivo, Cormorant, Anton } from "next/font/google";
import { cookies, headers } from "next/headers";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import LanguageProvider from "@/components/LanguageProvider";
import { LANG_COOKIE, type Lang } from "@/content/dictionary";

const jost = Jost({
  subsets: ["latin"],
  variable: "--font-jost",
  display: "swap",
});

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800", "900"],
  variable: "--font-archivo",
  display: "swap",
});

const cormorant = Cormorant({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-cormorant",
  display: "swap",
});

const anton = Anton({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-anton",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Client Growth — Become the obvious choice in your market",
  description:
    "Growth infrastructure for local service businesses. A premium website, Google visibility, and AI follow-up built into one system that turns attention into booked calls.",
};

// Resolve the language for the very first paint: an explicit cookie choice wins,
// otherwise fall back to the browser's Accept-Language preference.
async function resolveInitialLang(): Promise<Lang> {
  const stored = (await cookies()).get(LANG_COOKIE)?.value;
  if (stored === "fr" || stored === "en") return stored;
  const accept = (await headers()).get("accept-language")?.toLowerCase() ?? "";
  return /(^|,|\s)fr\b/.test(accept) ? "fr" : "en";
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const lang = await resolveInitialLang();

  return (
    <html
      lang={lang}
      className={`${jost.variable} ${archivo.variable} ${cormorant.variable} ${anton.variable}`}
    >
      <body>
        <LanguageProvider initialLang={lang}>
          <SmoothScroll>{children}</SmoothScroll>
        </LanguageProvider>
      </body>
    </html>
  );
}
