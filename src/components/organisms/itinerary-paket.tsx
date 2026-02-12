import { SectionTitle } from "@/components/molecules/section/section-title"
import { Map } from "lucide-react"

export default function Itinerary() {
  const days = [
    {
      title: "Hari 1 – Kedatangan & Arborek",
      detail:
        "Peserta tiba di Raja Ampat dan dijemput oleh tim lokal. Perjalanan dilanjutkan menuju Desa Arborek untuk menikmati suasana pulau, berinteraksi dengan warga setempat, serta berfoto di dermaga ikonik dengan pemandangan laut yang jernih.",
    },
    {
      title: "Hari 2 – Pianemo & Telaga Bintang",
      detail:
        "Kegiatan dimulai dengan perjalanan menuju Pianemo untuk menikmati panorama gugusan pulau karst dari atas bukit. Selanjutnya mengunjungi Telaga Bintang yang terkenal dengan bentuknya yang unik, serta menikmati aktivitas wisata bahari dan fotografi.",
    },
    {
      title: "Hari 3 – Wayag & Pulau Karst",
      detail:
        "Eksplorasi kawasan Wayag yang menjadi ikon Raja Ampat dengan pemandangan pulau karst yang spektakuler. Peserta diajak trekking ringan untuk menikmati pemandangan dari ketinggian sebelum kembali ke penginapan dan bersiap untuk kepulangan.",
    },
  ]

  return (
    <div className="mb-10">
      <SectionTitle icon={<Map size={18} />} title="Rencana Perjalanan" />

      <div className="w-full h-px bg-gray-200 mb-8" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10"></div>
      
      <div className="space-y-3">
        {days.map((day, i) => (
          <details key={i} className="border rounded-lg px-5 py-4 shadow-sm cursor-pointer">
            <summary className="font-medium text-sm text-[#0B2C4D]">{day.title}</summary>

            <p className="mt-3 text-sm text-gray-600 leading-relaxed">{day.detail}</p>
          </details>
        ))}
      </div>
    </div>
  )
}