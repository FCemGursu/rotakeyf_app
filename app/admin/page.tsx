"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import {
  Loader2,
  Plus,
  Trash2,
  Edit2,
  LogOut,
  Coffee,
  Bike,
  Upload,
  X,
  CheckCircle2,
  XCircle,
} from "lucide-react"

type Category = {
  id: number
  name: string
  type: string
  products: Product[]
}

type Product = {
  id: number
  name: string
  description?: string | null
  price?: string | null
  imageUrl?: string | null
  inStock: boolean
  categoryId: number
}

type ProductForm = {
  name: string
  description: string
  price: string
  imageUrl: string
  inStock: boolean
}

const emptyForm: ProductForm = {
  name: "",
  description: "",
  price: "",
  imageUrl: "",
  inStock: true,
}

type MotorListing = {
  id: number
  name: string
  imageUrl: string
  link: string
}

type ListingForm = {
  name: string
  imageUrl: string
  link: string
}

const emptyListingForm: ListingForm = {
  name: "",
  imageUrl: "",
  link: "",
}

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<"cafe" | "motor" | "satis">("cafe")
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  )
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)
  const [productLoading, setProductLoading] = useState(false)

  const [showAddCategory, setShowAddCategory] = useState(false)
  const [categoryName, setCategoryName] = useState("")
  const [savingCategory, setSavingCategory] = useState(false)

  const [showProductModal, setShowProductModal] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [productForm, setProductForm] = useState<ProductForm>(emptyForm)
  const [uploadingImage, setUploadingImage] = useState(false)
  const [savingProduct, setSavingProduct] = useState(false)

  const [motorListings, setMotorListings] = useState<MotorListing[]>([])
  const [listingsLoading, setListingsLoading] = useState(false)
  const [showListingModal, setShowListingModal] = useState(false)
  const [editingListing, setEditingListing] = useState<MotorListing | null>(null)
  const [listingForm, setListingForm] = useState<ListingForm>(emptyListingForm)
  const [savingListing, setSavingListing] = useState(false)
  const [uploadingListingImage, setUploadingListingImage] = useState(false)

  const fetchMotorListings = useCallback(async () => {
    setListingsLoading(true)
    try {
      const res = await fetch("/api/motor-listings")
      const data = await res.json()
      setMotorListings(data)
    } finally {
      setListingsLoading(false)
    }
  }, [])

  const fetchCategories = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch(`/api/categories?type=${activeTab === "satis" ? "motor" : activeTab}`)
      const data = await res.json()
      setCategories(data)
    } finally {
      setLoading(false)
    }
    setSelectedCategory(null)
    setProducts([])
  }, [activeTab])

  const fetchProducts = useCallback(async (categoryId: number) => {
    setProductLoading(true)
    try {
      const res = await fetch(`/api/products?categoryId=${categoryId}`)
      const data = await res.json()
      setProducts(data)
    } finally {
      setProductLoading(false)
    }
  }, [])

  useEffect(() => {
    if (activeTab === "satis") {
      fetchMotorListings()
    } else {
      fetchCategories()
    }
  }, [activeTab, fetchCategories, fetchMotorListings])

  const handleCategorySelect = (cat: Category) => {
    setSelectedCategory(cat)
    fetchProducts(cat.id)
  }

  const handleAddCategory = async () => {
    if (!categoryName.trim()) return
    setSavingCategory(true)
    const res = await fetch("/api/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: categoryName.trim(), type: activeTab }),
    })
    setSavingCategory(false)
    if (res.ok) {
      setCategoryName("")
      setShowAddCategory(false)
      fetchCategories()
    }
  }

  const handleDeleteCategory = async (id: number) => {
    if (
      !confirm(
        "Bu kategoriyi ve içindeki tüm ürünleri silmek istediğinizden emin misiniz?"
      )
    )
      return
    await fetch(`/api/categories/${id}`, { method: "DELETE" })
    if (selectedCategory?.id === id) {
      setSelectedCategory(null)
      setProducts([])
    }
    fetchCategories()
  }

  const handleImageUpload = async (file: File): Promise<string> => {
    setUploadingImage(true)
    try {
      const formData = new FormData()
      formData.append("file", file)
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })
      const data = await res.json()
      return data.url
    } finally {
      setUploadingImage(false)
    }
  }

  const openAddProduct = () => {
    setEditingProduct(null)
    setProductForm(emptyForm)
    setShowProductModal(true)
  }

  const openEditProduct = (product: Product) => {
    setEditingProduct(product)
    setProductForm({
      name: product.name,
      description: product.description ?? "",
      price: product.price ?? "",
      imageUrl: product.imageUrl ?? "",
      inStock: product.inStock,
    })
    setShowProductModal(true)
  }

  const handleSaveProduct = async () => {
    if (!productForm.name.trim() || !selectedCategory) return
    setSavingProduct(true)

    const url = editingProduct
      ? `/api/products/${editingProduct.id}`
      : "/api/products"
    const method = editingProduct ? "PUT" : "POST"

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...productForm,
        categoryId: selectedCategory.id,
      }),
    })

    setSavingProduct(false)
    setShowProductModal(false)
    setEditingProduct(null)
    setProductForm(emptyForm)
    fetchProducts(selectedCategory.id)
  }

  const handleDeleteProduct = async (id: number) => {
    if (!confirm("Bu ürünü silmek istediğinizden emin misiniz?")) return
    await fetch(`/api/products/${id}`, { method: "DELETE" })
    if (selectedCategory) fetchProducts(selectedCategory.id)
  }

  const openAddListing = () => {
    setEditingListing(null)
    setListingForm(emptyListingForm)
    setShowListingModal(true)
  }

  const openEditListing = (listing: MotorListing) => {
    setEditingListing(listing)
    setListingForm({ name: listing.name, imageUrl: listing.imageUrl, link: listing.link })
    setShowListingModal(true)
  }

  const handleSaveListing = async () => {
    if (!listingForm.name.trim() || !listingForm.imageUrl.trim() || !listingForm.link.trim()) return
    setSavingListing(true)
    const url = editingListing ? `/api/motor-listings/${editingListing.id}` : "/api/motor-listings"
    const method = editingListing ? "PUT" : "POST"
    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(listingForm),
    })
    setSavingListing(false)
    setShowListingModal(false)
    setEditingListing(null)
    setListingForm(emptyListingForm)
    fetchMotorListings()
  }

  const handleDeleteListing = async (id: number) => {
    if (!confirm("Bu ilanı silmek istediğinizden emin misiniz?")) return
    await fetch(`/api/motor-listings/${id}`, { method: "DELETE" })
    fetchMotorListings()
  }

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" })
    window.location.href = "/admin/login"
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-card border-b border-border px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <Coffee className="w-5 h-5 text-primary" />
            <Bike className="w-5 h-5 text-primary" />
          </div>
          <h1 className="text-xl font-bold text-foreground">RotaKeyf Admin</h1>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground hover:text-foreground border border-border rounded-lg hover:border-primary/50 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Çıkış
        </button>
      </header>

      {/* Tabs */}
      <div className="bg-card/50 border-b border-border px-6">
        <div className="max-w-7xl mx-auto flex gap-1 pt-3">
          <button
            onClick={() => setActiveTab("cafe")}
            className={`flex items-center gap-2 px-6 py-3 rounded-t-lg text-sm font-medium transition-colors border-b-2 -mb-px ${
              activeTab === "cafe"
                ? "bg-background border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            <Coffee className="w-4 h-4" />
            Kafe Yönetimi
          </button>
          <button
            onClick={() => setActiveTab("motor")}
            className={`flex items-center gap-2 px-6 py-3 rounded-t-lg text-sm font-medium transition-colors border-b-2 -mb-px ${
              activeTab === "motor"
                ? "bg-background border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            <Bike className="w-4 h-4" />
            Motor Yönetimi
          </button>
          <button
            onClick={() => setActiveTab("satis")}
            className={`flex items-center gap-2 px-6 py-3 rounded-t-lg text-sm font-medium transition-colors border-b-2 -mb-px ${
              activeTab === "satis"
                ? "bg-background border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            <Bike className="w-4 h-4" />
            Satışlıklar
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Satışlıklar Tab */}
        {activeTab === "satis" ? (
          <div className="lg:col-span-3 bg-card border border-border rounded-xl p-5">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="font-semibold text-foreground">Motor Satışlıkları</h2>
                <p className="text-xs text-muted-foreground mt-0.5">{motorListings.length} ilan</p>
              </div>
              <button
                onClick={openAddListing}
                className="flex items-center gap-1 px-3 py-1.5 bg-primary text-primary-foreground rounded-lg text-sm hover:opacity-90 transition-opacity"
              >
                <Plus className="w-4 h-4" />
                İlan Ekle
              </button>
            </div>

            {listingsLoading ? (
              <div className="flex flex-col items-center justify-center py-16 gap-3">
                <div className="w-12 h-12 border-4 border-dashed rounded-full animate-spin border-primary" />
                <p className="text-muted-foreground text-sm">Yükleniyor...</p>
              </div>
            ) : motorListings.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-muted-foreground text-sm mb-3">Henüz ilan eklenmedi.</p>
                <button onClick={openAddListing} className="text-primary text-sm hover:underline">
                  İlk ilanı ekle →
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {motorListings.map((listing) => (
                  <div
                    key={listing.id}
                    className="flex items-center gap-4 p-4 bg-secondary rounded-xl border border-border"
                  >
                    <a
                      href={listing.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative w-24 h-24 rounded-lg overflow-hidden shrink-0 bg-muted block"
                    >
                      <Image src={listing.imageUrl} alt={listing.name} fill className="object-cover" />
                    </a>
                    <div className="flex-1 min-w-0">
                      <span className="font-medium text-foreground block truncate">{listing.name}</span>
                      <span className="text-xs text-muted-foreground">Resme tıklayarak ilana git</span>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => openEditListing(listing)}
                        className="p-2 text-muted-foreground hover:text-primary border border-border rounded-lg hover:border-primary/50 transition-colors"
                        title="Düzenle"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteListing(listing.id)}
                        className="p-2 text-muted-foreground hover:text-red-400 border border-border rounded-lg hover:border-red-400/50 transition-colors"
                        title="Sil"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
        <>
        {/* Kategoriler */}
        <div className="bg-card border border-border rounded-xl p-5 h-fit">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-foreground">Kategoriler</h2>
            <button
              onClick={() => {
                setShowAddCategory(!showAddCategory)
                setCategoryName("")
              }}
              className="flex items-center gap-1 px-3 py-1.5 bg-primary text-primary-foreground rounded-lg text-sm hover:opacity-90 transition-opacity"
            >
              <Plus className="w-4 h-4" />
              Ekle
            </button>
          </div>

          {/* Kategori Ekleme Formu */}
          {showAddCategory && (
            <div className="mb-4 p-4 bg-secondary rounded-lg border border-border">
              <p className="text-sm font-medium text-foreground mb-2">
                Yeni Kategori
              </p>
              <input
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                placeholder="Kategori adı"
                className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary mb-3 transition-colors"
                onKeyDown={(e) => e.key === "Enter" && handleAddCategory()}
                autoFocus
              />
              <div className="flex gap-2">
                <button
                  onClick={handleAddCategory}
                  disabled={!categoryName.trim() || savingCategory}
                  className="flex-1 py-2 bg-primary text-primary-foreground text-sm rounded-lg hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-1"
                >
                  {savingCategory ? (
                    <Loader2 className="w-3 h-3 animate-spin" />
                  ) : null}
                  Kaydet
                </button>
                <button
                  onClick={() => {
                    setShowAddCategory(false)
                    setCategoryName("")
                  }}
                  className="flex-1 py-2 border border-border text-sm text-muted-foreground rounded-lg hover:text-foreground hover:border-primary/50 transition-colors"
                >
                  İptal
                </button>
              </div>
            </div>
          )}

          {loading ? (
            <div className="flex flex-col items-center justify-center py-10 gap-3">
              <div className="w-10 h-10 border-4 border-dashed rounded-full animate-spin border-primary" />
            </div>
          ) : categories.length === 0 ? (
            <p className="text-center text-muted-foreground text-sm py-10">
              Henüz kategori yok.
            </p>
          ) : (
            <div className="space-y-2">
              {categories.map((cat) => (
                <div
                  key={cat.id}
                  onClick={() => handleCategorySelect(cat)}
                  className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${
                    selectedCategory?.id === cat.id
                      ? "bg-primary/10 border border-primary/40"
                      : "hover:bg-secondary border border-transparent"
                  }`}
                >
                  <div>
                    <span className="text-foreground font-medium text-sm">
                      {cat.name}
                    </span>
                    <span className="ml-2 text-xs text-muted-foreground">
                      ({cat.products.length} ürün)
                    </span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleDeleteCategory(cat.id)
                    }}
                    className="p-1.5 text-muted-foreground hover:text-red-400 transition-colors rounded"
                    title="Kategoriyi sil"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Ürünler */}
        <div className="lg:col-span-2 bg-card border border-border rounded-xl p-5">
          {!selectedCategory ? (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mb-4">
                {activeTab === "cafe" ? (
                  <Coffee className="w-8 h-8 text-muted-foreground" />
                ) : (
                  <Bike className="w-8 h-8 text-muted-foreground" />
                )}
              </div>
              <p className="text-muted-foreground">
                Ürünleri görüntülemek için sol taraftan bir kategori seçin
              </p>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h2 className="font-semibold text-foreground">
                    {selectedCategory.name}
                  </h2>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {products.length} ürün
                  </p>
                </div>
                <button
                  onClick={openAddProduct}
                  className="flex items-center gap-1 px-3 py-1.5 bg-primary text-primary-foreground rounded-lg text-sm hover:opacity-90 transition-opacity"
                >
                  <Plus className="w-4 h-4" />
                  Ürün Ekle
                </button>
              </div>

              {productLoading ? (
                <div className="flex flex-col items-center justify-center py-16 gap-3">
                  <div className="w-12 h-12 border-4 border-dashed rounded-full animate-spin border-primary" />
                  <p className="text-muted-foreground text-sm">Yükleniyor...</p>
                </div>
              ) : products.length === 0 ? (
                <div className="text-center py-16">
                  <p className="text-muted-foreground text-sm mb-3">
                    Bu kategoride henüz ürün yok.
                  </p>
                  <button
                    onClick={openAddProduct}
                    className="text-primary text-sm hover:underline"
                  >
                    İlk ürünü ekle →
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {products.map((product) => (
                    <div
                      key={product.id}
                      className="flex items-center gap-4 p-4 bg-secondary rounded-xl border border-border"
                    >
                      {/* Resim */}
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0 bg-muted">
                        {product.imageUrl ? (
                          <Image
                            src={product.imageUrl}
                            alt={product.name}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <span className="text-xs text-muted-foreground">
                              Resim
                              <br />
                              yok
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Bilgiler */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="font-medium text-foreground truncate">
                            {product.name}
                          </span>
                          {product.inStock ? (
                            <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                          ) : (
                            <XCircle className="w-4 h-4 text-red-500 shrink-0" />
                          )}
                        </div>
                        {product.description && (
                          <p className="text-xs text-muted-foreground truncate">
                            {product.description}
                          </p>
                        )}
                        {product.price && (
                          <p className="text-sm text-primary font-semibold mt-0.5">
                            {product.price}
                          </p>
                        )}
                      </div>

                      {/* Butonlar */}
                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => openEditProduct(product)}
                          className="p-2 text-muted-foreground hover:text-primary border border-border rounded-lg hover:border-primary/50 transition-colors"
                          title="Düzenle"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(product.id)}
                          className="p-2 text-muted-foreground hover:text-red-400 border border-border rounded-lg hover:border-red-400/50 transition-colors"
                          title="Sil"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
        </>
        )}
      </div>

      {/* Ürün Ekleme/Düzenleme Modal */}
      {showProductModal && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="text-lg font-semibold text-foreground">
                {editingProduct ? "Ürünü Düzenle" : "Yeni Ürün Ekle"}
              </h2>
              <button
                onClick={() => {
                  setShowProductModal(false)
                  setEditingProduct(null)
                }}
                className="p-1 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-5">
              {/* Ad */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  Ürün Adı <span className="text-primary">*</span>
                </label>
                <input
                  value={productForm.name}
                  onChange={(e) =>
                    setProductForm({ ...productForm, name: e.target.value })
                  }
                  placeholder="Örn: Cappuccino"
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary transition-colors"
                />
              </div>

              {/* Açıklama */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  Açıklama
                  <span className="text-muted-foreground text-xs ml-1">
                    (isteğe bağlı)
                  </span>
                </label>
                <textarea
                  value={productForm.description}
                  onChange={(e) =>
                    setProductForm({
                      ...productForm,
                      description: e.target.value,
                    })
                  }
                  placeholder="Ürün hakkında kısa açıklama"
                  rows={3}
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary resize-none transition-colors"
                />
              </div>

              {/* Fiyat */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  Fiyat
                  <span className="text-muted-foreground text-xs ml-1">
                    (isteğe bağlı)
                  </span>
                </label>
                <input
                  value={productForm.price}
                  onChange={(e) =>
                    setProductForm({ ...productForm, price: e.target.value })
                  }
                  placeholder="Örn: 75 ₺"
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary transition-colors"
                />
              </div>

              {/* Resim Yükleme */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  Ürün Resmi
                  <span className="text-muted-foreground text-xs ml-1">
                    (isteğe bağlı)
                  </span>
                </label>

                {productForm.imageUrl && (
                  <div className="relative w-full h-40 rounded-lg overflow-hidden mb-3 border border-border">
                    <Image
                      src={productForm.imageUrl}
                      alt="Önizleme"
                      fill
                      className="object-cover"
                    />
                    <button
                      onClick={() =>
                        setProductForm({ ...productForm, imageUrl: "" })
                      }
                      className="absolute top-2 right-2 p-1 bg-background/80 rounded-full text-foreground hover:bg-background transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}

                <label className="flex items-center justify-center gap-2 w-full px-3 py-4 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary/50 transition-colors">
                  {uploadingImage ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin text-primary" />
                      <span className="text-sm text-muted-foreground">
                        Yükleniyor...
                      </span>
                    </>
                  ) : (
                    <>
                      <Upload className="w-5 h-5 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        Resim Yükle (JPG, PNG, WEBP)
                      </span>
                    </>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    disabled={uploadingImage}
                    onChange={async (e) => {
                      const file = e.target.files?.[0]
                      if (file) {
                        const url = await handleImageUpload(file)
                        setProductForm({ ...productForm, imageUrl: url })
                      }
                      e.target.value = ""
                    }}
                  />
                </label>
              </div>

              {/* Stok Durumu */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Stok Durumu
                </label>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() =>
                      setProductForm({ ...productForm, inStock: true })
                    }
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
                      productForm.inStock
                        ? "bg-green-500/10 border-green-500/40 text-green-500"
                        : "bg-background border-border text-muted-foreground hover:border-green-500/40"
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    Stokta Var
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setProductForm({ ...productForm, inStock: false })
                    }
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
                      !productForm.inStock
                        ? "bg-red-500/10 border-red-500/40 text-red-400"
                        : "bg-background border-border text-muted-foreground hover:border-red-400/40"
                    }`}
                  >
                    <XCircle className="w-4 h-4" />
                    Tükendi
                  </button>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex gap-3 p-6 pt-0">
              <button
                onClick={handleSaveProduct}
                disabled={!productForm.name.trim() || savingProduct}
                className="flex-1 py-2.5 bg-primary text-primary-foreground font-medium rounded-lg hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2 transition-opacity"
              >
                {savingProduct && (
                  <Loader2 className="w-4 h-4 animate-spin" />
                )}
                {editingProduct ? "Değişiklikleri Kaydet" : "Ürünü Ekle"}
              </button>
              <button
                onClick={() => {
                  setShowProductModal(false)
                  setEditingProduct(null)
                }}
                className="flex-1 py-2.5 border border-border text-muted-foreground font-medium rounded-lg hover:text-foreground hover:border-primary/50 transition-colors"
              >
                İptal
              </button>
            </div>
          </div>
        </div>
      )}

      {/* İlan Ekleme/Düzenleme Modal */}
      {showListingModal && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-xl w-full max-w-lg">
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="text-lg font-semibold text-foreground">
                {editingListing ? "İlanı Düzenle" : "Yeni İlan Ekle"}
              </h2>
              <button
                onClick={() => { setShowListingModal(false); setEditingListing(null) }}
                className="p-1 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-5">
              {/* İsim */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  İsim <span className="text-primary">*</span>
                </label>
                <input
                  value={listingForm.name}
                  onChange={(e) => setListingForm({ ...listingForm, name: e.target.value })}
                  placeholder="Örn: Honda CB500F 2022"
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary transition-colors"
                />
              </div>

              {/* Resim Yükleme */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  Resim <span className="text-primary">*</span>
                </label>

                {listingForm.imageUrl && (
                  <div className="relative w-full h-40 rounded-lg overflow-hidden mb-3 border border-border">
                    <Image src={listingForm.imageUrl} alt="Önizleme" fill className="object-cover" />
                    <button
                      onClick={() => setListingForm({ ...listingForm, imageUrl: "" })}
                      className="absolute top-2 right-2 p-1 bg-background/80 rounded-full text-foreground hover:bg-background transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}

                <label className="flex items-center justify-center gap-2 w-full px-3 py-4 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary/50 transition-colors">
                  {uploadingListingImage ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin text-primary" />
                      <span className="text-sm text-muted-foreground">Yükleniyor...</span>
                    </>
                  ) : (
                    <>
                      <Upload className="w-5 h-5 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Resim Yükle (JPG, PNG, WEBP)</span>
                    </>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    disabled={uploadingListingImage}
                    onChange={async (e) => {
                      const file = e.target.files?.[0]
                      if (file) {
                        setUploadingListingImage(true)
                        try {
                          const url = await handleImageUpload(file)
                          setListingForm({ ...listingForm, imageUrl: url })
                        } finally {
                          setUploadingListingImage(false)
                        }
                      }
                      e.target.value = ""
                    }}
                  />
                </label>
              </div>

              {/* Link */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  Link <span className="text-primary">*</span>
                </label>
                <input
                  value={listingForm.link}
                  onChange={(e) => setListingForm({ ...listingForm, link: e.target.value })}
                  placeholder="https://www.sahibinden.com/..."
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary transition-colors"
                />
              </div>
            </div>

            <div className="flex gap-3 p-6 pt-0">
              <button
                onClick={handleSaveListing}
                disabled={!listingForm.name.trim() || !listingForm.imageUrl.trim() || !listingForm.link.trim() || savingListing}
                className="flex-1 py-2.5 bg-primary text-primary-foreground font-medium rounded-lg hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2 transition-opacity"
              >
                {savingListing && <Loader2 className="w-4 h-4 animate-spin" />}
                {editingListing ? "Değişiklikleri Kaydet" : "İlanı Ekle"}
              </button>
              <button
                onClick={() => { setShowListingModal(false); setEditingListing(null) }}
                className="flex-1 py-2.5 border border-border text-muted-foreground font-medium rounded-lg hover:text-foreground hover:border-primary/50 transition-colors"
              >
                İptal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
