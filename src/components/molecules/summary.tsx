import { SectionTitle } from '@/components/molecules/section/section-title'
import { FileText } from 'lucide-react'

export default function Summary() {
  return (
    <div className="mb-10">
      <SectionTitle icon={<FileText size={18} />} title="Ringkasan" />

      <div className="w-full h-px bg-gray-200 mb-8" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10"></div>

      <p className="text-gray-600 text-sm leading-relaxed">
        Candi Prambanan merupakan kompleks candi Hindu terbesar di Indonesia yang dibangun pada abad ke-9 pada masa Kerajaan
        Mataram Kuno. Destinasi ini terkenal dengan arsitektur megah yang menjulang tinggi, detail relief yang mengisahkan
        cerita Ramayana, serta nilai sejarah dan budaya yang sangat tinggi. Keindahan dan kemegahan Candi Prambanan
        menjadikannya salah satu ikon wisata budaya paling penting di Yogyakarta dan Indonesia.
        <br />
        <br />
        Selama kunjungan, wisatawan dapat menikmati keindahan kawasan candi, berkeliling kompleks sambil berfoto, serta
        mempelajari sejarah dan filosofi peradaban Jawa kuno yang sarat makna. Suasana yang tenang, area yang luas, serta
        latar pemandangan yang memukau membuat pengalaman berwisata di Candi Prambanan terasa lebih berkesan, baik bagi
        wisatawan lokal maupun mancanegara.
      </p>
    </div>
  )
}
