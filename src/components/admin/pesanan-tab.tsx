'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import {
  RefreshCw,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  Package,
  MapPin,
  CreditCard,
  PartyPopper,
  Ban,
  Calendar,
  Users
} from 'lucide-react'
import Image from 'next/image'
import PesananDetailModal from '@/components/admin/pesanan-detail-modal'

type Booking = Record<string, unknown>

const STATUS_GROUPS = [
  {
    key: 'pending',
    label: 'Menunggu Konfirmasi',
    icon: Clock,
    color: 'text-yellow-600',
    bg: 'bg-yellow-50',
    border: 'border-yellow-200',
    dot: 'bg-yellow-400'
  },
  {
    key: 'confirmed',
    label: 'Dikonfirmasi',
    icon: CheckCircle,
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    dot: 'bg-blue-400'
  },
  {
    key: 'paid',
    label: 'Sudah Dibayar',
    icon: CreditCard,
    color: 'text-green-600',
    bg: 'bg-green-50',
    border: 'border-green-200',
    dot: 'bg-green-400'
  },
  {
    key: 'done',
    label: 'Selesai / Berangkat',
    icon: PartyPopper,
    color: 'text-purple-600',
    bg: 'bg-purple-50',
    border: 'border-purple-200',
    dot: 'bg-purple-400'
  },
  {
    key: 'cancelled',
    label: 'Dibatalkan',
    icon: Ban,
    color: 'text-red-500',
    bg: 'bg-red-50',
    border: 'border-red-200',
    dot: 'bg-red-400'
  }
]

export default function PesananTab() {
  const [data, setData] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState<Booking | null>(null)
  const [updating, setUpdating] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  // refreshKey dipakai untuk memicu ulang useEffect dari tombol Refresh
  const [refreshKey, setRefreshKey] = useState(0)

  // Fungsi fetch dipisah agar bisa dipanggil dari handleStatusChange
  const fetchAll = async () => {
    setLoading(true)
    const [{ data: pb }, { data: db }] = await Promise.all([
      supabase
        .from('package_bookings')
        .select('*, packages(name, cover_image_url, location)')
        .order('created_at', { ascending: false }),
      supabase
        .from('destination_bookings')
        .select('*, destinations(name, cover_image_url, location)')
        .order('created_at', { ascending: false })
    ])
    const merged = [
      ...(pb ?? []).map((b) => ({
        ...b,
        _type: 'paket',
        _name: (b.packages as Record<string, string>)?.name ?? '-',
        _image: (b.packages as Record<string, string>)?.cover_image_url ?? '',
        _location: (b.packages as Record<string, string>)?.location ?? '-'
      })),
      ...(db ?? []).map((b) => ({
        ...b,
        _type: 'destinasi',
        _name: (b.destinations as Record<string, string>)?.name ?? '-',
        _image: (b.destinations as Record<string, string>)?.cover_image_url ?? '',
        _location: (b.destinations as Record<string, string>)?.location ?? '-'
      }))
    ].sort((a, b) => new Date(String(b.created_at)).getTime() - new Date(String(a.created_at)).getTime())
    setData(merged as Booking[])
    setLoading(false)
  }

  // Fetch awal & setiap kali refreshKey berubah — logika langsung di dalam effect
  useEffect(() => {
    let cancelled = false

    const load = async () => {
      setLoading(true)
      const [{ data: pb }, { data: db }] = await Promise.all([
        supabase
          .from('package_bookings')
          .select('*, packages(name, cover_image_url, location)')
          .order('created_at', { ascending: false }),
        supabase
          .from('destination_bookings')
          .select('*, destinations(name, cover_image_url, location)')
          .order('created_at', { ascending: false })
      ])
      const merged = [
        ...(pb ?? []).map((b) => ({
          ...b,
          _type: 'paket',
          _name: (b.packages as Record<string, string>)?.name ?? '-',
          _image: (b.packages as Record<string, string>)?.cover_image_url ?? '',
          _location: (b.packages as Record<string, string>)?.location ?? '-'
        })),
        ...(db ?? []).map((b) => ({
          ...b,
          _type: 'destinasi',
          _name: (b.destinations as Record<string, string>)?.name ?? '-',
          _image: (b.destinations as Record<string, string>)?.cover_image_url ?? '',
          _location: (b.destinations as Record<string, string>)?.location ?? '-'
        }))
      ].sort((a, b) => new Date(String(b.created_at)).getTime() - new Date(String(a.created_at)).getTime())

      if (!cancelled) {
        setData(merged as Booking[])
        setLoading(false)
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [refreshKey]) // hanya bergantung pada refreshKey, bukan fetchAll

  const handleStatusChange = async (booking: Booking, newStatus: string) => {
    setUpdating(String(booking.id))
    const table = booking._type === 'paket' ? 'package_bookings' : 'destination_bookings'
    const update: Record<string, unknown> = { status: newStatus }
    if (newStatus === 'done') update.paid_at = new Date().toISOString()
    await supabase.from(table).update(update).eq('id', String(booking.id))
    await fetchAll()
    if (selected?.id === booking.id) setSelected((prev) => (prev ? { ...prev, status: newStatus } : null))
    setUpdating(null)
  }

  const filtered = data.filter((row) => {
    if (!search) return true
    return [row._name, row.full_name, row.email, row.phone].some((v) =>
      String(v ?? '')
        .toLowerCase()
        .includes(search.toLowerCase())
    )
  })

  return (
    <div className="space-y-8">
      {/* Topbar */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div>
          <h2 className="font-bold text-[#0B2C4D] text-lg">Kelola Pesanan</h2>
          <p className="text-gray-400 text-xs mt-0.5">{data.length} total pesanan</p>
        </div>
        <div className="flex items-center gap-2">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari nama, email..."
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#0B2C4D]/40 w-48"
          />
          {/* Tombol refresh memicu ulang useEffect via refreshKey */}
          <button
            onClick={() => setRefreshKey((k) => k + 1)}
            className="w-8 h-8 rounded-lg border border-gray-200 hover:bg-gray-50 flex items-center justify-center text-gray-400 transition"
          >
            <RefreshCw size={14} />
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-7 h-7 border-2 border-gray-200 border-t-[#0B2C4D] rounded-full animate-spin" />
        </div>
      ) : (
        STATUS_GROUPS.map((group) => {
          const rows = filtered.filter((b) => b.status === group.key)
          const Icon = group.icon
          return (
            <div key={group.key} className="rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
              <div className={`flex items-center justify-between px-5 py-3.5 ${group.bg} border-b ${group.border}`}>
                <div className="flex items-center gap-2.5">
                  <div className={`w-2 h-2 rounded-full ${group.dot}`} />
                  <Icon size={15} className={group.color} />
                  <span className={`font-bold text-sm ${group.color}`}>{group.label}</span>
                  <span
                    className={`text-xs font-semibold px-2 py-0.5 rounded-full ${group.bg} ${group.color} border ${group.border}`}
                  >
                    {rows.length}
                  </span>
                </div>
              </div>

              {rows.length === 0 ? (
                <div className="bg-white px-5 py-8 text-center text-gray-400 text-sm">Tidak ada pesanan di kategori ini</div>
              ) : (
                <div className="bg-white divide-y divide-gray-50">
                  {rows.map((booking) => {
                    const date = String(booking.travel_date || booking.visit_date || '')
                    const imgSrc = String(booking._image ?? '')
                    const name = String(booking._name ?? '-')
                    const location = String(booking._location ?? '-')
                    const fullName = String(booking.full_name ?? '-')
                    const participants = String(booking.participants ?? '-')
                    const totalPrice = Number(booking.total_price ?? 0)
                    const paidAt = booking.paid_at ? String(booking.paid_at) : null
                    const bookingType = String(booking._type ?? '')
                    return (
                      <div
                        key={String(booking.id)}
                        className="flex items-center gap-4 px-5 py-4 hover:bg-gray-50/50 transition"
                      >
                        {imgSrc && (
                          <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0">
                            <Image src={imgSrc} alt={name} fill className="object-cover" />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span
                              className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${bookingType === 'paket' ? 'bg-blue-100 text-blue-600' : 'bg-emerald-100 text-emerald-600'}`}
                            >
                              {bookingType === 'paket' ? 'PAKET' : 'DESTINASI'}
                            </span>
                            <p className="font-semibold text-[#0B2C4D] text-sm truncate">{name}</p>
                          </div>
                          <div className="flex items-center gap-3 mt-1 flex-wrap">
                            <span className="text-xs text-gray-500">{fullName}</span>
                            <span className="text-gray-300">·</span>
                            <span className="flex items-center gap-1 text-xs text-gray-400">
                              <MapPin size={10} />
                              {location}
                            </span>
                            {date && (
                              <span className="flex items-center gap-1 text-xs text-gray-400">
                                <Calendar size={10} />
                                {new Date(date).toLocaleDateString('id-ID', {
                                  day: 'numeric',
                                  month: 'short',
                                  year: 'numeric'
                                })}
                              </span>
                            )}
                            <span className="flex items-center gap-1 text-xs text-gray-400">
                              <Users size={10} />
                              {participants} orang
                            </span>
                          </div>
                          {group.key === 'paid' && paidAt && (
                            <p className="text-[11px] text-green-600 mt-1">
                              ✓ Lunas pada {new Date(paidAt).toLocaleString('id-ID')}
                            </p>
                          )}
                          {group.key === 'done' && date && (
                            <p className="text-[11px] text-purple-600 mt-1">
                              ✈ Keberangkatan:{' '}
                              {new Date(date).toLocaleDateString('id-ID', {
                                weekday: 'long',
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric'
                              })}
                            </p>
                          )}
                        </div>
                        <div className="text-right shrink-0 hidden sm:block">
                          <p className="font-bold text-[#0B2C4D] text-sm">Rp {totalPrice.toLocaleString('id-ID')}</p>
                          <p className="text-[10px] text-gray-400">{bookingType}</p>
                        </div>
                        <div className="flex items-center gap-1.5 shrink-0">
                          <button
                            onClick={() => setSelected(booking)}
                            className="w-8 h-8 rounded-lg border border-gray-200 hover:bg-gray-100 flex items-center justify-center text-gray-400 transition"
                            title="Detail"
                          >
                            <Eye size={13} />
                          </button>
                          {booking.status === 'pending' && (
                            <>
                              <button
                                onClick={() => handleStatusChange(booking, 'confirmed')}
                                disabled={updating === String(booking.id)}
                                className="flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 border border-blue-200 transition disabled:opacity-50"
                              >
                                <CheckCircle size={11} /> Konfirmasi
                              </button>
                              <button
                                onClick={() => handleStatusChange(booking, 'cancelled')}
                                disabled={updating === String(booking.id)}
                                className="flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1.5 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 border border-red-200 transition disabled:opacity-50"
                              >
                                <XCircle size={11} /> Tolak
                              </button>
                            </>
                          )}
                          {booking.status === 'confirmed' && (
                            <button
                              onClick={() => handleStatusChange(booking, 'cancelled')}
                              disabled={updating === String(booking.id)}
                              className="flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1.5 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 border border-red-200 transition disabled:opacity-50"
                            >
                              <XCircle size={11} /> Batalkan
                            </button>
                          )}
                          {booking.status === 'paid' && (
                            <button
                              onClick={() => handleStatusChange(booking, 'done')}
                              disabled={updating === String(booking.id)}
                              className="flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1.5 rounded-lg bg-purple-50 text-purple-600 hover:bg-purple-100 border border-purple-200 transition disabled:opacity-50"
                            >
                              <Package size={11} /> Tandai Berangkat
                            </button>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })
      )}

      {selected && (
        <PesananDetailModal data={selected} onClose={() => setSelected(null)} onStatusChange={handleStatusChange} />
      )}
    </div>
  )
}
