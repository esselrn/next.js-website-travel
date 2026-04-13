'use client'

import Image from 'next/image'
import { useState } from 'react'

const gallery = [
  { country: 'Indonesia', title: 'Gunung Bromo', image: '/assets/paket-wisata/galeri/gallery1.jpg' },
  { country: 'Indonesia', title: 'Pantai Kelingking', image: '/assets/paket-wisata/galeri/gallery2.jpg' },
  { country: 'Indonesia', title: 'Pura Ulun Danu Beratan', image: '/assets/paket-wisata/galeri/gallery3.jpg' },
  { country: 'Indonesia', title: 'Candi Prambanan', image: '/assets/paket-wisata/galeri/gallery4.jpg' },
  { country: 'Indonesia', title: 'Labuan Bajo', image: '/assets/paket-wisata/galeri/gallery5.jpg' }
]

export default function DestinationGallerySection() {
  const [active, setActive] = useState<number | null>(null)

  return (
    <section className="w-full">
      <div className="flex w-full h-[600px] md:h-[900px]" onMouseLeave={() => setActive(null)}>
        {gallery.map((item, i) => {
          const isActive = active === i
          const isInactive = active !== null && !isActive

          return (
            <div
              key={item.title}
              className="relative overflow-hidden cursor-pointer transition-all duration-700 ease-in-out"
              style={{ flex: isActive ? 5 : isInactive ? 0.4 : 1 }}
              onMouseEnter={() => setActive(i)}
              onClick={() => setActive(active === i ? null : i)}
            >
              <Image src={item.image} alt={item.title} fill className="object-cover" priority={i === 0} />

              {/* Overlay */}
              <div
                className="absolute inset-0 transition-all duration-700"
                style={{
                  background: isActive
                    ? 'linear-gradient(to top, rgba(11,44,77,0.75) 0%, rgba(11,44,77,0.15) 60%, transparent 100%)'
                    : 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.1) 70%, transparent 100%)'
                }}
              />

              {/* Text — always bottom-right, vertical when collapsed, horizontal when active */}
              <div className="absolute bottom-0 right-0 z-10 p-4 md:p-6 transition-all duration-700">
                {isActive ? (
                  /* EXPANDED: text horizontal bottom */
                  <div className="text-white transition-all duration-500">
                    <p className="text-xs uppercase tracking-[0.3em] text-white/60 mb-2">{item.country}</p>
                    <h3 className="font-montserrat font-bold text-2xl md:text-4xl leading-tight max-w-[280px]">
                      {item.title}
                    </h3>
                  </div>
                ) : (
                  /* COLLAPSED: text vertical bottom-right */
                  <div
                    className="text-white flex flex-col items-end"
                    style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
                  >
                    <p className="text-xs md:text-sm uppercase tracking-widest text-white/60 mb-1">{item.country}</p>
                    <h3 className="font-montserrat font-semibold text-base md:text-xl leading-snug">{item.title}</h3>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}