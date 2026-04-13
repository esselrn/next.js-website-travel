'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { X, ZoomIn, MapPin, ChevronLeft, ChevronRight, Images } from 'lucide-react'

type GalleryItem = {
  id: string
  title: string
  location: string
  image_url: string
  category: string
  sort_order: number
}

const CATEGORIES = ['Semua', 'Alam', 'Budaya', 'Kuliner', 'Petualangan', 'Pantai']

// Single source of truth — edit di sini untuk update gallery
const GALLERY_DATA: GalleryItem[] = [
  { id: '1',  title: 'Pura Tirta Empul',         location: 'Tampaksiring, Bali',       image_url: '/assets/pages/galeri/galeri1.jpg',  category: 'Budaya',      sort_order: 1  },
  { id: '2',  title: 'Prambanan Saat Senja',      location: 'Yogyakarta',               image_url: '/assets/pages/galeri/galeri2.jpg',  category: 'Budaya',      sort_order: 2  },
  { id: '3',  title: 'Raja Ampat Overwater',      location: 'Papua Barat',              image_url: '/assets/pages/galeri/galeri3.jpg',  category: 'Pantai',      sort_order: 3  },
  { id: '4',  title: 'Bukit Teletubbies Bromo',   location: 'Probolinggo, Jawa Timur',  image_url: '/assets/pages/galeri/galeri4.jpg',  category: 'Petualangan', sort_order: 4  },
  { id: '5',  title: 'Rumah Gadang Minangkabau',  location: 'Sumatra Barat',            image_url: '/assets/pages/galeri/galeri5.jpg',  category: 'Budaya',      sort_order: 5  },
  { id: '6',  title: 'Gerbang Pura Lempuyang',    location: 'Karangasem, Bali',         image_url: '/assets/pages/galeri/galeri6.jpg',  category: 'Budaya',      sort_order: 6  },
  { id: '7',  title: 'Kompleks Candi Prambanan',  location: 'Yogyakarta',               image_url: '/assets/pages/galeri/galeri7.jpg',  category: 'Budaya',      sort_order: 7  },
  { id: '8',  title: 'Pantai Kelingking',         location: 'Nusa Penida, Bali',        image_url: '/assets/pages/galeri/galeri8.jpg',  category: 'Pantai',      sort_order: 8  },
  { id: '9',  title: 'Pura Ulun Danu Beratan',    location: 'Bedugul, Bali',            image_url: '/assets/pages/galeri/galeri9.jpg',  category: 'Alam',        sort_order: 9  },
  { id: '10', title: 'Pantai Pasir Putih Bali',   location: 'Karangasem, Bali',         image_url: '/assets/pages/galeri/galeri10.jpg', category: 'Pantai',      sort_order: 10 },
  { id: '11', title: 'Pantai Tanah Lot',          location: 'Tabanan, Bali',            image_url: '/assets/pages/galeri/galeri11.jpg', category: 'Pantai',      sort_order: 11 },
  { id: '12', title: 'Kebun Teh Kemuning',        location: 'Karanganyar, Jawa Tengah', image_url: '/assets/pages/galeri/galeri12.jpg', category: 'Alam',        sort_order: 12 },
]

function getSpan(index: number): { col: string; row: string } {
  const patterns = [
    { col: 'col-span-2', row: 'row-span-2' },
    { col: 'col-span-1', row: 'row-span-1' },
    { col: 'col-span-1', row: 'row-span-1' },
    { col: 'col-span-1', row: 'row-span-2' },
    { col: 'col-span-2', row: 'row-span-1' },
    { col: 'col-span-1', row: 'row-span-1' },
    { col: 'col-span-1', row: 'row-span-1' },
    { col: 'col-span-1', row: 'row-span-1' },
    { col: 'col-span-2', row: 'row-span-1' },
  ]
  return patterns[index % patterns.length]
}

export default function GalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([])
  const [category, setCategory] = useState('Semua')
  const [showAll, setShowAll] = useState(false)
  const [lightbox, setLightbox] = useState<GalleryItem | null>(null)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  useEffect(() => {
    setItems(GALLERY_DATA)
  }, [])

  const filtered = category === 'Semua' ? items : items.filter((i) => i.category === category)
  const visible = showAll ? filtered : filtered.slice(0, 9)

  const openLightbox = (item: GalleryItem) => {
    const idx = filtered.findIndex((i) => i.id === item.id)
    setLightboxIndex(idx)
    setLightbox(item)
  }

  const prev = () => {
    const newIdx = (lightboxIndex - 1 + filtered.length) % filtered.length
    setLightboxIndex(newIdx)
    setLightbox(filtered[newIdx])
  }

  const next = () => {
    const newIdx = (lightboxIndex + 1) % filtered.length
    setLightboxIndex(newIdx)
    setLightbox(filtered[newIdx])
  }

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (!lightbox) return
      if (e.key === 'Escape') setLightbox(null)
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lightbox, lightboxIndex])

  useEffect(() => {
    setShowAll(false)
  }, [category])

  return (
    <div className="min-h-screen bg-white">
      <style>{`
        .gallery-item {
          animation: galleryReveal 0.5s cubic-bezier(0.22,1,0.36,1) both;
        }
        @keyframes galleryReveal {
          from { opacity: 0; transform: scale(0.97); }
          to   { opacity: 1; transform: scale(1); }
        }
      `}</style>

      {/* HERO */}
      <section className="relative h-[440px] md:h-[520px] flex items-center justify-center overflow-hidden">
        <Image src="/assets/bali.jpg" alt="Gallery NusaTrip" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B2C4D]/80 via-[#0B2C4D]/50 to-[#0B2C4D]/85" />
        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 text-[#FB8C00] text-sm font-semibold tracking-[0.2em] uppercase mb-5">
            <Images size={14} /> Galeri Foto
          </span>
          <h1 className="font-montserrat font-bold text-4xl md:text-6xl text-white mb-6 leading-tight">
            Keindahan Indonesia
            <br />
            <span className="text-[#FB8C00]">Lewat Lensa Kami</span>
          </h1>
          <p className="text-white/70 text-lg leading-relaxed max-w-xl mx-auto">
            Setiap foto bercerita tentang petualangan, budaya, dan keajaiban alam nusantara yang menunggu untuk Anda
            jelajahi.
          </p>
        </div>
        <div className="absolute bottom-8 right-8 hidden md:flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-5 py-2.5">
          <span className="w-2 h-2 bg-[#FB8C00] rounded-full animate-pulse" />
          <span className="text-white text-sm font-medium">{items.length} foto tersedia</span>
        </div>
      </section>

      {/* STICKY FILTER */}
      <section className="sticky top-[64px] z-20 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="max-w-[1200px] mx-auto px-6 py-4">
          <div className="flex items-center gap-2 flex-wrap justify-center">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                  category === cat
                    ? 'bg-[#0B2C4D] text-white shadow-md scale-105'
                    : 'bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-700'
                }`}
              >
                {cat}
                {cat === 'Semua' && <span className="ml-1.5 text-xs opacity-60">({items.length})</span>}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* MOSAIC GALLERY */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-[1200px] mx-auto px-6">
          {filtered.length === 0 ? (
            <div className="text-center py-24">
              <p className="text-4xl mb-4">📷</p>
              <p className="text-gray-400 font-medium">Belum ada foto di kategori ini</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-3 gap-3 auto-rows-[200px]">
                {visible.map((item, i) => {
                  const span = getSpan(i)
                  return (
                    <div
                      key={item.id}
                      className={`gallery-item ${span.col} ${span.row} group relative rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}
                      style={{ animationDelay: `${i * 60}ms` }}
                      onClick={() => openLightbox(item)}
                    >
                      <Image
                        src={item.image_url}
                        alt={item.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0B2C4D]/75 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 bg-white/25 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300">
                        <ZoomIn size={18} className="text-white" />
                      </div>
                      <div className="absolute top-3 left-3">
                        <span className="text-[10px] font-bold bg-[#FB8C00] text-white px-2.5 py-1 rounded-full shadow-sm">
                          {item.category}
                        </span>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <p className="font-montserrat font-bold text-white text-sm leading-tight">{item.title}</p>
                        <div className="flex items-center gap-1 mt-1">
                          <MapPin size={10} className="text-[#FB8C00]" />
                          <p className="text-white/75 text-xs">{item.location}</p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>

              {filtered.length > 9 && (
                <div className="flex flex-col items-center gap-3 mt-12">
                  <p className="text-gray-400 text-sm">
                    Menampilkan {visible.length} dari {filtered.length} foto
                  </p>
                  <div className="w-48 h-1 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#FB8C00] rounded-full transition-all duration-500"
                      style={{ width: `${(visible.length / filtered.length) * 100}%` }}
                    />
                  </div>
                  <button
                    onClick={() => setShowAll(!showAll)}
                    className="mt-2 px-8 py-3.5 rounded-full font-semibold text-sm transition-all duration-200 border-2 border-[#0B2C4D] text-[#0B2C4D] hover:bg-[#0B2C4D] hover:text-white"
                  >
                    {showAll ? '↑ Tampilkan Lebih Sedikit' : `Lihat Semua ${filtered.length} Foto →`}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* INFO STRIP */}
      <section className="py-14 bg-[#0B2C4D]">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: `${items.length}+`, label: 'Foto Koleksi' },
              { value: CATEGORIES.length - 1 + '', label: 'Kategori' },
              { value: '50+', label: 'Destinasi Diabadikan' },
              { value: '2014', label: 'Mulai Mendokumentasikan' }
            ].map((s) => (
              <div key={s.label} className="text-center">
                <p className="font-montserrat font-bold text-4xl text-[#FB8C00] mb-1">{s.value}</p>
                <p className="text-white/60 text-sm">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LIGHTBOX */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/92 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            onClick={() => setLightbox(null)}
            className="absolute top-5 right-5 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition z-10"
          >
            <X size={18} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); prev() }}
            className="absolute left-4 md:left-8 w-11 h-11 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition z-10"
          >
            <ChevronLeft size={22} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); next() }}
            className="absolute right-4 md:right-8 w-11 h-11 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition z-10"
          >
            <ChevronRight size={22} />
          </button>
          <div
            className="relative max-w-5xl w-full rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={lightbox.image_url}
              alt={lightbox.title}
              width={1200}
              height={800}
              className="object-contain w-full max-h-[76vh]"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent px-6 py-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-montserrat font-bold text-white text-lg">{lightbox.title}</p>
                  <div className="flex items-center gap-1.5 mt-1">
                    <MapPin size={12} className="text-[#FB8C00]" />
                    <p className="text-white/70 text-sm">{lightbox.location}</p>
                  </div>
                </div>
                <span className="text-xs font-bold bg-[#FB8C00] text-white px-3 py-1.5 rounded-full">
                  {lightbox.category}
                </span>
              </div>
            </div>
          </div>
          <p className="absolute bottom-5 left-1/2 -translate-x-1/2 text-white/40 text-xs font-medium">
            {lightboxIndex + 1} / {filtered.length}
          </p>
        </div>
      )}
    </div>
  )
}