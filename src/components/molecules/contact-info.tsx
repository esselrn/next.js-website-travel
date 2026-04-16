import { Phone, Mail, MapPin } from 'lucide-react'

const contactData = [
  {
    city: 'Gianyar, Bali',
    phone: '+62858 6155 6201',
    email: 'info@nusatrip.id',
    address: 'Jl. Sukawati Gianyar No.99, Bali 80571'
  },
  {
    city: 'Denpasar, Bali',
    phone: '+62858 6155 6201',
    email: 'info@nusatrip.id',
    address: 'Jl. Niti Mandala, Renon, Bali 80225'
  }
]

export default function ContactInfo() {
  return (
    <div className="text-white">
      <p className="uppercase tracking-widest text-sm mb-4">Hubungi Kami</p>

      <h1 className="text-4xl lg:text-5xl font-bold leading-tight mb-16">
        Jangan Ragu Untuk <br />
        Menghubungi Kami
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {contactData.map((item) => (
          <div key={item.city}>
            <h3 className="font-semibold text-lg mb-4">{item.city}</h3>

            <ul className="space-y-3 text-sm text-white/90">
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-orange-400 mt-0.5" />
                <span>{item.phone}</span>
              </li>

              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-orange-400 mt-0.5" />
                <span>{item.email}</span>
              </li>

              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-orange-400 mt-0.5" />
                <span>{item.address}</span>
              </li>
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}
