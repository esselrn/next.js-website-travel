// FooterSection.tsx
import Image from 'next/image'
import Link from 'next/link'

const footerLinks = {
  quickLinks: [
    { label: 'Beranda', href: '/' },
    { label: 'Tentang Kami', href: '/about' },
    { label: 'Paket Wisata', href: '/paket-wisata' },
    { label: 'Destinasi', href: '/destinasi' },
    { label: 'Kontak', href: '/kontak' }
  ],
  otherPages: [
    { label: 'Kebijakan Privasi', href: '#' },
    { label: 'Syarat & Ketentuan', href: '#' },
    { label: 'Disclaimer', href: '#' },
    { label: 'FAQ (Pertanyaan Umum)', href: '#' }
  ],
  contact: [
    { label: 'Jl. Niti Mandala, Renon, Bali 80225', href: '#' },
    { label: '+62 858 6155 6201', href: 'tel:+6285861556201' },
    { label: 'info@nusatrip.id', href: 'mailto:info@nusatrip.id' }
  ]
}

type Column = { title: string; links: { label: string; href: string }[] }

function FooterColumn({ title, links }: Column) {
  return (
    <div>
      <h4 className="font-montserrat font-semibold text-[#FB8C00] mb-4">{title}</h4>
      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.label}>
            <Link href={link.href} className="text-sm text-white/80 font-inter hover:text-[#FB8C00] transition">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

const gradientTextStyle = {
  background: 'linear-gradient(180deg, #FFD700 0%, #FF8C00 60%, #FF6000 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text'
}

export default function FooterSection() {
  return (
    <footer className="bg-[#0B2C4D] text-white w-full">
      <div className="max-w-[1440px] mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Image src="/assets/logo.png" alt="NusaTrip Logo" width={80} height={60} />
              <span
                className="font-montserrat font-bold text-xl tracking-widest whitespace-nowrap"
                style={gradientTextStyle}
              >
                NUSA TRIP
              </span>
            </div>
            <p className="font-inter text-sm text-white/80 leading-relaxed">
              NusaTrip adalah platform perjalanan yang menghadirkan destinasi wisata terbaik di Indonesia dengan pengalaman
              liburan yang aman, nyaman, dan berkesan.
            </p>
          </div>
          <FooterColumn title="Tautan Cepat" links={footerLinks.quickLinks} />
          <FooterColumn title="Halaman Lainnya" links={footerLinks.otherPages} />
          <FooterColumn title="Informasi Kontak" links={footerLinks.contact} />
        </div>
        <div className="border-t border-white/20 mt-16 pt-6 text-center">
          <p className="font-inter text-sm text-white/60">© 2025 NusaTrip. Seluruh hak cipta dilindungi.</p>
        </div>
      </div>
    </footer>
  )
}