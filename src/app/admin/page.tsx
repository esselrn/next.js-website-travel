'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/auth-context'
import { supabase } from '@/lib/supabase'
import { Bell, RefreshCw, Menu } from 'lucide-react'
import AdminSidebar, { type Tab, NAV_ITEMS } from '@/components/admin/admin-sidebar'
import OverviewTab, { type Stats } from '@/components/admin/overview-tab'
import PesananTab from '@/components/admin/pesanan-tab'
import CrudTab from '@/components/admin/crud-tab'

const CRUD_TABS: Tab[] = ['paket', 'destinasi', 'blog', 'pengguna', 'kontak', 'newsletter', 'team', 'gallery']

export default function AdminPage() {
  const { user, profile, loading } = useAuth()
  const router = useRouter()
  const [tab, setTab] = useState<Tab>('overview')
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [stats, setStats] = useState<Stats | null>(null)

  // On mobile default closed
  useEffect(() => {
    const check = () => {
      if (window.innerWidth < 768) setSidebarOpen(false)
      else setSidebarOpen(true)
    }
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  useEffect(() => {
    if (!loading && (!user || profile?.role !== 'admin')) {
      if (sessionStorage.getItem('view-as-user')) {
        sessionStorage.removeItem('view-as-user')
        return
      }
      router.push('/auth/login')
    }
  }, [user, profile, loading, router])

  const fetchStats = useCallback(async () => {
    const [
      { count: packages },
      { count: destinations },
      { count: packageBookings },
      { count: destBookings },
      { count: pendingBookings },
      { count: confirmedBookings },
      { count: cancelledBookings },
      { count: doneBookings },
      { count: users },
      { count: contacts },
      { count: newsletters },
      { count: blogs }
    ] = await Promise.all([
      supabase.from('packages').select('id', { count: 'exact', head: true }),
      supabase.from('destinations').select('id', { count: 'exact', head: true }),
      supabase.from('package_bookings').select('id', { count: 'exact', head: true }),
      supabase.from('destination_bookings').select('id', { count: 'exact', head: true }),
      supabase.from('package_bookings').select('id', { count: 'exact', head: true }).eq('status', 'pending'),
      supabase.from('package_bookings').select('id', { count: 'exact', head: true }).eq('status', 'confirmed'),
      supabase.from('package_bookings').select('id', { count: 'exact', head: true }).eq('status', 'cancelled'),
      supabase.from('package_bookings').select('id', { count: 'exact', head: true }).eq('status', 'done'),
      supabase.from('users').select('id', { count: 'exact', head: true }),
      supabase.from('contacts').select('id', { count: 'exact', head: true }),
      supabase.from('newsletters').select('id', { count: 'exact', head: true }),
      supabase.from('blogs').select('id', { count: 'exact', head: true })
    ])
    setStats({
      packages: packages ?? 0,
      destinations: destinations ?? 0,
      packageBookings: packageBookings ?? 0,
      destBookings: destBookings ?? 0,
      pendingBookings: pendingBookings ?? 0,
      confirmedBookings: confirmedBookings ?? 0,
      cancelledBookings: cancelledBookings ?? 0,
      doneBookings: doneBookings ?? 0,
      users: users ?? 0,
      contacts: contacts ?? 0,
      newsletters: newsletters ?? 0,
      blogs: blogs ?? 0
    })
  }, [])

  useEffect(() => {
    if (profile?.role === 'admin') {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      fetchStats()
    }
  }, [profile, fetchStats])

  if (loading || !profile)
    return (
      <div className="min-h-screen bg-[#0B2C4D] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
      </div>
    )
  if (profile.role !== 'admin') return null

  const currentLabel = NAV_ITEMS.find((n: { id: Tab }) => n.id === tab)?.label ?? 'Dashboard'
  const sidebarW = sidebarOpen ? 'ml-[220px]' : 'ml-[52px]'

  return (
    <div className="min-h-screen bg-[#F0F4F8] flex">
      <AdminSidebar
        tab={tab}
        setTab={setTab}
        open={sidebarOpen}
        setOpen={setSidebarOpen}
        adminName={profile.full_name ?? 'Admin'}
        adminEmail={user?.email ?? ''}
      />

      <main className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ${sidebarW} min-w-0`}>
        {/* Topbar */}
        <header className="sticky top-0 z-30 bg-white border-b border-gray-100">
          <div className="flex items-center justify-between h-[60px] px-4 gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <button
                onClick={() => setSidebarOpen((o) => !o)}
                className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-500 transition shrink-0"
              >
                <Menu size={17} />
              </button>
              <div className="min-w-0">
                <h1 className="font-bold text-[#0B2C4D] text-sm md:text-base leading-tight truncate">{currentLabel}</h1>
                <p className="text-[10px] text-gray-400 hidden sm:block">Admin Panel NusaTrip</p>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              {(stats?.pendingBookings ?? 0) > 0 && (
                <button
                  onClick={() => setTab('pesanan')}
                  className="flex items-center gap-1.5 bg-amber-50 border border-amber-200 text-amber-700 text-xs font-semibold px-2.5 py-1.5 rounded-full transition hover:bg-amber-100"
                >
                  <Bell size={12} />
                  <span className="hidden sm:inline">{stats!.pendingBookings} pending</span>
                  <span className="sm:hidden">{stats!.pendingBookings}</span>
                </button>
              )}
              <button
                onClick={fetchStats}
                className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-400 transition"
              >
                <RefreshCw size={14} />
              </button>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 p-3 md:p-6 min-w-0 overflow-x-hidden">
          {tab === 'overview' && <OverviewTab stats={stats} setTab={setTab} />}
          {tab === 'pesanan' && <PesananTab />}
          {CRUD_TABS.includes(tab) && <CrudTab tab={tab} onDataChange={fetchStats} />}
        </div>
      </main>
    </div>
  )
}