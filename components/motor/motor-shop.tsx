"use client"

import { useState } from "react"
import Image from "next/image"
import { Settings } from "lucide-react"

type SubCategory = {
  id: number
  name: string
}

type Product = {
  id: number
  name: string
  description?: string | null
  price?: string | null
  imageUrl?: string | null
  inStock: boolean
  categoryId: number
  subCategoryId?: number | null
}

type Category = {
  id: number
  name: string
  products: Product[]
  subCategories: SubCategory[]
}

export function MotorShop({ categories }: { categories: Category[] }) {
  const [activeCategory, setActiveCategory] = useState<number | null>(null)
  const [activeSubCategory, setActiveSubCategory] = useState<number | null>(null)

  const allProducts = categories.flatMap((c) => c.products)

  const activeCategoryData = activeCategory !== null
    ? categories.find((c) => c.id === activeCategory)
    : null

  const categoryProducts = activeCategory !== null
    ? activeCategoryData?.products ?? []
    : allProducts

  const displayedProducts = activeSubCategory !== null
    ? categoryProducts.filter((p) => p.subCategoryId === activeSubCategory)
    : categoryProducts

  const subCategories = activeCategoryData?.subCategories ?? []

  const handleCategoryClick = (id: number) => {
    setActiveCategory(id)
    setActiveSubCategory(null)
  }

  return (
    <>
      {/* Kategori Filtreleri */}
      <section className="py-14 px-4 bg-black border-t border-border">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">Ürünlerimiz</h2>
            <div className="w-20 h-1 bg-primary mx-auto mb-3" />
            <p className="text-gray-400 text-sm">Kategori seçerek ürünleri listeleyin</p>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryClick(category.id)}
                className={`relative px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200 ${
                  activeCategory === category.id
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30 scale-105"
                    : "bg-card border border-border text-muted-foreground hover:text-white hover:border-primary/60 hover:bg-primary/10"
                }`}
              >
                {category.name}
                {activeCategory === category.id && (
                  <span className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-primary rounded-full ring-2 ring-black" />
                )}
              </button>
            ))}
          </div>

          {/* Alt Kategori Filtreleri */}
          {subCategories.length > 0 && (
            <div className="mt-5 flex flex-wrap justify-center gap-2">
              <span className="flex items-center text-xs text-gray-500 mr-1">Marka:</span>
              {subCategories.map((sub) => (
                <button
                  key={sub.id}
                  onClick={() =>
                    setActiveSubCategory(
                      activeSubCategory === sub.id ? null : sub.id
                    )
                  }
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                    activeSubCategory === sub.id
                      ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                      : "bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-primary/40"
                  }`}
                >
                  {sub.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Ürün Grid */}
      <section className="py-14 px-4 bg-black">
        <div className="max-w-7xl mx-auto">

          {activeCategory === null ? (
            <div className="text-center py-20 border border-dashed border-border rounded-2xl">
              <div className="text-5xl mb-4">🏍️</div>
              <p className="text-white font-semibold text-lg mb-1">Kategori Seçin</p>
              <p className="text-gray-500 text-sm">Ürünleri görüntülemek için yukarıdan bir kategori seçin.</p>
            </div>
          ) : (
            <>
              {displayedProducts.length === 0 ? (
                <div className="text-center py-20">
                  <p className="text-muted-foreground text-lg">
                    Bu kategoride henüz ürün bulunmuyor.
                  </p>
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                  {displayedProducts.map((product) => (
                    <div
                      key={product.id}
                      className="group bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/60 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300"
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
                            <span className="text-muted-foreground text-sm">Resim yok</span>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="absolute top-3 left-3">
                          <span className="px-2.5 py-1 bg-black/60 backdrop-blur-sm text-white text-xs font-medium rounded-full border border-white/10">
                            {categories.find((c) => c.id === product.categoryId)?.name ?? ""}
                          </span>
                        </div>
                        <div className="absolute top-3 right-3">
                          <span className={`w-2.5 h-2.5 rounded-full block ring-2 ring-black ${product.inStock ? "bg-green-400" : "bg-red-400"}`} />
                        </div>
                      </div>

                      <div className="p-4">
                        <h3 className="text-sm font-semibold text-foreground mb-1 truncate">
                          {product.name}
                        </h3>
                        {product.description && (
                          <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                            {product.description}
                          </p>
                        )}
                        <div className="flex items-center justify-between mt-2">
                          <span className={`text-xs font-medium ${product.inStock ? "text-green-500" : "text-red-500"}`}>
                            {product.inStock ? "Stokta Var" : "Tükendi"}
                          </span>
                         
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* İletişim Kutusu */}
              <div className="mt-14 bg-card border border-border rounded-2xl p-8 text-center">
                <h3 className="text-2xl font-bold text-foreground mb-3">Fiyat Bilgisi</h3>
                <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed text-sm">
                  Ürün fiyatları için lütfen bizimle iletişime geçin. Toptan ve perakende satış yapılmaktadır.
                </p>
                <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
                  <a
                    href="tel:+905373014847"
                    className="px-6 py-3 bg-primary text-primary-foreground font-medium rounded-xl hover:opacity-90 transition-opacity text-sm"
                  >
                    Hemen Ara: +90 537 301 48 47
                  </a>
                  <a
                    href="https://wa.me/905373014847"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-secondary text-secondary-foreground font-medium rounded-xl hover:bg-secondary/80 transition-colors text-sm"
                  >
                    WhatsApp ile Ulaş
                  </a>
                </div>
              </div>
            </>
          )}
        </div>
      </section>
    </>
  )
}
