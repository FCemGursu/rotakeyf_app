"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Wrench, Settings, Droplet, ShieldCheck } from "lucide-react"

const services = [
  {
    icon: Wrench,
    title: "Motor Lastik Değişimi ve Tamiri",
    description:
      "Küçük arızadan büyük revizyona kadar motosikletinizi güvenle teslim edebilirsiniz. Deneyimli ekibimizle çözüm odaklı tamir hizmeti.",
    image: "/motorbakım.jpeg",
    imageClass: "object-cover",
  },
  {
    icon: Settings,
    title: "Yıkama ve Yağ Bakımı",
    description:
      "Periyodik bakım, filtre değişimi, zincir ayarı ve daha fazlası. Motosikletiniz her yolculuğa hazır olsun.",
    image: "/motofoto1.jpeg",
    imageClass: "object-cover",
  },
  
  {
    icon: ShieldCheck,
    title: "Aksesuar & Ekipman",
    description:
      "Kask, eldiven, ceket, bot ve daha fazlası. Sürücü güvenliğini ön planda tutan ekipmanlarla donanın.",
    image: "/resim3.jpeg",
    imageClass: "object-cover",
  },
  {
    icon: Droplet,
    title: "Yol Yardım & Transfer Hizmeti",
    description:
      "Yolda kaldınız mı? Motosikletinizi güvenle alıyor, servisimize transfer ediyoruz. 7/24 yol yardım hizmetiyle her an yanınızdayız.",
    image: "/15.png",
    imageClass: "object-cover",
  },
]

export function MotorServices() {
  const [current, setCurrent] = useState(0)

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % services.length)
  }, [])

  const prev = useCallback(() => {
    setCurrent((c) => (c - 1 + services.length) % services.length)
  }, [])

  useEffect(() => {
    const timer = setInterval(next, 7000)
    return () => clearInterval(timer)
  }, [next])

  return (
    <section id="hizmetlerimiz" className="py-16 px-4 bg-black border-t border-border scroll-mt-16">
      <div className="max-w-7xl mx-auto">
        {/* Başlık */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Hizmetlerimiz
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-4" />
          <p className="text-gray-400 max-w-xl mx-auto">
            Motosikletiniz için ihtiyacınız olan her şey Rotakeyf Motor&apos;da.
          </p>
        </div>

        {/* Carousel */}
        <div className="relative rounded-2xl overflow-hidden">
          <div className="relative h-[560px] md:h-[680px]">
            {services.map((service, i) => (
              <div
                key={i}
                className={`absolute inset-0 transition-opacity duration-700 ${
                  i === current ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
              >
                {service.image ? (
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className={service.imageClass}
                    sizes="100vw"
                    priority={i === 0}
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 to-zinc-800" />
                )}
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col items-start justify-end p-8 md:p-14">
                  <div className="w-14 h-14 bg-primary/20 rounded-full flex items-center justify-center mb-4">
                    <service.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-3xl md:text-5xl font-bold text-white mb-3 tracking-tight">
                    {service.title}
                  </h3>
                  <p className="text-base md:text-lg text-white/70 max-w-lg">
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Sol ok */}
          <button
            onClick={prev}
            aria-label="Önceki"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/50 hover:bg-primary/80 border border-white/20 flex items-center justify-center transition-colors duration-200"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>

          {/* Sağ ok */}
          <button
            onClick={next}
            aria-label="Sonraki"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/50 hover:bg-primary/80 border border-white/20 flex items-center justify-center transition-colors duration-200"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>

          {/* Dot indicators */}
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {services.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                aria-label={`Slayt ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === current ? "w-8 bg-primary" : "w-3 bg-white/40"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
