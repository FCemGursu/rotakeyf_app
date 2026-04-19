import Link from "next/link"
import Image from "next/image"

export function Footer() {
  return (
    <footer className="py-8 px-4 border-t border-border">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <Link href="/" className="relative w-32 h-9 block">
            <Image src="/rotayazı.png" alt="Rotakeyf" fill className="object-contain" />
          </Link>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} RotaKeyf. Tüm hakları saklıdır.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Cafe
            </Link>
            <Link
              href="/motor"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Motor
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
