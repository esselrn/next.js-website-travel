'use client'

import { useState } from 'react'
import Image from 'next/image'
import {
  Instagram,
  Star,
  MapPin,
  Award,
  Mountain,
  Waves,
  Camera,
  Trees,
  Building,
  Users,
  Compass,
  ArrowRight
} from 'lucide-react'

type GuideSpecialty = {
  icon: React.ReactNode
  label: string
}

type Guide = {
  id: string
  name: string
  role: string
  tagline: string
  bio: string
  photo_url: string
  rating: number
  total_reviews: number
  trips_completed: number
  years_exp: number
  specialties: GuideSpecialty[]
  regions: string[]
  instagram: string
}

const IG_LINK = 'https://www.instagram.com/rpannrha_?igsh=MWFscTdiNGtvODNyOA=='

// Single source of truth — edit di sini untuk update data guide
const guides: Guide[] = [
  {
    id: '1',
    name: 'Rizky Pratama',
    role: 'Senior Mountain Guide',
    tagline: 'Penakluk puncak-puncak tertinggi Nusantara',
    bio: 'Bersertifikat BNSP dengan pengalaman mendaki lebih dari 80 puncak di Indonesia. Spesialis trek Rinjani, Semeru, dan Carstensz Pyramid.',
    photo_url: '/assets/pages/tim-kami/aksa-fathan.jpg',
    rating: 4.97,
    total_reviews: 312,
    trips_completed: 847,
    years_exp: 12,
    specialties: [
      { icon: <Mountain size={12} />, label: 'Pendakian' },
      { icon: <Compass size={12} />, label: 'Survival' },
      { icon: <Camera size={12} />, label: 'Fotografi' }
    ],
    regions: ['Lombok', 'Jawa', 'Papua'],
    instagram: IG_LINK
  },
  {
    id: '2',
    name: 'Sari Dewi',
    role: 'Dive Master & Marine Guide',
    tagline: 'Penjelajah dunia bawah laut Raja Ampat',
    bio: 'PADI Dive Master bersertifikat internasional. Lebih dari 2.000 dive log di perairan Indonesia. Expert underwater photography dan marine biology.',
    photo_url: '/assets/pages/tim-kami/ruby.jpg',
    rating: 4.95,
    total_reviews: 428,
    trips_completed: 1203,
    years_exp: 9,
    specialties: [
      { icon: <Waves size={12} />, label: 'Diving' },
      { icon: <Camera size={12} />, label: 'Underwater' },
      { icon: <Compass size={12} />, label: 'Snorkeling' }
    ],
    regions: ['Raja Ampat', 'Komodo', 'Bunaken'],
    instagram: IG_LINK
  },
  {
    id: '3',
    name: 'Budi Santoso',
    role: 'Cultural Heritage Guide',
    tagline: 'Penjaga cerita dan tradisi nusantara',
    bio: 'Lulusan Arkeologi UGM dengan keahlian mendalam pada sejarah Jawa, Bali, dan Sulawesi. Dipercaya memandu ratusan delegasi internasional.',
    photo_url: '/assets/pages/tim-kami/aamon-guler.jpg',
    rating: 4.98,
    total_reviews: 567,
    trips_completed: 1540,
    years_exp: 15,
    specialties: [
      { icon: <Building size={12} />, label: 'Heritage' },
      { icon: <Compass size={12} />, label: 'Sejarah' },
      { icon: <Users size={12} />, label: 'Budaya' }
    ],
    regions: ['Yogyakarta', 'Bali', 'Sulawesi'],
    instagram: IG_LINK
  },
  {
    id: '4',
    name: 'Anisa Rahman',
    role: 'Eco & Forest Guide',
    tagline: 'Pemandu hutan tropis & wildlife Indonesia',
    bio: 'Ahli botani dan zoologi lapangan dari Kalimantan. Berpengalaman tracking orangutan, bekantan, dan satwa endemik Borneo di habitatnya.',
    photo_url: '/assets/pages/tim-kami/guinevere.jpg',
    rating: 4.93,
    total_reviews: 189,
    trips_completed: 412,
    years_exp: 7,
    specialties: [
      { icon: <Trees size={12} />, label: 'Wildlife' },
      { icon: <Compass size={12} />, label: 'Jungle Trek' },
      { icon: <Camera size={12} />, label: 'Birdwatching' }
    ],
    regions: ['Kalimantan', 'Sumatra', 'Sulawesi'],
    instagram: IG_LINK
  },
  {
    id: '5',
    name: 'Dimas Aditya',
    role: 'Adventure & Surfing Guide',
    tagline: 'Rider ombak & petualang pantai selatan',
    bio: 'Mantan atlet surfing nasional yang kini berbagi passion dengan wisatawan. Spesialis surf spots Bali, Lombok, dan Mentawai Islands.',
    photo_url: '/assets/pages/tim-kami/essel-paxley.jpg',
    rating: 4.91,
    total_reviews: 276,
    trips_completed: 703,
    years_exp: 10,
    specialties: [
      { icon: <Waves size={12} />, label: 'Surfing' },
      { icon: <Compass size={12} />, label: 'Adventure' },
      { icon: <Camera size={12} />, label: 'Content' }
    ],
    regions: ['Bali', 'Mentawai', 'Lombok'],
    instagram: IG_LINK
  },
  {
    id: '6',
    name: 'Maya Putri',
    role: 'Culinary & Village Guide',
    tagline: 'Penjelajah cita rasa autentik nusantara',
    bio: 'Food journalist dan community traveler yang telah mendokumentasikan lebih dari 300 resep tradisional dari Sabang sampai Merauke.',
    photo_url: '/assets/pages/tim-kami/fanny.jpg',
    rating: 4.96,
    total_reviews: 341,
    trips_completed: 892,
    years_exp: 8,
    specialties: [
      { icon: <Users size={12} />, label: 'Culinary Tour' },
      { icon: <Building size={12} />, label: 'Desa Adat' },
      { icon: <Camera size={12} />, label: 'Food Photo' }
    ],
    regions: ['Padang', 'Solo', 'Manado'],
    instagram: IG_LINK
  }
]

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={11}
          className={star <= Math.floor(rating) ? 'fill-[#FB8C00] text-[#FB8C00]' : 'fill-gray-200 text-gray-200'}
        />
      ))}
    </div>
  )
}

function GuideCard({ guide, index }: { guide: Guide; index: number }) {
  const formatNum = (n: number) => (n >= 1000 ? `${(n / 1000).toFixed(1)}K` : `${n}`)

  return (
    <div
      className="guide-card group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-400"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Photo */}
      <div className="relative h-[300px] overflow-hidden">
        <Image
          src={guide.photo_url}
          alt={guide.name}
          fill
          className="object-cover object-top group-hover:scale-105 transition-transform duration-600"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B2C4D]/90 via-[#0B2C4D]/20 to-transparent" />

        {/* Specialties */}
        <div className="absolute top-4 left-4 flex flex-wrap gap-1.5">
          {guide.specialties.map((s) => (
            <span
              key={s.label}
              className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-white/15 backdrop-blur-sm text-white border border-white/20"
            >
              {s.icon} {s.label}
            </span>
          ))}
        </div>

        {/* Rating badge */}
        <div className="absolute top-4 right-4 flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#FB8C00] text-white text-xs font-bold shadow-lg">
          <Star size={10} className="fill-white text-white" />
          {guide.rating}
        </div>

        {/* Instagram on hover */}
        <div className="absolute bottom-[88px] left-0 right-0 flex justify-center opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          <a
            href={guide.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 bg-white/20 backdrop-blur-sm hover:bg-[#FB8C00] rounded-full flex items-center justify-center text-white transition"
          >
            <Instagram size={16} />
          </a>
        </div>

        {/* Name */}
        <div className="absolute bottom-0 left-0 right-0 px-5 pb-5">
          <h3 className="font-montserrat font-bold text-white text-xl leading-tight">{guide.name}</h3>
          <p className="text-[#FB8C00] text-xs font-semibold uppercase tracking-wider mt-0.5">{guide.role}</p>
        </div>
      </div>

      {/* Card body */}
      <div className="p-5">
        <p className="text-gray-400 text-xs italic mb-4 leading-relaxed">&ldquo;{guide.tagline}&rdquo;</p>

        {/* Regions */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {guide.regions.map((r) => (
            <span
              key={r}
              className="flex items-center gap-1 text-[10px] font-medium text-[#0B2C4D] bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100"
            >
              <MapPin size={8} className="text-[#FB8C00]" /> {r}
            </span>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          {[
            { label: 'Trip', value: formatNum(guide.trips_completed) },
            { label: 'Ulasan', value: formatNum(guide.total_reviews) },
            { label: 'Tahun', value: `${guide.years_exp}+` }
          ].map((s) => (
            <div key={s.label} className="text-center bg-gray-50 rounded-xl py-2.5 border border-gray-100">
              <p className="font-montserrat font-bold text-[#0B2C4D] text-sm leading-none">{s.value}</p>
              <p className="text-gray-400 text-[10px] mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Rating row */}
        <div className="flex items-center gap-2 pt-4 border-t border-gray-100">
          <StarRating rating={guide.rating} />
          <span className="text-xs text-gray-500">
            {guide.rating} <span className="text-gray-300">({guide.total_reviews} ulasan)</span>
          </span>
        </div>
      </div>
    </div>
  )
}

export default function GuidePage() {
  const [showAll, setShowAll] = useState(false)
  const visible = showAll ? guides : guides.slice(0, 6)

  const totalTrips = guides.reduce((a, g) => a + g.trips_completed, 0)
  const avgRating = (guides.reduce((a, g) => a + g.rating, 0) / guides.length).toFixed(2)

  return (
    <div className="min-h-screen bg-white">
      <style>{`
        .guide-card {
          animation: fadeUp 0.55s cubic-bezier(0.22,1,0.36,1) both;
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* HERO */}
      <section className="relative h-[460px] md:h-[540px] flex items-center justify-center overflow-hidden">
        <Image src="/assets/homepage/bali.jpg" alt="Guide NusaTrip" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B2C4D]/80 via-[#0B2C4D]/60 to-[#0B2C4D]/85" />
        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 text-[#FB8C00] text-sm font-semibold tracking-[0.2em] uppercase mb-5">
            <Award size={14} /> Pemandu Wisata Bersertifikat
          </span>
          <h1 className="font-montserrat font-bold text-4xl md:text-6xl text-white mb-6 leading-tight">
            Temui Para Guide
            <br />
            <span className="text-[#FB8C00]">Terbaik Kami</span>
          </h1>
          <p className="text-white/70 text-lg leading-relaxed max-w-xl mx-auto">
            Setiap perjalanan layak dipandu oleh yang terbaik &mdash; berpengalaman, bersertifikat, dan penuh semangat.
          </p>
        </div>
      </section>

      {/* STATS BAR */}
      <section className="bg-[#0B2C4D] py-10">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: `${guides.length}`, label: 'Guide Aktif' },
              { value: totalTrips >= 1000 ? `${(totalTrips / 1000).toFixed(1)}K+` : `${totalTrips}+`, label: 'Trip Selesai' },
              { value: avgRating, label: 'Rata-rata Rating' },
              { value: '15+', label: 'Destinasi Dikuasai' }
            ].map((s) => (
              <div key={s.label} className="text-center">
                <p className="font-montserrat font-bold text-4xl text-[#FB8C00] mb-1">{s.value}</p>
                <p className="text-white/60 text-sm">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GUIDE GRID */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-14">
            <span className="text-[#FB8C00] text-sm font-semibold tracking-widest uppercase">Tim Pemandu</span>
            <h2 className="font-montserrat font-bold text-3xl md:text-4xl text-[#0B2C4D] mt-3">
              {showAll ? 'Semua Guide Kami' : 'Guide Pilihan Kami'}
            </h2>
            <p className="text-gray-500 mt-3 max-w-lg mx-auto">
              Setiap guide memiliki keahlian unik dan spesialisasi berbeda untuk memastikan perjalanan Anda sempurna
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {visible.map((guide, i) => (
              <GuideCard key={guide.id} guide={guide} index={i} />
            ))}
          </div>

          {guides.length > 6 && (
            <div className="flex justify-center mt-12">
              <button
                onClick={() => setShowAll(!showAll)}
                className="flex items-center gap-2 px-8 py-3.5 rounded-full font-semibold text-sm transition-all duration-300 border-2"
                style={
                  showAll
                    ? { borderColor: '#d1d5db', color: '#6b7280', background: 'white' }
                    : { borderColor: '#0B2C4D', color: '#0B2C4D', background: 'white' }
                }
              >
                {showAll ? '\u2190 Tampilkan Lebih Sedikit' : `Lihat Semua ${guides.length} Guide`}
                {!showAll && <ArrowRight size={15} />}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* SPECIALIZATION */}
      <section className="py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-[#FB8C00] text-sm font-semibold tracking-widest uppercase">Keahlian Kami</span>
              <h2 className="font-montserrat font-bold text-3xl md:text-4xl text-[#0B2C4D] mt-3 mb-6 leading-tight">
                Setiap Guide,
                <br />
                Satu Keunikan Tersendiri
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Kami tidak percaya pada pendekatan satu ukuran untuk semua. Setiap guide NusaTrip memiliki spesialisasi
                mendalam yang terasah dari ratusan perjalanan nyata di lapangan.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Dari puncak Semeru hingga kedalaman Raja Ampat, dari lorong candi Prambanan hingga hutan Kalimantan &mdash;
                selalu ada guide kami yang tepat untuk menemani Anda.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: '🏔️', title: 'Mountain & Trekking', desc: 'Pendakian terstruktur & aman di 80+ puncak Indonesia' },
                { icon: '🤿', title: 'Marine & Diving', desc: 'Menjelajahi bawah laut dengan pemandu bersertifikat PADI' },
                { icon: '🛕', title: 'Culture & Heritage', desc: 'Menyelami sejarah dan tradisi lokal secara mendalam' },
                { icon: '🌿', title: 'Eco & Wildlife', desc: 'Petualangan alam liar bersama naturalis berpengalaman' }
              ].map((item) => (
                <div
                  key={item.title}
                  className="bg-gray-50 rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300"
                >
                  <span className="text-3xl mb-3 block">{item.icon}</span>
                  <h3 className="font-bold text-[#0B2C4D] text-sm mb-1">{item.title}</h3>
                  <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* JOIN CTA */}
      <section className="py-20 bg-[#0B2C4D] relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#FB8C00]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 max-w-2xl mx-auto text-center px-6">
          <span className="text-[#FB8C00] text-sm font-semibold tracking-widest uppercase">Bergabung</span>
          <h2 className="font-montserrat font-bold text-3xl md:text-4xl text-white mt-3 mb-6">
            Ingin Bergabung sebagai Guide?
          </h2>
          <p className="text-white/60 mb-8 leading-relaxed">
            Kami selalu mencari pemandu yang passionate dan bersertifikat. Jadilah bagian dari tim NusaTrip.
          </p>
          <a
            href="/kontak"
            className="inline-flex items-center gap-2 bg-[#FB8C00] hover:bg-orange-500 text-white font-semibold px-8 py-4 rounded-full transition shadow-lg shadow-orange-500/30"
          >
            Hubungi Kami <ArrowRight size={16} />
          </a>
        </div>
      </section>
    </div>
  )
}