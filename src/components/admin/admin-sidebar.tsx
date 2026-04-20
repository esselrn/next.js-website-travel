'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import {
  LayoutDashboard,
  Package,
  MapPin,
  BookOpen,
  Users,
  Mail,
  MessageSquare,
  LogOut,
  ChevronRight,
  X,
  Users2,
  Images
} from 'lucide-react'

export type Tab =
  | 'overview'
  | 'pesanan'
  | 'paket'
  | 'destinasi'
  | 'blog'
  | 'pengguna'
  | 'kontak'
  | 'newsletter'
  | 'team'
  | 'gallery'

export const NAV_ITEMS: { id: Tab; icon: React.ElementType; label: string }[] = [
  { id: 'overview', icon: LayoutDashboard, label: 'Overview' },
  { id: 'pesanan', icon: BookOpen, label: 'Pesanan' },
  { id: 'paket', icon: Package, label: 'Paket Wisata' },
  { id: 'destinasi', icon: MapPin, label: 'Destinasi' },
  { id: 'blog', icon: BookOpen, label: 'Blog & Artikel' },
  { id: 'pengguna', icon: Users, label: 'Pengguna' },
  { id: 'kontak', icon: MessageSquare, label: 'Kontak' },
  { id: 'newsletter', icon: Mail, label: 'Newsletter' },
  { id: 'team', icon: Users2, label: 'Tim Kami' },
  { id: 'gallery', icon: Images, label: 'Galeri' }
]

interface Props {
  tab: Tab
  setTab: (t: Tab) => void
  open: boolean
  setOpen: (o: boolean) => void
  adminName: string
  adminEmail: string
}

export default function AdminSidebar({ tab, setTab, open, setOpen, adminName, adminEmail }: Props) {
  const router = useRouter()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/auth/login')
  }

  return (
    <aside
      className={`
      fixed top-0 left-0 h-full z-40 flex flex-col bg-[#0B2C4D]
      transition-all duration-300 ease-in-out overflow-hidden
      ${open ? 'w-[220px]' : 'w-[52px]'}
    `}
    >
      {/* Logo + Close */}
      <div className="flex items-center h-[60px] border-b border-white/10 shrink-0 px-3 gap-3">
        <div className="w-7 h-7 rounded-lg overflow-hidden shrink-0 flex items-center justify-center bg-white/10">
          <Image src="/assets/logo.png" alt="NusaTrip" width={28} height={28} className="object-contain" />
        </div>
        {open && (
          <>
            <span className="font-bold text-white text-sm tracking-wide flex-1 truncate">NusaTrip</span>
            <button
              onClick={() => setOpen(false)}
              className="w-7 h-7 rounded-md flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition shrink-0"
            >
              <X size={14} />
            </button>
          </>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 py-2 overflow-y-auto overflow-x-hidden">
        {NAV_ITEMS.map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            title={!open ? label : undefined}
            className={`w-full flex items-center gap-3 px-3 py-2.5 transition-all duration-150 text-sm font-medium whitespace-nowrap ${
              tab === id ? 'bg-[#FB8C00] text-white' : 'text-white/55 hover:text-white hover:bg-white/[0.08]'
            }`}
          >
            <Icon size={16} className="shrink-0" />
            {open && <span className="truncate flex-1 text-left">{label}</span>}
            {open && tab === id && <ChevronRight size={12} className="shrink-0 opacity-60" />}
          </button>
        ))}
      </nav>

      {/* Profile + Actions */}
      <div className="border-t border-white/10 p-2 shrink-0 space-y-1">
        {open && (
          <div className="flex items-center gap-2 px-2 py-2 rounded-lg bg-white/5 mb-1">
            <div className="w-7 h-7 rounded-full bg-[#FB8C00] flex items-center justify-center text-[11px] font-bold text-white shrink-0">
              {(adminName || 'A')[0].toUpperCase()}
            </div>
            <div className="overflow-hidden flex-1 min-w-0">
              <p className="text-xs font-semibold text-white truncate leading-tight">{adminName}</p>
              <p className="text-[10px] text-white/40 truncate">{adminEmail}</p>
              <span className="inline-block text-[9px] font-bold bg-[#FB8C00]/20 text-[#FB8C00] px-1.5 py-0.5 rounded tracking-wide">
                ADMINISTRATOR
              </span>
            </div>
          </div>
        )}
        <button
          onClick={async () => {
            sessionStorage.setItem('view-as-user', '1')
            await supabase.auth.signOut()
            window.location.href = '/'
          }}
          title={!open ? 'Lihat sebagai pengguna' : undefined}
          className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-white/50 hover:text-white hover:bg-white/[0.08] transition text-xs"
        >
          <Users size={14} className="shrink-0" />
          {open && <span className="truncate">Lihat sebagai pengguna</span>}
        </button>
        <button
          onClick={handleLogout}
          title={!open ? 'Keluar' : undefined}
          className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-white/50 hover:text-red-400 hover:bg-red-500/10 transition text-xs"
        >
          <LogOut size={14} className="shrink-0" />
          {open && <span className="truncate">Keluar</span>}
        </button>
      </div>
    </aside>
  )
}