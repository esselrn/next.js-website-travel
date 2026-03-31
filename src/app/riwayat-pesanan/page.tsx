'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/auth-context'
import { useNotif } from '@/contexts/notif-context'
import { supabase } from '@/lib/supabase'
import Image from 'next/image'
import jsPDF from 'jspdf'
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

function trunc(s: string, n: number) {
  return s && s.length > n ? s.slice(0, n - 1) + '...' : s || '-'
}

// ── Generate PDF struk bukti pembayaran ──────────────────────────────────────
async function generateReceiptPDF(booking: Booking): Promise<void> {
  const date = booking.travel_date || booking.visit_date
  const fmtDate = date
    ? new Date(date).toLocaleDateString('id-ID', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      })
    : '-'
  const issuedAt = new Date().toLocaleString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
  const paidAt = booking.paid_at
    ? new Date(booking.paid_at).toLocaleString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    : '-'

  const code = `NT-${booking.id.slice(0, 8).toUpperCase()}`
  const pricePerPax = Math.round(booking.total_price / booking.participants)
  const W = 80 // lebar struk mm

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const doc: any = new jsPDF({ unit: 'mm', format: [W, 260], orientation: 'portrait' })

  let y = 0
  const px = 6 // padding kiri-kanan

  /* ── helpers ─────────────────────────────────── */
  function mv(n: number) {
    y += n
  }

  function line(dashed = false) {
    doc.setDrawColor(200, 200, 200)
    doc.setLineWidth(0.2)
    if (dashed) {
      const step = 1.5
      for (let x = px; x < W - px; x += step * 2) {
        doc.line(x, y, Math.min(x + step, W - px), y)
      }
    } else {
      doc.line(px, y, W - px, y)
    }
    mv(3.5)
  }

  function text(
    str: string,
    x: number,
    size: number,
    bold = false,
    align: 'left' | 'center' | 'right' = 'left',
    r = 30,
    g = 30,
    b = 30
  ) {
    doc.setFont('courier', bold ? 'bold' : 'normal')
    doc.setFontSize(size)
    doc.setTextColor(r, g, b)
    doc.text(str, x, y, { align })
    mv(size * 0.47)
  }

  function row(label: string, value: string, bold = false) {
    doc.setFont('courier', 'normal')
    doc.setFontSize(7.5)
    doc.setTextColor(110, 110, 110)
    doc.text(label, px + 1, y)
    doc.setFont('courier', bold ? 'bold' : 'normal')
    doc.setTextColor(25, 25, 25)
    doc.text(trunc(value, 28), W - px - 1, y, { align: 'right' })
    mv(5)
  }

  function sectionHeader(title: string) {
    doc.setFillColor(245, 248, 252)
    doc.rect(px, y - 1, W - px * 2, 7, 'F')
    doc.setFont('courier', 'bold')
    doc.setFontSize(7)
    doc.setTextColor(11, 44, 77)
    doc.text(title, px + 2, y + 4)
    mv(8)
  }

  /* ── HEADER ──────────────────────────────────── */
  mv(9)
  text('NUSATRIP', W / 2, 18, true, 'center', 11, 44, 77)
  mv(1)
  text('Bukti Pembayaran', W / 2, 8, false, 'center', 140, 140, 140)
  mv(3)
  line()

  // Badge LUNAS
  doc.setFillColor(22, 163, 74)
  doc.roundedRect(W / 2 - 16, y, 32, 8.5, 4, 4, 'F')
  doc.setFont('courier', 'bold')
  doc.setFontSize(8.5)
  doc.setTextColor(255, 255, 255)
  doc.text('LUNAS', W / 2, y + 5.6, { align: 'center' })
  mv(14)

  text('KODE BOOKING', W / 2, 7, false, 'center', 150, 150, 150)
  mv(0.5)
  text(code, W / 2, 14, true, 'center', 11, 44, 77)
  mv(3)
  line(true)

  /* ── DETAIL WISATA ───────────────────────────── */
  sectionHeader('DETAIL WISATA')
  row('Nama Wisata', trunc(booking.title, 28))
  row('Lokasi', trunc(booking.location, 28))
  row('Tipe', booking.type === 'paket' ? 'Paket Wisata' : 'Destinasi Wisata')
  row('Tanggal', trunc(fmtDate, 28))
  mv(1)
  line(true)

  /* ── DETAIL PEMESAN ──────────────────────────── */
  sectionHeader('DETAIL PEMESAN')
  row('Nama', trunc(booking.full_name, 28))
  row('Email', trunc(booking.email, 28))
  row('Telepon', booking.phone || '-')
  row('Jumlah Peserta', `${booking.participants} orang`)
  mv(1)
  line(true)

  /* ── RINCIAN PEMBAYARAN ──────────────────────── */
  sectionHeader('RINCIAN PEMBAYARAN')
  row('Harga/orang', `Rp ${Number(pricePerPax).toLocaleString('id-ID')}`)
  row('Peserta', `x ${booking.participants}`)
  mv(1)
  line()

  // Kotak total
  doc.setFillColor(237, 245, 255)
  doc.rect(px, y, W - px * 2, 12, 'F')
  doc.setFont('courier', 'normal')
  doc.setFontSize(7.5)
  doc.setTextColor(100, 100, 100)
  doc.text('TOTAL BAYAR', px + 3, y + 5.2)
  doc.setFont('courier', 'bold')
  doc.setFontSize(11)
  doc.setTextColor(11, 44, 77)
  doc.text(`Rp ${Number(booking.total_price).toLocaleString('id-ID')}`, W - px - 3, y + 6, { align: 'right' })
  mv(15)
  line(true)

  /* ── INFORMASI TRANSAKSI ─────────────────────── */
  sectionHeader('INFORMASI TRANSAKSI')
  row('Dibayar pada', trunc(paidAt, 26))
  row('Diterbitkan', trunc(issuedAt, 26))
  row('Status', 'LUNAS', true)
  mv(1)
  line()

  /* ── FOOTER ──────────────────────────────────── */
  mv(1)
  text('SELAMAT BERLIBUR!', W / 2, 9, true, 'center', 251, 140, 0)
  mv(2)
  text('Tunjukkan bukti ini kepada', W / 2, 6.5, false, 'center', 160, 160, 160)
  text('pemandu wisata saat check-in.', W / 2, 6.5, false, 'center', 160, 160, 160)
  mv(4)
  line(true)
  text('NusaTrip  |  www.nusatrip.id', W / 2, 6.5, false, 'center', 170, 170, 170)
  mv(8)

  /* ── Trim tinggi & save ───────────────────────── */
  doc.internal.pageSize.height = y
  doc.save(`NusaTrip-BuktiPembayaran-${code}.pdf`)
}

export default function RiwayatPesananPage() {
  const { user, profile, loading } = useAuth()
  const router = useRouter()
  const { clearNotif, showToast } = useNotif()
  const [bookings, setBookings] = useState<Booking[]>([])
  const [fetching, setFetching] = useState(true)
  const [tab, setTab] = useState<'semua' | 'paket' | 'destinasi'>('semua')
  const [payingId, setPayingId] = useState<string | null>(null)

  useEffect(() => {
    clearNotif()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!loading && !user) router.push('/auth/login?redirect=/riwayat-pesanan')
    if (!loading && profile?.role === 'admin') router.push('/admin')
  }, [user, loading, router, profile?.role])

  const fetchData = useCallback(async () => {
    if (!user) return
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
    setBookings(mapped)
    setFetching(false)
  }, [user])

  useEffect(() => {
    if (!loading && user) fetchData()
  }, [user, loading, fetchData])

  // ── MOCK PAY — simulasi Midtrans lalu otomatis lunas ──────────────────────
  const handlePay = async (booking: Booking) => {
    setPayingId(booking.id)
    showToast('payment', 'Memproses Pembayaran', 'Membuka halaman pembayaran Midtrans...')
    await new Promise((r) => setTimeout(r, 1800))
    showToast('payment', 'Midtrans Sandbox', 'Memverifikasi pembayaran secara otomatis...')
    await new Promise((r) => setTimeout(r, 1500))
    try {
      const table = booking.type === 'paket' ? 'package_bookings' : 'destination_bookings'
      const { error } = await supabase
        .from(table)
        .update({ status: 'paid', paid_at: new Date().toISOString() })
        .eq('id', booking.id)
      if (error) throw error
      await fetchData()
      setPayingId(null)
      showToast(
        'success',
        'Pembayaran Berhasil! 🎉',
        `Pesanan ${booking.title} telah lunas. Silakan download bukti pembayaran Anda!`,
        6000
      )
    } catch {
      setPayingId(null)
      showToast('error', 'Gagal Update Status', 'Terjadi kesalahan. Coba lagi.')
    }
  }

  const handleDownloadBukti = async (booking: Booking) => {
    showToast('payment', 'Menyiapkan PDF', 'Membuat bukti pembayaran...')
    try {
      await generateReceiptPDF(booking)
      showToast('success', 'Bukti Diunduh', 'PDF bukti pembayaran berhasil diunduh.')
    } catch (err) {
      console.error('PDF error:', err)
      showToast('error', 'Gagal Mengunduh', String(err instanceof Error ? err.message : 'Tidak dapat membuat PDF.'))
    }
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
      {/* HEADER */}
      <div className="bg-[#0B2C4D] pt-20 pb-10 px-6">
        <div className="max-w-[900px] mx-auto">
          <div className="flex items-center justify-between mb-1">
            <p className="text-white/50 text-sm">Akun Saya</p>
            <button
              onClick={() => router.push('/profil')}
              className="text-xs text-white/50 hover:text-white border border-white/20 hover:border-white/40 px-3 py-1 rounded-full transition"
            >
              Edit Profil
            </button>
          </div>
          <h1 className="font-montserrat font-bold text-2xl text-white">Riwayat Pesanan</h1>
          <p className="text-white/60 text-sm mt-1">
            Halo, <span className="text-white font-medium">{profile?.full_name}</span> — {bookings.length} total pesanan
          </p>
        </div>
      </div>

      <div className="max-w-[900px] mx-auto px-6 py-8">
        {/* Filter tabs */}
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
                              className={`text-[10px] font-bold px-2 py-1 rounded-full ${
                                booking.type === 'paket' ? 'bg-blue-500 text-white' : 'bg-emerald-500 text-white'
                              }`}
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
                              <div className="flex flex-col items-end gap-2">
                                <div className="flex items-center gap-1.5 text-xs text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full border border-blue-200">
                                  <CheckCircle size={12} /> Dikonfirmasi — segera bayar
                                </div>
                                <button
                                  onClick={() => handlePay(booking)}
                                  disabled={payingId === booking.id}
                                  className="flex items-center gap-2 bg-[#FB8C00] hover:bg-orange-500 disabled:opacity-60 text-white text-xs font-semibold px-4 py-2 rounded-full transition"
                                >
                                  <CreditCard size={13} />
                                  {payingId === booking.id ? 'Memproses...' : 'Bayar Sekarang'}
                                </button>
                              </div>
                            )}

                            {booking.status === 'paid' && (
                              <div className="flex flex-col items-end gap-2">
                                <div className="flex items-center gap-1.5 text-xs text-green-600 bg-green-50 px-3 py-1.5 rounded-full border border-green-200">
                                  <CheckCircle size={12} /> Lunas — persiapkan keberangkatan!
                                </div>
                                <button
                                  onClick={() => handleDownloadBukti(booking)}
                                  className="flex items-center gap-2 bg-[#0B2C4D] hover:bg-[#0d3560] text-white text-xs font-semibold px-4 py-2 rounded-full transition"
                                >
                                  <Download size={13} /> Download Bukti Pembayaran
                                </button>
                              </div>
                            )}

                            {booking.status === 'done' && (
                              <div className="flex flex-col items-end gap-2">
                                <div className="flex items-center gap-1.5 text-xs text-purple-600 bg-purple-50 px-3 py-1.5 rounded-full border border-purple-200">
                                  <PartyPopper size={12} /> Perjalanan selesai — terima kasih!
                                </div>
                                <button
                                  onClick={() => handleDownloadBukti(booking)}
                                  className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold px-4 py-2 rounded-full transition"
                                >
                                  <Download size={13} /> Download Bukti Pembayaran
                                </button>
                              </div>
                            )}

                            {booking.status === 'cancelled' && (
                              <div className="flex items-center gap-1.5 text-xs text-red-500 bg-red-50 px-3 py-1.5 rounded-full border border-red-200">
                                <Ban size={12} /> Dibatalkan — hubungi admin
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