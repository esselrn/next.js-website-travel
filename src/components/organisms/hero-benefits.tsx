import { Users, BadgeDollarSign, Headphones } from 'lucide-react'

const benefits = [
  {
    icon: <Users className="w-6 h-6 text-[#FB8C00]" />,
    title: 'Pemandu Lokal',
    desc: 'Didampingi oleh pemandu wisata berpengalaman yang mengenal setiap destinasi dengan baik.'
  },
  {
    icon: <BadgeDollarSign className="w-6 h-6 text-[#FB8C00]" />,
    title: 'Harga Terjangkau',
    desc: 'Harga transparan dan fleksibel, tanpa biaya tersembunyi untuk perjalanan yang lebih tenang.'
  },
  {
    icon: <Headphones className="w-6 h-6 text-[#FB8C00]" />,
    title: 'Layanan Responsif',
    desc: 'Tim kami siap membantu sebelum dan selama perjalanan Anda 24 jam penuh.'
  }
]

export default function HeroBenefits() {
  return (
    <div className="w-full bg-[#0B2C4D]">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/10">
        {benefits.map((item, index) => (
          <div key={index} className="flex items-start gap-4 px-10 py-8">
            <div className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center shrink-0">{item.icon}</div>
            <div>
              <p className="text-white font-montserrat font-bold text-lg mb-1">{item.title}</p>
              <p className="text-white/70 text-sm font-inter leading-relaxed">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}