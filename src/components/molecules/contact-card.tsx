import Image from 'next/image'
import { Phone, Mail, MessageCircle } from 'lucide-react'

export default function ContactCard({ name }: { name?: string }) {
  const waText = name
    ? `Halo, saya ingin bertanya tentang ${name}`
    : 'Halo, saya ingin bertanya tentang paket wisata NusaTrip'

  return (
    <div className="relative w-full rounded-xl overflow-hidden min-h-[200px]">
      <Image src="/assets/nusapenida01.jpg" alt="Contact Background" fill className="object-cover" />
      <div className="absolute inset-0 bg-[#0B2C4D]/85" />
      <div className="relative z-10 p-6 text-white">
        <h4 className="text-xl font-bold mb-2">Punya Pertanyaan?</h4>
        <p className="text-sm text-white/85 mb-5 leading-relaxed">
          Jangan ragu untuk menghubungi kami. Tim NusaTrip siap membantu perjalanan Anda.
        </p>
        <div className="space-y-3">
          <a
            href={`https://wa.me/6285861556201?text=${encodeURIComponent(waText)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 text-sm bg-green-500 hover:bg-green-600 transition px-4 py-2.5 rounded-lg font-semibold"
          >
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0">
              <MessageCircle size={14} />
            </div>
            <span>Chat via WhatsApp</span>
          </a>
          <a href="tel:+6285861556201" className="flex items-center gap-3 text-sm hover:text-orange-300 transition">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0">
              <Phone size={14} />
            </div>
            <span>+62858 6155 6201</span>
          </a>
          <a href="mailto:info@nusatrip.id" className="flex items-center gap-3 text-sm hover:text-orange-300 transition">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0">
              <Mail size={14} />
            </div>
            <span>info@nusatrip.id</span>
          </a>
        </div>
      </div>
    </div>
  )
}