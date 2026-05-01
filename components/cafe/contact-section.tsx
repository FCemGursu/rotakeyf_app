import { MapPin, Phone, Clock, AtSign } from "lucide-react"

export function ContactSection() {
  const contactInfo = [
    {
      icon: MapPin,
      title: "Adres",
      content: "Ertuğrulgazi Mahallesi, Görsem Sokak 6/B,Tepebaşı, Eskişehir",
    },
    {
      icon: Phone,
      title: "Telefon",
      content: "+90 537 301 48 47",
    },
    {
      icon: Clock,
      title: "Çalışma Saatleri",
      content: "Pazartesi - Cuma\n10:30 - 23:30\n\nCumartesi - Pazar\n12:00 - 00:00",
    },
    {
      icon: AtSign,
      title: "Sosyal Medya",
      content: "@rotakeyfmotocafe",
    },
  ]

  return (
    <section id="iletisim" className="py-24 px-4 bg-card/50 scroll-mt-16">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            İletişim
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-8" />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Bize ulaşın
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactInfo.map((info, index) => (
            <div
              key={index}
              className="bg-card border border-border rounded-xl p-6 text-center hover:border-primary/50 transition-colors"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <info.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {info.title}
              </h3>
              <p className="text-muted-foreground whitespace-pre-line text-sm">
                {info.content}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-card border border-border rounded-xl overflow-hidden">
          <iframe
            src="https://maps.google.com/maps?q=39.772425,30.469766&z=16&output=embed"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          <a
            href="https://www.google.com/maps/dir/?api=1&destination=39.772425,30.469766"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-4 bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
          >
            <MapPin className="w-5 h-5" />
            Yol Tarifi Al
          </a>
        </div>
      </div>
    </section>
  )
}
