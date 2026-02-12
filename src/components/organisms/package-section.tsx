'use client'

import { useEffect, useState } from 'react'
import PackageCard from '@/components/organisms/package-card'
import { getPackages } from '@/services/packages.service'

type Package = {
  id: number
  title: string
  image: string
  rating: number
  price: string
  duration: string
  desc: string
}

type Props = {
  variant?: 'home' | 'page'
}

export default function PackageSection({ variant = 'page' }: Props) {
  const [packages, setPackages] = useState<Package[]>([])

  useEffect(() => {
    getPackages().then(setPackages).catch(console.error)
  }, [])

  // 🏠 HOME
  if (variant === 'home') {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0A2540]">Paket Wisata Eksklusif NusaTrip</h2>
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

  // 📦 PAGE
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-[1440px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {packages.map((item) => (
            <PackageCard key={item.id} {...item} />
          ))}
        </div>
      </div>
    </section>
  )
}
