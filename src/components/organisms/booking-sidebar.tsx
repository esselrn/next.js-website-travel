'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/contexts/auth-context'
import { CheckCircle, AlertCircle, LogIn, ClipboardList, ArrowRight } from 'lucide-react'

type Props = {
  destinationId: string
  pricePerPerson: number
}

const bookingFields = [
  { name: 'full_name', label: 'Nama Lengkap', type: 'text' },
  { name: 'phone', label: 'Nomor Telepon', type: 'tel' },
  { name: 'email', label: 'Email', type: 'email' },
  { name: 'visit_date', label: 'Tanggal Kunjungan', type: 'date' },
  { name: 'participants', label: 'Jumlah Peserta', type: 'number' }
] as const

export default function BookingSidebar({ destinationId, pricePerPerson }: Props) {
  const { user, profile } = useAuth()
  const router = useRouter()
  const [form, setForm] = useState({ full_name: '', phone: '', email: '', visit_date: '', participants: 1, notes: '' })
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setError('')
  }

  const handleSubmit = async () => {
    if (!form.full_name || !form.phone || !form.email || !form.visit_date) {
      setError('Mohon lengkapi semua kolom yang wajib diisi.')
      return
    }
    setSubmitting(true)
    try {
      const total_price = pricePerPerson * Number(form.participants)
      const { error: supabaseError } = await supabase.from('destination_bookings').insert([
        {
          destination_id: destinationId,
          user_id: user!.id,
          full_name: form.full_name,
          phone: form.phone,
          email: form.email,
          visit_date: form.visit_date,
          participants: Number(form.participants),
          notes: form.notes,
          total_price,
          status: 'pending'
        }
      ])
      if (supabaseError) throw supabaseError
      setSuccess(true)
      setForm({ full_name: '', phone: '', email: '', visit_date: '', participants: 1, notes: '' })
    } catch {
      setError('Gagal mengirim pemesanan. Silakan coba lagi.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <aside id="booking" className="bg-white rounded-2xl shadow-xl overflow-hidden w-full scroll-mt-8">
      <div className="bg-[#0B2C4D] px-6 py-5 text-center">
        <h3 className="text-white text-lg font-semibold">Pesan Tur Ini</h3>
      </div>
      <div className="p-8 space-y-5">
        {/* BELUM LOGIN */}
        {!user ? (
          <div className="flex flex-col items-center text-center py-6 gap-4">
            <div className="w-16 h-16 rounded-full bg-orange-50 flex items-center justify-center">
              <LogIn className="w-7 h-7 text-[#FB8C00]" />
            </div>
            <div>
              <h4 className="text-base font-bold text-[#0B2C4D] mb-1">Login Diperlukan</h4>
              <p className="text-sm text-gray-500 max-w-xs mx-auto">
                Kamu harus login terlebih dahulu untuk melakukan pemesanan.
              </p>
            </div>
            <div className="w-full space-y-2 pt-1">
              <button
                onClick={() => router.push(`/auth/login?redirect=${window.location.pathname}`)}
                className="w-full h-[48px] bg-[#FB8C00] text-white font-semibold rounded-lg hover:bg-orange-600 transition text-sm"
              >
                Masuk Sekarang
              </button>
              <button
                onClick={() => router.push('/auth/register')}
                className="w-full h-[48px] border border-[#0B2C4D] text-[#0B2C4D] font-semibold rounded-lg hover:bg-gray-50 transition text-sm"
              >
                Daftar Gratis
              </button>
            </div>
            <p className="text-xs text-gray-400">Sudah punya akun? Langsung masuk dan pesan.</p>
          </div>
        ) : success ? (
          /* SUKSES */
          <div className="flex flex-col items-center justify-center text-center py-6 gap-4">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-[#0B2C4D] mb-1">Pemesanan Berhasil!</h4>
              <p className="text-sm text-gray-500 max-w-xs mx-auto">
                Terima kasih <span className="font-semibold text-[#0B2C4D]">{profile?.full_name}</span>! Tim kami akan segera
                menghubungi Anda untuk konfirmasi lebih lanjut.
              </p>
            </div>
            <div className="w-full space-y-2 pt-1">
              <button
                onClick={() => router.push('/riwayat-pesanan')}
                className="w-full h-[48px] bg-[#0B2C4D] text-white font-semibold rounded-lg hover:bg-[#0a2440] transition text-sm flex items-center justify-center gap-2"
              >
                <ClipboardList size={16} />
                Lihat Riwayat Pesanan
              </button>
              <button
                onClick={() => setSuccess(false)}
                className="w-full h-[48px] border border-gray-200 text-gray-500 font-medium rounded-lg hover:bg-gray-50 transition text-sm flex items-center justify-center gap-2"
              >
                <ArrowRight size={15} />
                Pesan Destinasi Lainnya
              </button>
            </div>
          </div>
        ) : (
          /* FORM */
          <>
            <div className="flex items-center gap-2.5 px-4 py-3 bg-blue-50 rounded-lg border border-blue-100">
              <div className="w-8 h-8 rounded-full bg-[#FB8C00] flex items-center justify-center text-xs font-bold text-white shrink-0">
                {(profile?.full_name || profile?.email || 'U')[0].toUpperCase()}
              </div>
              <div>
                <p className="text-xs font-semibold text-[#0B2C4D]">{profile?.full_name || 'User'}</p>
                <p className="text-[11px] text-gray-400">{profile?.email}</p>
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 px-4 py-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                <AlertCircle className="w-4 h-4 shrink-0" /> {error}
              </div>
            )}

            {bookingFields.map(({ name, label, type }) => (
              <input
                key={name}
                name={name}
                type={type}
                placeholder={label}
                value={form[name as keyof typeof form]}
                onChange={handleChange}
                min={type === 'number' ? 1 : undefined}
                className="w-full h-[54px] px-5 rounded-lg border border-gray-200 text-sm text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 bg-gray-50"
              />
            ))}

            <textarea
              name="notes"
              placeholder="Pesan Tambahan (opsional)"
              value={form.notes}
              onChange={handleChange}
              rows={4}
              className="w-full px-5 py-4 rounded-lg border border-gray-200 text-sm text-gray-700 shadow-sm resize-none focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 bg-gray-50"
            />

            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="w-full h-[54px] mt-2 bg-[#FB8C00] text-white font-semibold rounded-lg hover:bg-orange-600 transition disabled:opacity-60"
            >
              {submitting ? 'Mengirim...' : 'PESAN SEKARANG'}
            </button>
            <p className="text-xs text-gray-400 text-center">Data Anda aman dan tidak akan dibagikan kepada pihak ketiga.</p>
          </>
        )}
      </div>
    </aside>
  )
}