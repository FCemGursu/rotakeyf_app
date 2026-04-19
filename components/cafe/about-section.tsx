"use client"

import { useEffect, useState, useCallback } from "react"
import Image from "next/image"
import { Coffee, Users, Bike } from "lucide-react"

const slides = [
  {
    icon: Coffee,
    title: "Samimi Bir Atmosfer",
    description: "Kapıdan girdiğin an kendin gibi hissedebileceğin, sıcak ve samimi bir ortam seni bekliyor.",
    image: "/Resim1.jpeg",
  },
  {
    icon: Users,
    title: "Aile Ortamı",
    description: "Burada herkes tanışır, muhabbet akar. Yabancı gelip dost ayrılırsın.",
    image: "/resim3.jpeg",
  },
  {
    icon: Bike,
    title: "Hem Kafe Hem Tezgah",
    description: "Kahveni yudumlarken motorunu konuşur, bakımını yaptırır, satılık ilanlarına bakarsın. Her şey bir arada.",
    image: "/resim5.jpeg",
  },
]

export function AboutSection() {
  const [current, setCurrent] = useState(0)

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % slides.length)
  }, [])

  useEffect(() => {
    const timer = setInterval(next, 4000)
    return () => clearInterval(timer)
  }, [next])

  return (
    <section id="biz-kimiz" className="scroll-mt-16 bg-black">
      {/* Başlık */}
      <div className="text-center pt-16 pb-10 px-4">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
          Biz Kimiz
        </h2>
        <div className="w-24 h-1 bg-primary mx-auto mb-6" />
        <p className="text-gray-400 max-w-xl mx-auto text-base md:text-lg">
          Rota Keyf — Eskişehir&apos;in kalbinde, hem kafe hem motor tezgahı, hem de muhabbettin adresi.
        </p>
      </div>

      {/* Slider */}
      <div className="relative w-full h-[60vh] min-h-[400px] overflow-hidden">
        {slides.map((slide, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-700 ${
              i === current ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            {/* Background image */}
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              className="object-cover"
              sizes="100vw"
              priority={i === 0}
            />
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/60" />
            {/* Content */}
            <div className="absolute inset-0 flex flex-col items-start justify-end p-10 md:p-16">
              <div className="w-14 h-14 bg-primary/20 rounded-full flex items-center justify-center mb-4">
                <slide.icon className="w-7 h-7 text-primary" />
              </div>
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-3 tracking-tight">
                {slide.title}
              </h2>
              <p className="text-lg text-white/70 max-w-md">
                {slide.description}
              </p>
            </div>
          </div>
        ))}

        {/* Dot indicators */}
        <div className="absolute bottom-6 left-10 md:left-16 flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-1 rounded-full transition-all duration-300 ${
                i === current ? "w-8 bg-white" : "w-4 bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
