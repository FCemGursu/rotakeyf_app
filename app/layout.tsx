// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rotakeyf",
  description: "Motosiklet tutkunları için rota planlama ve keyif platformu.",
  keywords: ["motosiklet", "rota", "rotakeyf", "touring", "moto"],
  authors: [{ name: "Rotakeyf" }],
  openGraph: {
    title: "Rotakeyf",
    description: "Motosiklet tutkunları için rota planlama ve keyif platformu.",
    url: "https://rotakeyf.com",
    siteName: "Rotakeyf",
    locale: "tr_TR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rotakeyf",
    description: "Motosiklet tutkunları için rota planlama ve keyif platformu.",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="tr"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body>{children}</body>
    </html>
  );
}