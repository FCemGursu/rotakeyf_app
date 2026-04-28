import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { MotorHero } from "@/components/motor/motor-hero"
import { MotorServices } from "@/components/motor/motor-services"
import { MotorShop } from "@/components/motor/motor-shop"
import { MotorSales } from "@/components/motor/motor-sales"
import { MotorContact } from "@/components/motor/motor-contact"
import { MotorPartners } from "@/components/motor/motor-partners"
import { Footer } from "@/components/footer"
import { prisma } from "@/lib/prisma"

export const metadata: Metadata = {
  title: "Motor",
  description:
    "Rotakeyf Motor — Eskişehir'de motosiklet aksesuarları, bakım ürünleri ve satışlık ikinci el motosikletler. Kask, eldiven, bot, ceket ve daha fazlası.",
  keywords: [
    "rotakeyf motor",
    "eskişehir motosiklet",
    "motosiklet aksesuarları eskişehir",
    "ikinci el motosiklet eskişehir",
    "satışlık motosiklet",
    "motor ekipmanları",
    "kask satış eskişehir",
  ],
  alternates: {
    canonical: "/motor",
  },
  openGraph: {
    title: "Rotakeyf Motor | Aksesuar & Satışlık Motosikletler",
    description:
      "Eskişehir'de motosiklet aksesuarları ve satışlık ikinci el motosikletler için Rotakeyf Motor.",
    url: "https://rotakeyf.com/motor",
  },
}

export default async function MotorPage() {
  const [categories, listings] = await Promise.all([
    prisma.category.findMany({
      where: { type: "motor" },
      include: {
        products: { orderBy: { createdAt: "asc" } },
        subCategories: { orderBy: { createdAt: "asc" } },
      },
      orderBy: { createdAt: "asc" },
    }),
    prisma.motorListing.findMany({
      orderBy: { createdAt: "desc" },
    }),
  ])

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <MotorHero />
      <MotorServices />
      <MotorShop categories={categories} />
      <MotorSales listings={listings} />
      <MotorContact />
      <MotorPartners />
      <Footer />
    </main>
  )
}
