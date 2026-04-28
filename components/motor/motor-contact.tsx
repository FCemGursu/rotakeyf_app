import { MapPin, Phone, Clock, AtSign } from "lucide-react"

const contactInfo = [
  {
    icon: MapPin,
    title: "Adres",
    content: "Ertuğrulgazi Mahallesi, Görsem Sokak 6/A, Tepebaşı, Eskişehir",
  },
  {
    icon: Phone,
    title: "Telefon",
    content: "+90 537 301 48 47",
  },
  {
    icon: Clock,
    title: "Çalışma Saatleri",
    content: "Pazartesi - Cuma\n11:00 - 20:00\n\nCumartesi - Pazar\nİletişime Geçiniz",
  },
  {
    icon: AtSign,
    title: "Sosyal Medya",
    content: "@rotakeyfcafe",
  },
]

export function MotorContact() {
  return (
    <section className="py-16 px-4 bg-black border-t border-border">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            İletişim
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-4" />
          <p className="text-gray-400 max-w-xl mx-auto">
            Bize ulaşın, sorularınızı yanıtlayalım.
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
      </div>
    </section>
  )
}
