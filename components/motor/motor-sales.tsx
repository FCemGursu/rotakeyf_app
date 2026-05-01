import Image from "next/image"
import { ExternalLink } from "lucide-react"

type MotorListing = {
  id: number
  name: string
  imageUrl: string
  link: string
}

export function MotorSales({ listings }: { listings: MotorListing[] }) {
  if (listings.length === 0) return null

  return (
    <section className="py-16 px-4 border-t border-border">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Satılık Motosikletler
          </h2>
          <p className="text-muted-foreground">
            İkinci el satılık araçlarımız — görsele tıklayarak ilana ulaşabilirsiniz
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.map((listing) => (
            <a
              key={listing.id}
              href={listing.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-card border border-border rounded-xl overflow-hidden hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/10"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
                <Image
                  src={listing.imageUrl}
                  alt={listing.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                  <ExternalLink className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>

              <div className="p-4 flex items-center justify-between">
                <h3 className="text-base font-semibold text-foreground truncate">
                  {listing.name}
                </h3>
                <ExternalLink className="w-4 h-4 text-muted-foreground shrink-0 ml-2" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
