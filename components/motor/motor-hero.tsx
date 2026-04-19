import Image from "next/image"
import { Wrench, Shield, Truck } from "lucide-react"

export function MotorHero() {
  const features = [
    { icon: Wrench, text: "Kaliteli Yedek Parça" },
    { icon: Shield, text: "Garantili Ürünler" },
    { icon: Truck, text: "Hızlı Teslimat" },
  ]

  return (
    <section className="relative min-h-[70vh] flex items-center pt-16">
      <div className="absolute inset-0 z-0">
        <Image
          src="/motor-hero.jpg"
          alt="Rota Keyf Motor"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/70" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4 tracking-tight">
            ROTA<span className="text-primary">KEYF</span>
          </h1>
          <p className="text-2xl md:text-3xl text-primary font-semibold mb-4">
            MOTOR
          </p>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            Motosikletiniz için en kaliteli yedek parça ve aksesuarlar. Geniş
            ürün yelpazemizle hizmetinizdeyiz.
          </p>

          <div className="flex flex-wrap gap-6">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <feature.icon className="w-5 h-5 text-primary" />
                </div>
                <span className="text-foreground font-medium">
                  {feature.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
