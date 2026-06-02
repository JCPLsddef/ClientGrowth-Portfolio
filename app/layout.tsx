import type { Metadata } from "next";
import { Jost, Archivo, Cormorant, Anton } from "next/font/google";
import "./globals.css";

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${jost.variable} ${archivo.variable} ${cormorant.variable} ${anton.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
