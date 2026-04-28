import Image from "next/image"

const partners = [
  {
    name: "Metzeler",
    logo: "/metzeler-vector-logo.png",
  },
  {
    name: "Motul",
    logo: "/2.png",
  },
  {
    name: "Pirelli",
    logo: "/3.png",
  },
  {
    name: "Castrol",
    logo: "/5.png",
  },
]

export function MotorPartners() {
  return (
    <section className="py-14 px-4 bg-black border-t border-border">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-xs tracking-[0.3em] uppercase text-primary font-semibold mb-2">
            İş Birliklerimiz
          </p>
          
          <div className="w-16 h-0.5 bg-primary mx-auto mt-4" />
        </div>

        <div className="flex items-center justify-center gap-6 md:gap-10">
          {partners.map((partner) => (
            <div
              key={partner.name}
              className="relative w-56 h-30"
            >
              <Image
                src={partner.logo}
                alt={partner.name}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 128px, 144px"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
