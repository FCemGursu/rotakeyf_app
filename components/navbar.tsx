"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { Menu, X } from "lucide-react"

import { usePathname } from "next/navigation"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const isMotorPage = pathname === "/motor"

  const cafeLinks = [
    { href: "#biz-kimiz", label: "Biz Kimiz" },
    { href: "#galeri", label: "Fotoğraflar" },
    { href: "#menu", label: "Menü" },
    { href: "#iletisim", label: "İletişim" },
  ]

  const motorLinks = [
    { href: "#hizmetlerimiz", label: "Hizmetlerimiz" },
    { href: "#urunlerimiz", label: "Ürünlerimiz" },
    { href: "#satilik-motosikletler", label: "Satılık Motosikletler" },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border overflow-visible">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-visible">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <img src="/alperem.png" alt="RotaKeyf" className="w-10 h-10 rounded-full object-cover" />
            <div className="relative w-28 h-8">
              <Image src="/rotayazı.png" alt="Rotakeyf" fill className="object-contain" priority />
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-2">
              <Link
                href="/"
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  !isMotorPage
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                RotaKeyf Cafe
              </Link>
              <Link
                href="/motor"
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isMotorPage
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                RotaKeyf Motor
              </Link>
            </div>

            {!isMotorPage && (
              <div className="flex items-center gap-6">
                {cafeLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            )}

            {isMotorPage && (
              <div className="flex items-center gap-6">
                {motorLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            )}
            <a
              href="https://www.instagram.com/rotakeyfmotocafe/"
              target="_blank"
              rel="noopener noreferrer"
              className="group hidden md:inline-flex w-12 hover:w-48 h-10 bg-gradient-to-r from-purple-900 via-pink-900 to-rose-800 hover:from-purple-700 hover:via-pink-700 hover:to-rose-600 relative rounded text-white duration-700 font-bold justify-start gap-2 items-center p-2 overflow-hidden border border-white/10"
              aria-label="Instagram"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 h-6 shrink-0 fill-white">
                <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z" />
              </svg>
              <span className="origin-left inline-flex duration-100 group-hover:duration-300 group-hover:delay-300 opacity-0 group-hover:opacity-100 border-l-2 border-white/50 px-1 transform scale-x-0 group-hover:scale-x-100 transition-all whitespace-nowrap text-sm">
                rotakeyfmotocafe
              </span>
            </a>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="https://www.instagram.com/rotakeyfmotocafe/"
              target="_blank"
              rel="noopener noreferrer"
              className="md:hidden inline-flex w-10 h-10 bg-gradient-to-r from-purple-900 via-pink-900 to-rose-800 rounded items-center justify-center border border-white/10"
              aria-label="Instagram"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5 shrink-0 fill-white">
                <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z" />
              </svg>
            </a>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 text-foreground"
              aria-label="Menüyü aç/kapat"
              >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-background border-b border-border">
          <div className="px-4 py-4 space-y-3">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className={`block px-4 py-2 rounded-lg text-sm font-medium ${
                !isMotorPage
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground"
              }`}
            >
              RotaKeyf Cafe
            </Link>
            <Link
              href="/motor"
              onClick={() => setIsOpen(false)}
              className={`block px-4 py-2 rounded-lg text-sm font-medium ${
                isMotorPage
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground"
              }`}
            >
              RotaKeyf Motor
            </Link>

            {!isMotorPage && (
              <div className="pt-3 border-t border-border space-y-2">
                {cafeLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="block px-4 py-2 text-sm text-muted-foreground hover:text-foreground"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            )}

            {isMotorPage && (
              <div className="pt-3 border-t border-border space-y-2">
                {motorLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="block px-4 py-2 text-sm text-muted-foreground hover:text-foreground"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
