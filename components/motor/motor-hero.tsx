import Image from "next/image"
import { Wrench, Droplet, Package, Bike } from "lucide-react"

export function MotorHero() {
 


  return (
    <section className="relative min-h-[70vh] flex items-center pt-16">
      <div className="absolute inset-0 z-0">
        <Image
          src="/arkaplan2.png"
          alt="Rota Keyf Motor"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/50" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 mt-12">
        <div className="max-w-2xl">
          <div className="relative w-[260px] sm:w-[360px] h-[130px] sm:h-[180px] mb-2 select-none">
            <Image
              src="/rotayazı.png"
              alt="Rotakeyf"
              fill
              className="object-contain drop-shadow-[0_0_30px_rgba(255,255,255,0.25)]"
              sizes="(max-width: 640px) 260px, 360px"
              priority
            />
          </div>
          <p className="text-2xl md:text-3xl text-primary font-semibold mb-4">
            MOTOR
          </p>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            Motosikletinizin bakımından yağ değişimine, ihtiyacınız olan tüm
            techizat ve ürünlere ulaşabileceğiniz, satılık ikinci el motorları
            da bulabileceğiniz Eskişehir&apos;in motor durağı.
          </p>

          <div className="flex flex-wrap gap-6">
           
          </div>
        </div>
      </div>
    </section>
  )
}
