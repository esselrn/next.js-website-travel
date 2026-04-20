'use client'

import type { Destination } from '@/types/destinations'

type Props = {
  destination: Destination
}

export default function DestinationHeroSection({ destination }: Props) {
  const rating = destination.rating
  const fullStars = Math.floor(rating) // javascript
  const hasHalf = rating % 1 >= 0.5

  const handleScroll = () => {
    document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })
  }

  return ( // tailwind
    <section className="mb-10">
      <div className="flex items-start justify-between gap-4 mb-2"> 
        <div> 
          <h1 className="text-xl md:text-3xl font-bold text-[#0B2C4D]">{destination.name}</h1> 
          <div className="flex items-center gap-1 mt-1">
            <span className="text-sm font-semibold text-[#0B2C4D]">{rating.toFixed(1)}</span>
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => {
                if (i < fullStars)
                  return (
                    <svg key={i} className="w-4 h-4 text-orange-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118L10 14.347l-3.35 2.438c-.784.57-1.838-.197-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.664 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.285-3.957z" />
                    </svg>
                  )
                if (i === fullStars && hasHalf)
                  return (
                    <svg key={i} className="w-4 h-4 text-orange-400" fill="currentColor" viewBox="0 0 20 20">
                      <defs>
                        <linearGradient id="half">
                          <stop offset="50%" stopColor="currentColor" />
                          <stop offset="50%" stopColor="#D1D5DB" />
                        </linearGradient>
                      </defs>
                      <path
                        fill="url(#half)"
                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118L10 14.347l-3.35 2.438c-.784.57-1.838-.197-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.664 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.285-3.957z"
                      />
                    </svg>
                  )
                return (
                  <svg key={i} className="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118L10 14.347l-3.35 2.438c-.784.57-1.838-.197-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.664 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.285-3.957z" />
                  </svg>
                )
              })}
            </div>
          </div>
          <div className="flex items-center gap-1 mt-1 text-gray-500 text-sm">
            <svg className="w-4 h-4 text-orange-400" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                clipRule="evenodd"
              />
            </svg>
            <span>{destination.location}</span>
          </div>
        </div>

        <div className="flex flex-col items-end gap-3 shrink-0">
          <p className="text-lg md:text-2xl font-bold text-[#0B2C4D]">
            Rp. {Number(destination.price_per_person).toLocaleString('id-ID')}{' '}
            <span className="text-sm font-normal text-gray-500">/ Orang</span>
          </p>
          <button
            onClick={handleScroll}
            className="bg-[#F36F21] hover:bg-orange-600 text-white font-semibold px-5 py-2.5 rounded-lg transition text-sm"
          >
            PESAN SEKARANG →
          </button>
        </div>
      </div>
      <div className="w-full h-px bg-gray-200 mt-6" />
    </section>
  )
}