'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/auth-context'
import { supabase } from '@/lib/supabase'
import Image from 'next/image'
import {
  Package,
  MapPin,
  Calendar,
  Users,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  CreditCard,
  Download,
  PartyPopper,
  Ban
} from 'lucide-react'

declare global {
  interface Window {
    snap: { pay: (token: string, options: Record<string, unknown>) => void }
  }
}

type Booking = {
  id: string
  full_name: string
  email: string
  phone: string
  participants: number
  total_price: number
  status: string
  notes: string
  created_at: string
  type: 'paket' | 'destinasi'
  title: string
  cover_image_url: string
  location: string
  travel_date?: string
  visit_date?: string
  payment_token?: string
  paid_at?: string
}

const statusConfig: Record<string, { label: string; color: string; icon: React.ElementType }> = {
  pending: { label: 'Menunggu Konfirmasi', color: 'bg-yellow-50 text-yellow-600 border-yellow-200', icon: Clock },
  confirmed: { label: 'Dikonfirmasi', color: 'bg-blue-50 text-blue-600 border-blue-200', icon: CheckCircle },
  paid: { label: 'Lunas', color: 'bg-green-50 text-green-600 border-green-200', icon: CheckCircle },
  cancelled: { label: 'Dibatalkan', color: 'bg-red-50 text-red-500 border-red-200', icon: XCircle },
  done: { label: 'Selesai', color: 'bg-purple-50 text-purple-600 border-purple-200', icon: PartyPopper }
}

export default function RiwayatPesananPage() {
  const { user, profile, loading } = useAuth()
  const router = useRouter()
  const [bookings, setBookings] = useState<Booking[]>([])
  const [fetching, setFetching] = useState(true)
  const [tab, setTab] = useState<'semua' | 'paket' | 'destinasi'>('semua')
  const [payingId, setPayingId] = useState<string | null>(null)

  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://app.sandbox.midtrans.com/snap/snap.js'
    script.setAttribute('data-client-key', process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY ?? '')
    script.onload = () => console.log('✅ Snap.js loaded, window.snap:', typeof window.snap)
    script.onerror = () => console.error('❌ Snap.js GAGAL dimuat!')
    document.head.appendChild(script)
    return () => {
      if (document.head.contains(script)) document.head.removeChild(script)
    }
  }, [])

  useEffect(() => {
    if (!loading && !user) router.push('/auth/login?redirect=/riwayat-pesanan')
    if (!loading && profile?.role === 'admin') router.push('/admin')
  }, [user, loading, router, profile?.role])

  const fetchData = async (userId: string) => {
    setFetching(true)
    const [{ data: pb }, { data: db }] = await Promise.all([
      supabase
        .from('package_bookings')
        .select('*, packages(name, cover_image_url, location)')
        .eq('user_id', userId)
        .order('created_at', { ascending: false }),
      supabase
        .from('destination_bookings')
        .select('*, destinations(name, cover_image_url, location)')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
    ])
    const mapped: Booking[] = [
      ...(pb ?? []).map((b: Record<string, unknown>) => ({
        ...(b as Booking),
        type: 'paket' as const,
        title: (b.packages as Record<string, string>)?.name ?? '-',
        cover_image_url: (b.packages as Record<string, string>)?.cover_image_url ?? '',
        location: (b.packages as Record<string, string>)?.location ?? '-'
      })),
      ...(db ?? []).map((b: Record<string, unknown>) => ({
        ...(b as Booking),
        type: 'destinasi' as const,
        title: (b.destinations as Record<string, string>)?.name ?? '-',
        cover_image_url: (b.destinations as Record<string, string>)?.cover_image_url ?? '',
        location: (b.destinations as Record<string, string>)?.location ?? '-'
      }))
    ].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    setBookings(mapped)
    setFetching(false)
  }

  useEffect(() => {
    if (!user) return
    let cancelled = false

    const load = async () => {
      setFetching(true)
      const [{ data: pb }, { data: db }] = await Promise.all([
        supabase
          .from('package_bookings')
          .select('*, packages(name, cover_image_url, location)')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false }),
        supabase
          .from('destination_bookings')
          .select('*, destinations(name, cover_image_url, location)')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
      ])
      const mapped: Booking[] = [
        ...(pb ?? []).map((b: Record<string, unknown>) => ({
          ...(b as Booking),
          type: 'paket' as const,
          title: (b.packages as Record<string, string>)?.name ?? '-',
          cover_image_url: (b.packages as Record<string, string>)?.cover_image_url ?? '',
          location: (b.packages as Record<string, string>)?.location ?? '-'
        })),
        ...(db ?? []).map((b: Record<string, unknown>) => ({
          ...(b as Booking),
          type: 'destinasi' as const,
          title: (b.destinations as Record<string, string>)?.name ?? '-',
          cover_image_url: (b.destinations as Record<string, string>)?.cover_image_url ?? '',
          location: (b.destinations as Record<string, string>)?.location ?? '-'
        }))
      ].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())

      if (!cancelled) {
        setBookings(mapped)
        setFetching(false)
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [user])

  // gimmick langsung pembayaran berhasil
  const handlePay = async (booking: Booking) => {
    setPayingId(booking.id)

    try {
      const res = await fetch('/api/payment/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bookingId: booking.id,
          bookingType: booking.type,
          amount: booking.total_price,
          customerName: booking.full_name,
          customerEmail: booking.email,
          customerPhone: booking.phone,
          itemName: booking.title
        })
      })

      const data = await res.json()

      if (!data.token || typeof window.snap === 'undefined') {
        alert('Snap tidak siap / token gagal')
        setPayingId(null)
        return
      }

      // 🔥 OPEN SNAP POPUP
      window.snap.pay(data.token, {
        onSuccess: () => {},
        onPending: () => {},
        onError: () => {},

        onClose: () => {
          console.log('🚪 Snap ditutup (block redirect)')
        }
      })

      // 🔥 AUTO CLOSE SNAP + FORCE SUCCESS
      setTimeout(async () => {
        console.log('⚡ FORCE SUCCESS + CLOSE SNAP')

        // tutup popup (paksa)
        const snapFrame = document.querySelector('iframe.snap-midtrans')
        if (snapFrame) {
          snapFrame.remove()
        }

        await supabase
          .from(booking.type === 'paket' ? 'package_bookings' : 'destination_bookings')
          .update({
            status: 'paid',
            paid_at: new Date().toISOString(),
            payment_token: data.order_id
          })
          .eq('id', booking.id)

        await fetchData(user!.id)

        setPayingId(null)
      }, 2000)
    } catch (err) {
      console.error('❌ handlePay error:', err)
      setPayingId(null)
    }
  }
  // sampe sini

const handleDownloadBukti = async (booking: Booking) => {
  const { default: jsPDF } = await import('jspdf') // 🔥 dynamic import (ANTI ERROR)

  const doc = new jsPDF()

  const date = booking.travel_date || booking.visit_date

  const left = 20
  const right = 190
  let y = 20

  // HEADER
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(18)
  doc.text('NusaTrip', 105, y, { align: 'center' })

  y += 8
  doc.setFontSize(11)
  doc.setTextColor(120)
  doc.text('E-Receipt / Bukti Pembayaran', 105, y, { align: 'center' })

  y += 10
  doc.setTextColor(22, 163, 74)
  doc.setFontSize(12)
  doc.text('PEMBAYARAN BERHASIL', 105, y, { align: 'center' })

  // garis
  y += 8
  doc.setDrawColor(220)
  doc.line(left, y, right, y)

  y += 10

  const row = (label: string, value: string) => {
    doc.setFontSize(11)
    doc.setTextColor(120)
    doc.setFont('helvetica', 'normal')
    doc.text(label, left, y)

    doc.setFont('helvetica', 'bold')
    doc.setTextColor(0)
    doc.text(value, right, y, { align: 'right' })

    y += 8
  }

  row('ID Pesanan', booking.id)
  row('Nama', booking.full_name)
  row('Wisata', booking.title)
  row('Lokasi', booking.location)
  row(
    'Tanggal',
    date
      ? new Date(date).toLocaleDateString('id-ID', {
          weekday: 'long',
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        })
      : '-'
  )
  row('Peserta', `${booking.participants} Orang`)

  // total
  y += 5
  doc.line(left, y, right, y)

  y += 10
  doc.setFontSize(13)
  doc.setFont('helvetica', 'bold')

  doc.text('Total Pembayaran', left, y)
  doc.text(`Rp ${Number(booking.total_price).toLocaleString('id-ID')}`, right, y, { align: 'right' })

  y += 8
  doc.setFontSize(10)
  doc.setTextColor(120)
  doc.setFont('helvetica', 'normal')

  doc.text('Tanggal Bayar', left, y)
  doc.text(booking.paid_at ? new Date(booking.paid_at).toLocaleString('id-ID') : '-', right, y, { align: 'right' })

  // footer
  y += 20
  doc.setFontSize(9)
  doc.setTextColor(140)
  doc.text('Terima kasih telah memesan di NusaTrip\nSelamat berlibur & nikmati perjalanan Anda ✨', 105, y, {
    align: 'center'
  })

  doc.save(`bukti-${booking.id.slice(0, 8)}.pdf`)
}

  const filtered = tab === 'semua' ? bookings : bookings.filter((b) => b.type === tab)

  if (loading || fetching)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-8 h-8 border-2 border-gray-200 border-t-[#0B2C4D] rounded-full animate-spin" />
      </div>
    )

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-[#0B2C4D] pt-20 pb-10 px-6">
        <div className="max-w-[900px] mx-auto">
          <p className="text-white/50 text-sm mb-1">Akun Saya</p>
          <h1 className="font-montserrat font-bold text-2xl text-white">Riwayat Pesanan</h1>
          <p className="text-white/60 text-sm mt-1">
            Halo, <span className="text-white font-medium">{profile?.full_name}</span> — {bookings.length} total pesanan
          </p>
        </div>
      </div>

      <div className="max-w-[900px] mx-auto px-6 py-8">
        <div className="flex gap-2 mb-6 flex-wrap">
          {(['semua', 'paket', 'destinasi'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                tab === t
                  ? 'bg-[#0B2C4D] text-white shadow-sm'
                  : 'bg-white text-gray-500 border border-gray-200 hover:border-gray-300'
              }`}
            >
              {t === 'semua'
                ? `Semua (${bookings.length})`
                : t === 'paket'
                  ? `Paket (${bookings.filter((b) => b.type === 'paket').length})`
                  : `Destinasi (${bookings.filter((b) => b.type === 'destinasi').length})`}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 p-16 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Package size={24} className="text-gray-400" />
            </div>
            <p className="font-semibold text-gray-600 mb-1">Belum ada pesanan</p>
            <p className="text-sm text-gray-400 mb-6">Yuk mulai jelajahi wisata Indonesia!</p>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => router.push('/paket-wisata')}
                className="bg-[#FB8C00] hover:bg-orange-500 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition"
              >
                Paket Wisata
              </button>
              <button
                onClick={() => router.push('/destinasi')}
                className="border border-[#0B2C4D] text-[#0B2C4D] text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-gray-50 transition"
              >
                Destinasi
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="space-y-4">
              {filtered.map((booking) => {
                const status = statusConfig[booking.status] ?? statusConfig.pending
                const StatusIcon = status.icon
                const date = booking.travel_date || booking.visit_date
                return (
                  <div
                    key={booking.id}
                    className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition"
                  >
                    <div className="flex flex-col sm:flex-row">
                      {booking.cover_image_url && (
                        <div className="relative w-full sm:w-[160px] h-[140px] sm:h-auto shrink-0">
                          <Image src={booking.cover_image_url} alt={booking.title} fill className="object-cover" />
                          <div className="absolute top-3 left-3">
                            <span
                              className={`text-[10px] font-bold px-2 py-1 rounded-full ${booking.type === 'paket' ? 'bg-blue-500 text-white' : 'bg-emerald-500 text-white'}`}
                            >
                              {booking.type === 'paket' ? 'PAKET' : 'DESTINASI'}
                            </span>
                          </div>
                        </div>
                      )}
                      <div className="flex-1 p-5">
                        <div className="flex items-start justify-between gap-3 mb-3 flex-wrap">
                          <div>
                            <h3 className="font-semibold text-[#0B2C4D] text-base leading-tight">{booking.title}</h3>
                            <div className="flex items-center gap-1 mt-1 text-gray-400 text-xs">
                              <MapPin size={11} /> {booking.location}
                            </div>
                          </div>
                          <span
                            className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border shrink-0 ${status.color}`}
                          >
                            <StatusIcon size={12} /> {status.label}
                          </span>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
                          {date && (
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                              <Calendar size={13} className="text-orange-400 shrink-0" />
                              <span>
                                {new Date(date).toLocaleDateString('id-ID', {
                                  day: 'numeric',
                                  month: 'long',
                                  year: 'numeric'
                                })}
                              </span>
                            </div>
                          )}
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <Users size={13} className="text-orange-400 shrink-0" />
                            <span>{booking.participants} Peserta</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <Clock size={13} className="text-orange-400 shrink-0" />
                            <span>Dipesan {new Date(booking.created_at).toLocaleDateString('id-ID')}</span>
                          </div>
                        </div>

                        <div className="flex items-end justify-between pt-3 border-t border-gray-100 gap-3 flex-wrap">
                          <div>
                            <p className="text-xs text-gray-400">Total Pembayaran</p>
                            <p className="font-bold text-[#0B2C4D] text-base">
                              Rp {Number(booking.total_price).toLocaleString('id-ID')}
                            </p>
                          </div>
                          <div className="flex flex-col items-end gap-2">
                            {booking.status === 'pending' && (
                              <div className="flex items-center gap-1.5 text-xs text-yellow-600 bg-yellow-50 px-3 py-1.5 rounded-full border border-yellow-200">
                                <AlertCircle size={12} /> Menunggu dikonfirmasi admin
                              </div>
                            )}
                            {booking.status === 'confirmed' && (
                              <>
                                <div className="flex items-center gap-1.5 text-xs text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full border border-blue-200">
                                  <CheckCircle size={12} /> Pesanan dikonfirmasi — segera lakukan pembayaran
                                </div>
                                <button
                                  onClick={() => handlePay(booking)}
                                  disabled={payingId === booking.id}
                                  className="flex items-center gap-2 bg-[#FB8C00] hover:bg-orange-500 disabled:opacity-60 text-white text-xs font-semibold px-4 py-2 rounded-full transition"
                                >
                                  <CreditCard size={13} />
                                  {payingId === booking.id ? 'Memproses...' : 'Bayar Sekarang'}
                                </button>
                              </>
                            )}
                            {booking.status === 'paid' && (
                              <>
                                <div className="flex items-center gap-1.5 text-xs text-green-600 bg-green-50 px-3 py-1.5 rounded-full border border-green-200">
                                  <CheckCircle size={12} /> Pembayaran berhasil — persiapkan keberangkatan Anda!
                                </div>
                                <button
                                  onClick={() => handleDownloadBukti(booking)}
                                  className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white text-xs font-semibold px-4 py-2 rounded-full transition"
                                >
                                  <Download size={13} /> Download Bukti Pembayaran
                                </button>
                                <p className="text-[11px] text-gray-400 italic text-right">
                                  Segera persiapkan keberangkatan sesuai jadwal. Selamat berlibur! 🎉
                                </p>
                              </>
                            )}
                            {booking.status === 'done' && (
                              <div className="flex items-center gap-1.5 text-xs text-purple-600 bg-purple-50 px-3 py-1.5 rounded-full border border-purple-200">
                                <PartyPopper size={12} /> Perjalanan selesai — terima kasih telah bersama NusaTrip!
                              </div>
                            )}
                            {booking.status === 'cancelled' && (
                              <div className="flex items-center gap-1.5 text-xs text-red-500 bg-red-50 px-3 py-1.5 rounded-full border border-red-200">
                                <Ban size={12} /> Pesanan dibatalkan — hubungi admin untuk informasi lebih lanjut
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
            <div className="mt-8 p-6 bg-white rounded-2xl border border-gray-100 text-center">
              <p className="text-sm text-gray-500 mb-4">Mau menjelajahi wisata lainnya?</p>
              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={() => router.push('/paket-wisata')}
                  className="bg-[#FB8C00] hover:bg-orange-500 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition"
                >
                  Lihat Paket Wisata
                </button>
                <button
                  onClick={() => router.push('/destinasi')}
                  className="border border-[#0B2C4D] text-[#0B2C4D] text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-gray-50 transition"
                >
                  Lihat Destinasi
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
