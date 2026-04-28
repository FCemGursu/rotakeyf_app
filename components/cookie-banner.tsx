"use client"

import { useEffect, useState } from "react"
import { Cookie } from "lucide-react"

export function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent")
    if (!consent) setVisible(true)
  }, [])

  function accept() {
    localStorage.setItem("cookie-consent", "accepted")
    setVisible(false)
  }

  function reject() {
    localStorage.setItem("cookie-consent", "rejected")
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6">
      <div className="max-w-4xl mx-auto bg-card border border-border rounded-2xl shadow-2xl shadow-black/40 p-5 md:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex items-start gap-3 flex-1">
          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center shrink-0 mt-0.5">
            <Cookie className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground mb-1">
              Çerez Bildirimi
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Sitemizi daha iyi bir deneyim sunmak amacıyla çerezler
              kullanıyoruz. Kabul ederek çerez politikamızı onaylamış
              olursunuz.
            </p>
          </div>
        </div>

        <div className="flex gap-3 shrink-0 w-full sm:w-auto">
          <button
            onClick={reject}
            className="flex-1 sm:flex-none px-5 py-2.5 rounded-lg border border-border text-sm font-medium text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors"
          >
            Reddet
          </button>
          <button
            onClick={accept}
            className="flex-1 sm:flex-none px-5 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
          >
            Kabul Et
          </button>
        </div>
      </div>
    </div>
  )
}
