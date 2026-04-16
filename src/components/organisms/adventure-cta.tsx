'use client'

import Image from 'next/image'
import { useState } from 'react'
import Button from '@/components/atoms/button'

export default function AdventureCTA() {
  const [showVideo, setShowVideo] = useState(false)

  return (
    <>
      <section className="relative w-full h-[560px] flex items-center overflow-hidden">
        <Image src="/assets/homepage/raja-ampat.jpg" alt="Adventure NusaTrip" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-[#0B2C4D]/65" />

        <div className="relative z-10 max-w-[1440px] mx-auto px-6 w-full">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:pr-32">
            {/* TEXT */}
            <div className="max-w-[520px] text-white">
              <span className="text-xs tracking-[0.3em] text-[#FB8C00] uppercase font-semibold mb-3 block">
                Petualangan Menanti Anda
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 font-montserrat leading-snug">
                Jelajahi Petualangan Terbaik Bersama NusaTrip
              </h2>
              <p className="text-white/80 mb-8 leading-relaxed">
                Nikmati pengalaman wisata terbaik ke berbagai destinasi favorit Indonesia. Dari Bali hingga Labuan Bajo,
                NusaTrip menghadirkan perjalanan yang nyaman, aman, dan berkesan.
              </p>
              <Button href="/paket-wisata">JELAJAHI PAKET →</Button>
            </div>

            {/* PLAY BUTTON */}
            <div className="flex flex-col items-center gap-4 shrink-0">
              <button
                onClick={() => setShowVideo(true)}
                className="group relative w-24 h-24 rounded-full flex items-center justify-center focus:outline-none"
                aria-label="Tonton Video"
              >
                <span className="absolute inline-flex w-full h-full rounded-full bg-white/20 animate-ping [animation-duration:2s]" />
                <span className="absolute inline-flex w-[85%] h-[85%] rounded-full bg-white/10 animate-ping [animation-duration:2s] [animation-delay:0.6s]" />
                <span className="relative z-10 w-20 h-20 rounded-full bg-white/20 group-hover:bg-[#FB8C00] border-2 border-white/60 flex items-center justify-center transition duration-300 shadow-xl backdrop-blur-sm">
                  <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
              </button>
              <p className="text-white text-sm tracking-wide font-semibold">Tonton Video</p>
            </div>
          </div>
        </div>
      </section>

      {/* VIDEO MODAL */}
      {showVideo && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={() => setShowVideo(false)}
        >
          <div
            className="relative w-full max-w-3xl aspect-video rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              src="https://www.youtube.com/embed/aKtb7Y3qOck?autoplay=1&mute=1&rel=0" // Tambahkan mute=1
              title="Wonderland Indonesia"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" // Tambahkan list allow yang lengkap
              allowFullScreen
              className="w-full h-full border-none"
              referrerPolicy="strict-origin-when-cross-origin" 
            />
            <button
              onClick={() => setShowVideo(false)}
              className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center transition text-lg font-bold"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </>
  )
}