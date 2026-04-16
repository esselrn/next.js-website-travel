// src/components/molecules/include-exclude-paket.tsx
import { SectionTitle } from '@/components/molecules/section/section-title'
import { CheckIcon } from '@/components/atoms/icons/check-icon'
import { CloseIcon } from '@/components/atoms/icons/close-icon'
import { IconListItem } from '@/components/molecules/list/icon-list-item'
import { Users } from 'lucide-react'
import type { PackageInclude } from '@/types/packages'

type Props = {
  includes: PackageInclude[]
  excludes: PackageInclude[]
}

export default function IncludeExcludeSection({ includes, excludes }: Props) {
  return (
    <section className="mb-12">
      <SectionTitle icon={<Users size={18} />} title="Termasuk & Tidak Termasuk" />
      <div className="w-full h-px bg-gray-200 my-6" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <h4 className="font-semibold text-[#0B2C4D] mb-4">Termasuk</h4>
          <ul className="space-y-3">
            {includes.map((item) => (
              <IconListItem key={item.id} icon={<CheckIcon />} text={item.item} />
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-[#0B2C4D] mb-4">Tidak Termasuk</h4>
          <ul className="space-y-3">
            {excludes.map((item) => (
              <IconListItem key={item.id} icon={<CloseIcon />} text={item.item} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}