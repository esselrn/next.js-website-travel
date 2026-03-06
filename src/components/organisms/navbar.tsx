'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Logo from '@/components/atoms/logo'
import NavLink from '@/components/molecules/nav-link'
import DropdownMenu from '@/components/molecules/dropdown-menu'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/contexts/auth-context'
import { LogOut, ChevronDown } from 'lucide-react'
import LogoutToast from '@/components/organisms/logout-toast'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState<string | null>(null)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const userMenuRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const { profile, user } = useAuth()

  const toggle = (key: string) => setActive(active === key ? null : key)
  const closeMenu = () => {
    setOpen(false)
    setActive(null)
  }

  // Tutup user menu saat klik di luar
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) setUserMenuOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const goToFirstPackage = async () => {
    const { data } = await supabase.from('packages').select('id').order('created_at', { ascending: true }).limit(1).single()
    router.push(data?.id ? `/paket-wisata/${data.id}` : '/paket-wisata')
  }

  const goToFirstDestination = async () => {
    const { data } = await supabase
      .from('destinations')
      .select('id')
      .order('created_at', { ascending: true })
      .limit(1)
      .single()
    router.push(data?.id ? `/destinasi/${data.id}` : '/destinasi')
  }

  const handleSignOut = async () => {
    setUserMenuOpen(false)
    setOpen(false)
    setShowToast(true)
    await supabase.auth.signOut()
    setTimeout(() => router.push('/'), 2000)
  }

  const initials = (profile?.full_name || profile?.email || 'U')[0].toUpperCase()
  const displayName = profile?.full_name || profile?.email?.split('@')[0] || 'User'

  return (
    <>
      <LogoutToast show={showToast} name={profile?.full_name} />
      <header className="fixed top-0 left-0 w-full z-30 bg-[#0B2C4D]/90 backdrop-blur-md border-b border-white/5">
        <div className="max-w-[1440px] mx-auto h-[64px] flex items-center justify-between px-6 text-white">
          <Logo />

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex items-center gap-2 font-inter text-sm">
            <NavLink href="/" label="Beranda" />
            <NavLink href="/about" label="Tentang Kami" />
            <DropdownMenu
              label="Paket Wisata"
              items={[
                { href: '/paket-wisata', label: 'Paket Wisata' },
                { label: 'Detail Paket Wisata', onClick: goToFirstPackage }
              ]}
            />
            <DropdownMenu
              label="Destinasi"
              items={[
                { href: '/destinasi', label: 'Destinasi' },
                { label: 'Detail Destinasi', onClick: goToFirstDestination }
              ]}
            />
            <DropdownMenu label="Pages" items={[{ href: '/pages/blog-article', label: 'Blog & Article' }]} />
            <NavLink href="/kontak" label="Kontak" />

            {/* AUTH */}
            <div className="ml-4 pl-4 border-l border-white/15">
              {user && profile ? (
                /* LOGGED IN */
                <div className="relative" ref={userMenuRef}>
                  <button
                    onClick={() => setUserMenuOpen((o) => !o)}
                    className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-full transition"
                  >
                    <div className="w-7 h-7 rounded-full bg-[#FB8C00] flex items-center justify-center text-xs font-bold shrink-0">
                      {initials}
                    </div>
                    <span className="max-w-[100px] truncate text-sm font-medium">{displayName}</span>
                    <ChevronDown
                      size={13}
                      className={`transition-transform duration-200 ${userMenuOpen ? 'rotate-180' : ''}`}
                    />
                  </button>

                  {/* Dropdown */}
                  {userMenuOpen && (
                    <div
                      className="absolute right-0 top-full mt-2 w-52 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden text-gray-700 z-50"
                      style={{ animation: 'fadeUp 0.15s ease forwards' }}
                    >
                      {/* User info */}
                      <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-[#FB8C00] flex items-center justify-center text-xs font-bold text-white shrink-0">
                            {initials}
                          </div>
                          <div className="overflow-hidden">
                            <p className="text-xs font-semibold text-[#0B2C4D] truncate">{displayName}</p>
                            <p className="text-[11px] text-gray-400 truncate">{profile.email}</p>
                          </div>
                        </div>
                      </div>
                      {/* Logout */}
                      <button
                        onClick={handleSignOut}
                        className="w-full flex items-center gap-2.5 px-4 py-3 text-sm hover:bg-red-50 hover:text-red-600 transition"
                      >
                        <LogOut size={15} />
                        <span>Keluar</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                /* NOT LOGGED IN */
                <div className="flex items-center gap-2">
                  <Link
                    href="/auth/login"
                    className="text-white/80 hover:text-white text-sm font-medium px-4 py-1.5 rounded-full hover:bg-white/10 transition"
                  >
                    Masuk
                  </Link>
                  <Link
                    href="/auth/register"
                    className="bg-[#F36F21] hover:bg-orange-500 text-white text-sm font-semibold px-5 py-1.5 rounded-full transition shadow-md shadow-orange-500/20"
                  >
                    Daftar
                  </Link>
                </div>
              )}
            </div>
          </nav>

          {/* BURGER */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden flex flex-col justify-center items-center w-9 h-9 rounded-lg hover:bg-white/10 transition gap-[5px]"
          >
            <span
              className={`h-[2px] w-5 bg-white rounded-full transition-all duration-300 ${open ? 'rotate-45 translate-y-[7px]' : ''}`}
            />
            <span className={`h-[2px] w-5 bg-white rounded-full transition-all duration-300 ${open ? 'opacity-0' : ''}`} />
            <span
              className={`h-[2px] w-5 bg-white rounded-full transition-all duration-300 ${open ? '-rotate-45 -translate-y-[7px]' : ''}`}
            />
          </button>
        </div>
      </header>

      {/* MOBILE OVERLAY */}
      <div
        className={`fixed inset-0 z-20 transition-all duration-300 ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      >
        <div className="absolute inset-0 bg-[#061E36]/95 backdrop-blur-md" onClick={closeMenu} />

        <div
          className={`absolute top-[64px] left-0 right-0 bottom-0 overflow-y-auto transition-transform duration-300 ${open ? 'translate-y-0' : '-translate-y-4'}`}
        >
          <div className="px-6 py-6 space-y-1 text-sm font-inter">
            {/* User info mobile (jika login) */}
            {user && profile && (
              <div className="flex items-center gap-3 px-4 py-4 mb-3 bg-white/5 rounded-2xl border border-white/10">
                <div className="w-10 h-10 rounded-full bg-[#FB8C00] flex items-center justify-center font-bold text-sm shrink-0">
                  {initials}
                </div>
                <div className="overflow-hidden">
                  <p className="font-semibold text-white truncate">{displayName}</p>
                  <p className="text-white/40 text-xs truncate">{profile.email}</p>
                </div>
              </div>
            )}

            {/* Nav links */}
            {[
              { label: 'Beranda', href: '/' },
              { label: 'Tentang Kami', href: '/about' },
              { label: 'Kontak', href: '/kontak' }
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMenu}
                className="flex items-center h-12 px-4 text-white/80 hover:text-white hover:bg-white/8 rounded-xl transition font-medium"
              >
                {item.label}
              </Link>
            ))}

            {/* Paket Wisata */}
            <div>
              <button
                onClick={() => toggle('paket')}
                className="w-full flex items-center justify-between h-12 px-4 text-white/80 hover:text-white hover:bg-white/8 rounded-xl transition font-medium"
              >
                <span>Paket Wisata</span>
                <span className={`text-xs transition-transform duration-200 ${active === 'paket' ? 'rotate-180' : ''}`}>
                  ▼
                </span>
              </button>
              {active === 'paket' && (
                <div className="ml-4 mt-1 mb-1 space-y-1 border-l border-white/10 pl-4">
                  <Link
                    href="/paket-wisata"
                    onClick={closeMenu}
                    className="flex items-center h-10 text-white/60 hover:text-white transition text-sm"
                  >
                    Paket Wisata
                  </Link>
                  <button
                    onClick={async () => {
                      closeMenu()
                      await goToFirstPackage()
                    }}
                    className="flex items-center h-10 text-white/60 hover:text-white transition text-sm w-full text-left"
                  >
                    Detail Paket Wisata
                  </button>
                </div>
              )}
            </div>

            {/* Destinasi */}
            <div>
              <button
                onClick={() => toggle('dest')}
                className="w-full flex items-center justify-between h-12 px-4 text-white/80 hover:text-white hover:bg-white/8 rounded-xl transition font-medium"
              >
                <span>Destinasi</span>
                <span className={`text-xs transition-transform duration-200 ${active === 'dest' ? 'rotate-180' : ''}`}>
                  ▼
                </span>
              </button>
              {active === 'dest' && (
                <div className="ml-4 mt-1 mb-1 space-y-1 border-l border-white/10 pl-4">
                  <Link
                    href="/destinasi"
                    onClick={closeMenu}
                    className="flex items-center h-10 text-white/60 hover:text-white transition text-sm"
                  >
                    Destinasi
                  </Link>
                  <button
                    onClick={async () => {
                      closeMenu()
                      await goToFirstDestination()
                    }}
                    className="flex items-center h-10 text-white/60 hover:text-white transition text-sm w-full text-left"
                  >
                    Detail Destinasi
                  </button>
                </div>
              )}
            </div>

            {/* Pages */}
            <div>
              <button
                onClick={() => toggle('pages')}
                className="w-full flex items-center justify-between h-12 px-4 text-white/80 hover:text-white hover:bg-white/8 rounded-xl transition font-medium"
              >
                <span>Pages</span>
                <span className={`text-xs transition-transform duration-200 ${active === 'pages' ? 'rotate-180' : ''}`}>
                  ▼
                </span>
              </button>
              {active === 'pages' && (
                <div className="ml-4 mt-1 mb-1 border-l border-white/10 pl-4">
                  <Link
                    href="/pages/blog-article"
                    onClick={closeMenu}
                    className="flex items-center h-10 text-white/60 hover:text-white transition text-sm"
                  >
                    Blog & Article
                  </Link>
                </div>
              )}
            </div>

            {/* AUTH mobile */}
            <div className="pt-4 mt-2 border-t border-white/10">
              {user && profile ? (
                <button
                  onClick={handleSignOut}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-red-400/30 text-red-400 hover:bg-red-500/10 transition text-sm font-semibold"
                >
                  <LogOut size={15} /> Keluar
                </button>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  <Link
                    href="/auth/login"
                    onClick={closeMenu}
                    className="text-center py-3 rounded-xl border border-white/20 text-white/80 hover:text-white hover:bg-white/10 transition text-sm font-medium"
                  >
                    Masuk
                  </Link>
                  <Link
                    href="/auth/register"
                    onClick={closeMenu}
                    className="text-center py-3 rounded-xl bg-[#F36F21] hover:bg-orange-500 text-white transition text-sm font-semibold shadow-lg shadow-orange-500/20"
                  >
                    Daftar
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(6px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  )
}