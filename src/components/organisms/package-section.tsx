// src/components/organisms/package-section.tsx
'use client'

import PackageCard from '@/components/organisms/package-card'
import type { Package } from '@/types/packages'

type Props = {
  packages: Package[]
  variant?: 'home' | 'page'
}

export default function PackageSection({ packages, variant = 'page' }: Props) {
  if (!packages || packages.length === 0) {
    return <p className="text-center py-20">Belum ada paket wisata</p>
  }

  // HOME — tidak diubah
  if (variant === 'home') {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0B2C4D]">Paket Wisata Eksklusif NusaTrip</h2>
            <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
              Pilihan paket perjalanan terbaik untuk menikmati keindahan Indonesia.
            </p>
          </div>
          <div className="space-y-20">
            {packages.slice(0, 2).map((item) => (
              <PackageCard key={item.id} {...item} variant="home" />
            ))}
          </div>
        </div>
      </section>
    )
  }

  // PAGE — 2 besar + 3 kecil
  const featured = packages.slice(0, 2)
  const regular = packages.slice(2, 5)

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-[1440px] mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="font-montserrat text-3xl md:text-4xl text-[#0B2C4D] mb-4">Paket Wisata Pilihan</h2>
          <p className="text-gray-600">Temukan paket wisata terbaik untuk liburanmu</p>
        </div>

        {/* 2 BESAR */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {featured.map((item) => (
            <PackageCard key={item.id} {...item} variant="page" />
          ))}
        </div>

        {/* 3 KECIL */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {regular.map((item) => (
            <PackageCard key={item.id} {...item} variant="page" />
          ))}
        </div>
      </div>
    </section>
  )
}
