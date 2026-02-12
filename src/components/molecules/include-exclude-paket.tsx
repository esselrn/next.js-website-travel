import { SectionTitle } from '@/components/molecules/section/section-title'
import { CheckIcon } from '@/components/atoms/icons/check-icon'
import { CloseIcon } from '@/components/atoms/icons/close-icon'
import { IconListItem } from '@/components/molecules/list/icon-list-item'
import { Users } from 'lucide-react'

export default function IncludeExcludeSection() {
  return (
    <div className="mb-12">
      <SectionTitle icon={<Users size={18} />} title="Termasuk & Tidak Termasuk" />

      <div className="w-full h-px bg-gray-200 mb-8" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* INCLUDE */}
        <div>
          <h4 className="font-semibold text-[#0B2C4D] mb-4">Termasuk</h4>

          <ul className="space-y-3">
            {['Transportasi laut (Speed Boat)', 'Penginapan', 'Makan 3x sehari', 'Tiket masuk wisata'].map((item, i) => (
              <IconListItem key={i} icon={<CheckIcon />} text={item} />
            ))}
          </ul>
        </div>

        {/* EXCLUDE */}
        <div>
          <h4 className="font-semibold text-[#0B2C4D] mb-4">Tidak Termasuk</h4>

          <ul className="space-y-3">
            {['Tiket pesawat PP', 'Pengeluaran pribadi', 'Asuransi perjalanan'].map((item, i) => (
              <IconListItem key={i} icon={<CloseIcon />} text={item} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
