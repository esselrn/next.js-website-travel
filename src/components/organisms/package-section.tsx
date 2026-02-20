'use client'

import { useEffect, useState } from 'react'
import PackageCard from '@/components/organisms/package-card'
import { getPackages } from '@/services/packages.service'

type Package = {
  id: string
  slug: string
  title: string
  image: string
  rating: number
  price: string
  duration: string
  summary: string
}

type Props = {
  variant?: 'home' | 'page'
}

export default function PackageSection({ variant = 'page' }: Props) {
  const [packages, setPackages] = useState<Package[]>([])

  useEffect(() => {
    getPackages().then(setPackages).catch(console.error)
  }, [])

  if (variant === 'home') {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 space-y-20">
          {packages.slice(0, 2).map((item) => (
            <PackageCard key={item.id} {...item} variant="home" />
          ))}
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-[1440px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        {packages.map((item) => (
          <PackageCard key={item.id} {...item} />
        ))}
      </div>
    </section>
  )
}