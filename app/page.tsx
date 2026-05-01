import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/cafe/hero-section"
import { AboutSection } from "@/components/cafe/about-section"
import { GallerySection } from "@/components/cafe/gallery-section"
import { MenuSection } from "@/components/cafe/menu-section"
import { ContactSection } from "@/components/cafe/contact-section"
import { MotorPartners } from "@/components/motor/motor-partners"
import { Footer } from "@/components/footer"
import { prisma } from "@/lib/prisma"

export const metadata: Metadata = {
  title: "Rotakeyf | Cafe & Motor — Eskişehir",
  description:
    "Rotakeyf Cafe, Eskişehir'de motosiklet severler için özel tasarlanmış bir buluşma noktası. El yapımı kahveler, ev yemekleri, motosiklet aksesuarları ve satılık ikinci el motorsikletlerle sizi bekliyoruz.",
  keywords: [
    "rotakeyf",
    "rotakeyf cafe eskişehir",
    "motosiklet cafe eskişehir",
    "eskişehir cafe",
    "motor cafe",
    "motosikletçi kafesi",
    "eskişehir kahve",
    "rotakeyf motor",
  ],
  alternates: {
    canonical: "/",
  },
}

export const dynamic = 'force-dynamic'

export default async function Home() {
  const categories = await prisma.category.findMany({
    where: { type: "cafe" },
    include: { products: { orderBy: { createdAt: "asc" } } },
    orderBy: { createdAt: "asc" },
  })

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <GallerySection />
      <MenuSection categories={categories} />
      <ContactSection />
      <MotorPartners />
      <Footer />
    </main>
  )
}

