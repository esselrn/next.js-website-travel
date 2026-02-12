import { SectionTitle } from '@/components/molecules/section/section-title'
import { Map } from 'lucide-react'

export default function Itinerary() {
  const itinerary = [
    {
      time: '09.00 – 10.00',
      title: 'Penjemputan & Perjalanan',
      detail:
        'Penjemputan peserta di hotel atau titik temu yang telah disepakati, kemudian perjalanan menuju kawasan wisata.'
    },
    {
      time: '10.00 – 13.00',
      title: 'Eksplorasi Candi Prambanan',
      detail:
        'Mengunjungi kompleks Candi Prambanan, berkeliling area candi, berfoto, serta menikmati penjelasan sejarah dan budaya.'
    },
    {
      time: '13.00 – 15.00',
      title: 'Waktu Bebas',
      detail: 'Waktu bebas untuk makan siang, istirahat, atau menjelajahi area sekitar candi secara mandiri.'
    },
    {
      time: '15.00',
      title: 'Kembali ke Hotel',
      detail: 'Perjalanan kembali menuju hotel atau lokasi pengantaran awal. Program wisata selesai.'
    }
  ]

  return (
    <div className="mb-10">
      <SectionTitle icon={<Map size={18} />} title="Rencana Perjalanan" />

      <div className="w-full h-px bg-gray-200 mb-8" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10"></div>

      <div className="space-y-3">
        {itinerary.map((item, i) => (
          <details key={i} className="border rounded-lg px-5 py-4 shadow-sm cursor-pointer">
            <summary className="flex justify-between items-center font-medium text-sm text-[#0B2C4D]">
              <span>
                {item.time} | {item.title}
              </span>
            </summary>

            <p className="mt-3 text-sm text-gray-600 leading-relaxed">{item.detail}</p>
          </details>
        ))}
      </div>
    </div>
  )
}
