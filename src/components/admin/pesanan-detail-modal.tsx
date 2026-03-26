'use client'

import { useEffect } from 'react'
import {
  X,
  MapPin,
  Calendar,
  Users,
  Phone,
  Mail,
  CreditCard,
  CheckCircle,
  Clock,
  XCircle,
  Package,
  PartyPopper,
  Ban
} from 'lucide-react'
import Image from 'next/image'

type Booking = Record<string, unknown>

const STATUS_CONFIG: Record<string, { label: string; color: string; icon: React.ElementType }> = {
  pending: { label: 'Menunggu Konfirmasi', color: 'bg-yellow-50 text-yellow-600 border-yellow-200', icon: Clock },
  confirmed: { label: 'Dikonfirmasi', color: 'bg-blue-50 text-blue-600 border-blue-200', icon: CheckCircle },
  paid: { label: 'Lunas', color: 'bg-green-50 text-green-600 border-green-200', icon: CreditCard },
  done: { label: 'Selesai / Berangkat', color: 'bg-purple-50 text-purple-600 border-purple-200', icon: PartyPopper },
  cancelled: { label: 'Dibatalkan', color: 'bg-red-50 text-red-500 border-red-200', icon: Ban }
}

interface Props {
  data: Booking
  onClose: () => void
  onStatusChange: (booking: Booking, status: string) => void
}

export default function PesananDetailModal({ data, onClose, onStatusChange }: Props) {
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [onClose])

  const statusKey = String(data.status ?? 'pending')
  const status = STATUS_CONFIG[statusKey] ?? STATUS_CONFIG.pending
  const StatusIcon = status.icon
  const date = String(data.travel_date || data.visit_date || '')
  const imgSrc = String(data._image ?? '')
  const name = String(data._name ?? '-')
  const location = String(data._location ?? '-')
  const fullName = String(data.full_name ?? '-')
  const email = String(data.email ?? '-')
  const phone = String(data.phone ?? '-')
  const participants = String(data.participants ?? '-')
  const totalPrice = Number(data.total_price ?? 0)
  const paidAt = data.paid_at ? String(data.paid_at) : null
  const paymentToken = data.payment_token ? String(data.payment_token) : null
  const notes = data.notes ? String(data.notes) : null
  const bookingType = String(data._type ?? '')

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] flex flex-col overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 shrink-0">
          <h3 className="font-bold text-[#0B2C4D] text-base">Detail Pesanan</h3>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-400 transition"
          >
            <X size={16} />
          </button>
        </div>

        <div className="overflow-y-auto flex-1 p-6 space-y-5">
          {imgSrc && (
            <div className="relative w-full h-[160px] rounded-xl overflow-hidden">
              <Image src={imgSrc} alt={name} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-3 left-3">
                <span
                  className={`text-[10px] font-bold px-2 py-1 rounded-full ${bookingType === 'paket' ? 'bg-blue-500 text-white' : 'bg-emerald-500 text-white'}`}
                >
                  {bookingType === 'paket' ? 'PAKET' : 'DESTINASI'}
                </span>
              </div>
            </div>
          )}

          <div>
            <h4 className="font-bold text-[#0B2C4D] text-lg">{name}</h4>
            <div className="flex items-center gap-1 text-gray-400 text-xs mt-1">
              <MapPin size={11} /> {location}
            </div>
          </div>

          <div className={`flex items-center gap-2 px-4 py-3 rounded-xl border ${status.color}`}>
            <StatusIcon size={15} />
            <div>
              <p className="font-semibold text-sm">{status.label}</p>
              {statusKey === 'paid' && paidAt && (
                <p className="text-xs opacity-75">Lunas pada {new Date(paidAt).toLocaleString('id-ID')}</p>
              )}
              {statusKey === 'done' && date && (
                <p className="text-xs opacity-75">
                  Tanggal keberangkatan:{' '}
                  {new Date(date).toLocaleDateString('id-ID', {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                </p>
              )}
              {statusKey === 'cancelled' && <p className="text-xs opacity-75">Pesanan ini telah dibatalkan</p>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gray-50 rounded-xl p-3">
              <p className="text-[10px] text-gray-400 mb-0.5">Nama Pemesan</p>
              <p className="font-semibold text-[#0B2C4D] text-sm">{fullName}</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-3">
              <p className="text-[10px] text-gray-400 mb-0.5">Peserta</p>
              <div className="flex items-center gap-1">
                <Users size={13} className="text-orange-400" />
                <p className="font-semibold text-[#0B2C4D] text-sm">{participants} Orang</p>
              </div>
            </div>
            <div className="bg-gray-50 rounded-xl p-3">
              <p className="text-[10px] text-gray-400 mb-0.5">Email</p>
              <div className="flex items-center gap-1">
                <Mail size={12} className="text-gray-400" />
                <p className="text-sm text-gray-700 truncate">{email}</p>
              </div>
            </div>
            <div className="bg-gray-50 rounded-xl p-3">
              <p className="text-[10px] text-gray-400 mb-0.5">Telepon</p>
              <div className="flex items-center gap-1">
                <Phone size={12} className="text-gray-400" />
                <p className="text-sm text-gray-700">{phone}</p>
              </div>
            </div>
            {date && (
              <div className="bg-gray-50 rounded-xl p-3">
                <p className="text-[10px] text-gray-400 mb-0.5">Tanggal Kunjungan</p>
                <div className="flex items-center gap-1">
                  <Calendar size={12} className="text-orange-400" />
                  <p className="text-sm text-gray-700">
                    {new Date(date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </p>
                </div>
              </div>
            )}
            <div className="bg-gray-50 rounded-xl p-3">
              <p className="text-[10px] text-gray-400 mb-0.5">Total Pembayaran</p>
              <p className="font-bold text-[#0B2C4D] text-sm">Rp {totalPrice.toLocaleString('id-ID')}</p>
            </div>
          </div>

          {paymentToken && (
            <div className="bg-green-50 border border-green-200 rounded-xl p-3">
              <p className="text-[10px] text-green-600 font-semibold mb-1">INFO PEMBAYARAN MIDTRANS</p>
              <p className="text-xs text-green-700">Order ID: {paymentToken}</p>
              {paidAt && (
                <p className="text-xs text-green-700 mt-0.5">Dibayar: {new Date(paidAt).toLocaleString('id-ID')}</p>
              )}
            </div>
          )}

          {notes && (
            <div className="bg-gray-50 rounded-xl p-3">
              <p className="text-[10px] text-gray-400 mb-1">Catatan</p>
              <p className="text-sm text-gray-600">{notes}</p>
            </div>
          )}
        </div>

        <div className="px-6 py-4 border-t border-gray-100 shrink-0 flex gap-2 flex-wrap justify-end">
          {statusKey === 'pending' && (
            <>
              <button
                onClick={() => {
                  onStatusChange(data, 'confirmed')
                  onClose()
                }}
                className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-4 py-2 rounded-lg transition"
              >
                <CheckCircle size={13} /> Konfirmasi Pesanan
              </button>
              <button
                onClick={() => {
                  onStatusChange(data, 'cancelled')
                  onClose()
                }}
                className="flex items-center gap-1.5 bg-red-50 hover:bg-red-100 text-red-500 text-xs font-semibold px-4 py-2 rounded-lg border border-red-200 transition"
              >
                <XCircle size={13} /> Tolak
              </button>
            </>
          )}
          {statusKey === 'paid' && (
            <button
              onClick={() => {
                onStatusChange(data, 'done')
                onClose()
              }}
              className="flex items-center gap-1.5 bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold px-4 py-2 rounded-lg transition"
            >
              <Package size={13} /> Tandai Sudah Berangkat
            </button>
          )}
          <button
            onClick={onClose}
            className="text-xs font-medium px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-500 transition"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  )
}