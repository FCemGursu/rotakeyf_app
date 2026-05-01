// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono, Bebas_Neue, Pacifico } from "next/font/google";
import "./globals.css";
import { CookieBanner } from "@/components/cookie-banner"

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas-neue",
  subsets: ["latin"],
  weight: "400",
});

const pacifico = Pacifico({
  variable: "--font-pacifico",
  subsets: ["latin"],
  weight: "400",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Rotakeyf | Cafe & Motosiklet",
    template: "%s | Rotakeyf",
  },
  description:
    "Rotakeyf, Eskişehir'de motosiklet tutkunlarının buluşma noktası. Özel kahveler, nefis yemekler ve ikinci el motosiklet satışıyla hizmetinizdeyiz. Kafe, motor aksesuarları ve satışlık motosikletler için bizi ziyaret edin.",
  keywords: [
    "rotakeyf",
    "rotakeyf cafe",
    "eskişehir motosiklet cafe",
    "motosiklet kafesi eskişehir",
    "motor cafe eskişehir",
    "eskişehir cafe",
    "motosiklet satış eskişehir",
    "ikinci el motosiklet eskişehir",
    "motor aksesuarları",
    "motosiklet tutkunları",
    "rota cafe",
    "keyf cafe",
  ],
  authors: [{ name: "Rotakeyf" }],
  metadataBase: new URL("https://rotakeyf.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Rotakeyf | Cafe & Motosiklet — Eskişehir",
    description:
      "Eskişehir'de motosiklet tutkunlarının buluşma noktası. Özel kahveler, lezzetli yemekler ve satışlık motosikletler.",
    url: "https://rotakeyf.com",
    siteName: "Rotakeyf",
    locale: "tr_TR",
    type: "website",
    images: [
      {
        url: "/rotayazı.png",
        width: 1200,
        height: 630,
        alt: "Rotakeyf Cafe & Motor",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rotakeyf | Cafe & Motosiklet — Eskişehir",
    description:
      "Eskişehir'de motosiklet tutkunlarının buluşma noktası. Özel kahveler ve satışlık motosikletler.",
    images: ["/rotayazı.png"],
  },
  icons: {
    icon: "/alperem.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
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
      className={`${geistSans.variable} ${geistMono.variable} ${bebasNeue.variable} ${pacifico.variable} antialiased`}
    >
      <body>
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}