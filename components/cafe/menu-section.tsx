type MenuItem = {
  id: number
  name: string
  price?: string | null
  description?: string | null
  imageUrl?: string | null
}

type MenuCategory = {
  id: number
  name: string
  products: MenuItem[]
}

export function MenuSection({ categories }: { categories: MenuCategory[] }) {
  if (categories.length === 0) {
    return (
      <section id="menu" className="py-24 px-4 scroll-mt-16">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Menü
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-8" />
          <p className="text-muted-foreground">
            Menü yakında güncellenecek.
          </p>
        </div>
      </section>
    )
  }

  return (
    <section id="menu" className="py-24 px-4 scroll-mt-16">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Menü
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-8" />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Özenle hazırlanmış içecek ve atıştırmalıklarımız
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {categories.map((category) => (
            <div
              key={category.id}
              className="bg-card border border-border rounded-xl p-6"
            >
              <h3 className="text-xl font-semibold text-primary mb-6 text-center">
                {category.name}
              </h3>
              {category.products.length === 0 ? (
                <p className="text-center text-muted-foreground text-sm">
                  Ürün eklenmedi
                </p>
              ) : (
                <div className="space-y-4">
                  {category.products.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between gap-3"
                    >
                      {item.imageUrl && (
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                        />
                      )}
                      <span className="text-foreground flex-1">{item.name}</span>
                      {item.price && (
                        <span className="text-muted-foreground text-sm">
                          {item.price}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
