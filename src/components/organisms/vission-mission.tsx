'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

const stats = [
  { value: 20, suffix: '+', label: 'Tahun Pengalaman' },
  { value: 2450, suffix: '+', label: 'Pelanggan Puas' },
  { value: 1250, suffix: '+', label: 'Pemandu Profesional' },
  { value: 250, suffix: '+', label: 'Destinasi Unggulan' }
]

function CountUp({ target }: { target: number }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          const duration = 1800
          const steps = 60
          const increment = target / steps
          let current = 0
          const timer = setInterval(() => {
            current += increment
            if (current >= target) {
              setCount(target)
              clearInterval(timer)
            } else {
              setCount(Math.floor(current))
            }
          }, duration / steps)
        }
      },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target])

  return <span ref={ref}>{count >= 1000 ? count.toLocaleString('id-ID') : count}</span>
}

export default function VisionMissionSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-20">
      {/* VISI MISI */}
      <div className="relative overflow-hidden rounded-3xl">
        <Image src="/assets/about/bali.jpg" alt="Visi dan Misi NusaTrip" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-black/40" />

        {/* Stack vertical on mobile, side by side on desktop */}
        <div className="relative z-10 grid md:grid-cols-2 gap-4 p-6 md:p-10 mt-[200px] md:mt-[280px]">
          {/* VISI */}
          <div className="backdrop-blur-md bg-[#0B2C4D]/60 p-6 md:p-8 rounded-2xl text-white border border-white/10">
            <h3 className="text-xl md:text-2xl font-bold mb-3 font-montserrat">Visi Kami</h3>
            <p className="text-sm leading-relaxed text-white/90">
              Menjadi agen perjalanan terpercaya yang menginspirasi masyarakat untuk menjelajahi keindahan Indonesia melalui
              layanan wisata yang berkualitas, aman, dan berkesan bagi setiap pelanggan kami.
            </p>
          </div>

          {/* MISI */}
          <div className="backdrop-blur-md bg-[#0B2C4D]/60 p-6 md:p-8 rounded-2xl text-white border border-white/10">
            <h3 className="text-xl md:text-2xl font-bold mb-3 font-montserrat">Misi Kami</h3>
            <ul className="space-y-2 text-sm text-white/90">
              <li className="flex items-start gap-2">
                <span className="text-[#FB8C00] mt-0.5 shrink-0">✦</span>Menyediakan paket wisata berkualitas dengan harga
                yang kompetitif dan transparan
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#FB8C00] mt-0.5 shrink-0">✦</span>Memberikan pelayanan profesional, ramah, dan
                responsif kepada pelanggan
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#FB8C00] mt-0.5 shrink-0">✦</span>Mendukung pengembangan pariwisata lokal yang
                berkelanjutan
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#FB8C00] mt-0.5 shrink-0">✦</span>Mengutamakan kenyamanan dan kepuasan pelanggan di
                setiap perjalanan
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* STATISTIK */}
      <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {stats.map((item, index) => (
          <div key={index} className="flex flex-col items-center">
            <h4 className="text-4xl md:text-5xl font-bold text-[#0B2C4D] font-montserrat">
              <CountUp target={item.value} />
              <span className="text-[#FB8C00]">{item.suffix}</span>
            </h4>
            <p className="text-sm text-slate-500 mt-2">{item.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}