"use client"

import { useState } from "react"
import Image from "next/image"
import { Settings } from "lucide-react"

type Product = {
  id: number
  name: string
  description?: string | null
  price?: string | null
  imageUrl?: string | null
  inStock: boolean
  categoryId: number
}

type Category = {
  id: number
  name: string
  products: Product[]
}

export function MotorShop({ categories }: { categories: Category[] }) {
  const [activeCategory, setActiveCategory] = useState<number | null>(null)

  const allProducts = categories.flatMap((c) => c.products)
  const displayedProducts =
    activeCategory !== null
      ? categories.find((c) => c.id === activeCategory)?.products ?? []
      : allProducts

  return (
    <>
      {/* Kategori Filtreleri */}
      <section className="py-12 px-4 border-b border-border">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={() => setActiveCategory(null)}
              className={`flex items-center gap-2 px-5 py-3 rounded-lg font-medium transition-all ${
                activeCategory === null
                  ? "bg-primary text-primary-foreground"
                  : "bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/50"
              }`}
            >
              <Settings className="w-5 h-5" />
              Tümü
            </button>

            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-5 py-3 rounded-lg font-medium transition-all ${
                  activeCategory === category.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/50"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Ürün Grid */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Ürünlerimiz
            </h2>
            <p className="text-muted-foreground">
              Motosikletiniz için en kaliteli ürünler
            </p>
          </div>

          {displayedProducts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg">
                {categories.length === 0
                  ? "Ürünler yakında eklenecek."
                  : "Bu kategoride henüz ürün bulunmuyor."}
              </p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedProducts.map((product) => (
                <div
                  key={product.id}
                  className="group bg-card border border-border rounded-xl overflow-hidden hover:border-primary/50 transition-all"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
                    {product.imageUrl ? (
                      <Image
                        src={product.imageUrl}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-muted-foreground text-sm">
                          Resim yok
                        </span>
                      </div>
                    )}
                    <div className="absolute top-3 right-3">
                      <span className="px-3 py-1 bg-primary/90 text-primary-foreground text-xs font-medium rounded-full">
                        {categories.find((c) => c.id === product.categoryId)
                          ?.name ?? ""}
                      </span>
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {product.name}
                    </h3>
                    {product.description && (
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                        {product.description}
                      </p>
                    )}
                    <div className="flex items-center justify-between">
                      <span
                        className={`text-sm font-medium ${
                          product.inStock ? "text-green-500" : "text-red-500"
                        }`}
                      >
                        {product.inStock ? "Stokta Var" : "Tükendi"}
                      </span>
                      {product.price ? (
                        <span className="text-primary font-semibold">
                          {product.price}
                        </span>
                      ) : (
                        <span className="text-muted-foreground text-sm">
                          Fiyat için arayın
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* İletişim Kutusu */}
          <div className="mt-16 bg-card border border-border rounded-xl p-8 text-center">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Fiyat Bilgisi
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Ürün fiyatları için lütfen bizimle iletişime geçin. Toptan ve
              perakende satış yapılmaktadır.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="tel:+905551234567"
                className="px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:opacity-90 transition-opacity"
              >
                Hemen Ara: +90 537 301 48 47
              </a>
              <a
                href="https://wa.me/905551234567"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-secondary text-secondary-foreground font-medium rounded-lg hover:bg-secondary/80 transition-colors"
              >
                WhatsApp ile Ulaş
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
