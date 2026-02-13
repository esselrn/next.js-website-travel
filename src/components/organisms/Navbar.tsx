'use client'

import { useState } from 'react'
import Logo from '@/components/atoms/logo'
import NavLink from '@/components/molecules/nav-link'
import DropdownMenu from '@/components/molecules/dropdown-menu'
import LanguageSwitch from '@/components/molecules/language-switch'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState<string | null>(null)

  const toggle = (key: string) => {
    setActive(active === key ? null : key)
  }

  const closeMenu = () => {
    setOpen(false)
    setActive(null)
  }

  return (
    <>
      {/* ================= HEADER ================= */}
      <header className="fixed top-0 left-0 w-full z-30 bg-[#0B2C4D]/90 backdrop-blur">
        <div className="max-w-[1440px] mx-auto h-[64px] flex items-center justify-between px-6 text-white">
          <Logo />

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex items-center gap-6 font-inter text-sm">
            <NavLink href="/" label="Beranda" />
            <NavLink href="/about" label="Tentang Kami" />

            <DropdownMenu
              label="Paket Wisata"
              items={[
                { href: '/paket-wisata', label: 'Paket Wisata' },
                { href: '/paket-wisata/detail-paket-wisata', label: 'Detail Paket Wisata' }
              ]}
            />

            <DropdownMenu
              label="Destinasi"
              items={[
                { href: '/destinasi', label: 'Destinasi' },
                { href: '/destinasi/detail-destinasi', label: 'Detail Destinasi' }
              ]}
            />

            <DropdownMenu
              label="Pages"
              items={[
                { href: '/pages/blog-article', label: 'Blog & Article' },
                { href: '/pages/guide', label: 'Guide' },
                { href: '/pages/gallery', label: 'Gallery' }
              ]}
            />

            <NavLink href="/kontak" label="Kontak" />
            <LanguageSwitch />
          </nav>

          {/* BURGER BUTTON */}
          <button onClick={() => setOpen(!open)} className="md:hidden relative w-6 h-6" aria-label="Toggle menu">
            <span className={`absolute h-[2px] w-full bg-white transition ${open ? 'rotate-45 top-3' : 'top-1'}`} />
            <span className={`absolute h-[2px] w-full bg-white top-3 transition ${open ? 'opacity-0' : ''}`} />
            <span className={`absolute h-[2px] w-full bg-white transition ${open ? '-rotate-45 top-3' : 'top-5'}`} />
          </button>
        </div>
      </header>

      {/* ================= MOBILE OVERLAY ================= */}
      {open && (
        <div className="fixed inset-0 z-20 bg-[#061E36]/95 backdrop-blur pt-[64px] text-white overflow-y-auto">
          <div className="px-6 py-6 space-y-6 text-sm font-inter">
            {/* BERANDA */}
            <div>
              <NavLink href="/" label="Beranda" onClick={closeMenu} />
            </div>

            {/* TENTANG KAMI */}
            <div>
              <NavLink href="/about" label="Tentang Kami" onClick={closeMenu} />
            </div>

            {/* PAKET WISATA */}
            <div className="space-y-3">
              <button
                onClick={() => toggle('paket')}
                className="w-full flex justify-between items-center text-left font-semibold"
              >
                <span>Paket Wisata</span>
                <span className="text-lg">{active === 'paket' ? '−' : '+'}</span>
              </button>

              {active === 'paket' && (
                <div className="pl-4 flex flex-col gap-3 text-white/80">
                  <NavLink href="/paket-wisata" label="Paket Wisata" onClick={closeMenu} />
                  <NavLink href="/paket-wisata/detail-paket-wisata" label="Detail Paket Wisata" onClick={closeMenu} />
                </div>
              )}
            </div>

            {/* DESTINASI */}
            <div className="space-y-3">
              <button
                onClick={() => toggle('destinasi')}
                className="w-full flex justify-between items-center text-left font-semibold"
              >
                <span>Destinasi</span>
                <span className="text-lg">{active === 'destinasi' ? '−' : '+'}</span>
              </button>

              {active === 'destinasi' && (
                <div className="pl-4 flex flex-col gap-3 text-white/80">
                  <NavLink href="/destinasi" label="Destinasi" onClick={closeMenu} />
                  <NavLink href="/destinasi/detail-destinasi" label="Detail Destinasi" onClick={closeMenu} />
                </div>
              )}
            </div>

            {/* PAGES */}
            <div className="space-y-3">
              <button
                onClick={() => toggle('pages')}
                className="w-full flex justify-between items-center text-left font-semibold"
              >
                <span>Pages</span>
                <span className="text-lg">{active === 'pages' ? '−' : '+'}</span>
              </button>

              {active === 'pages' && (
                <div className="pl-4 flex flex-col gap-3 text-white/80">
                  <NavLink href="/pages/blog-article" label="Blog & Article" onClick={closeMenu} />
                  <NavLink href="/pages/guide" label="Guide" onClick={closeMenu} />
                  <NavLink href="/pages/gallery" label="Gallery" onClick={closeMenu} />
                </div>
              )}
            </div>

            {/* KONTAK */}
            <div>
              <NavLink href="/kontak" label="Kontak" onClick={closeMenu} />
            </div>

            {/* LANGUAGE */}
            <div className="pt-6 border-t border-white/20">
              <LanguageSwitch />
            </div>
          </div>
        </div>
      )}
    </>
  )
}