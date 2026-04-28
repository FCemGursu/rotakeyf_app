import Image from "next/image"
import { Coffee, Bike } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative h-screen flex items-center justify-center">
      <div className="absolute inset-0 z-0">
        <Image
          src="/arkaplan2.png"
          alt="RotaKeyf Cafe"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/50 to-background" />
      </div>

      <div className="relative z-10 text-center px-4">
        <div className="relative w-[320px] sm:w-[480px] lg:w-[640px] h-[160px] sm:h-[240px] lg:h-[320px] mx-auto mb-2 select-none">
          <Image
            src="/rotayazı.png"
            alt="Rotakeyf"
            fill
            className="object-contain drop-shadow-[0_0_40px_rgba(255,255,255,0.3)]"
            priority
          />
        </div>
        <p className="text-lg md:text-xl text-muted-foreground mb-8">
          Cafe & Motor
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-6">
          <a
            href="#biz-kimiz"
            className="group relative flex items-center justify-center gap-3 w-72 sm:w-80 py-5 bg-primary text-primary-foreground rounded-xl font-bold text-xl sm:text-2xl hover:scale-105 transition-transform duration-300 shadow-lg shadow-primary/30"
          >
            <Coffee className="w-7 h-7" />
            RotaKeyf Cafe
          </a>

          <a
            href="/motor"
            className="group relative flex items-center justify-center gap-3 w-72 sm:w-80 py-5 bg-secondary text-secondary-foreground border-2 border-primary rounded-xl font-bold text-xl sm:text-2xl hover:bg-primary hover:text-primary-foreground hover:scale-105 transition-all duration-300"
          >
            <Bike className="w-7 h-7" />
            RotaKeyf Motor
          </a>
        </div>

        <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto">
          Motosiklet tutkunlarının buluşma noktası
        </p>
      </div>
    </section>
  )
}
