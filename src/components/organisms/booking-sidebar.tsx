// src/components/organisms/booking-sidebar.tsx
'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

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
  const [form, setForm] = useState({
    full_name: '',
    phone: '',
    email: '',
    visit_date: '',
    participants: 1,
    notes: ''
  })
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async () => {
    setSubmitting(true)
    try {
      const total_price = pricePerPerson * Number(form.participants)

      const { error } = await supabase.from('destination_bookings').insert([
        {
          destination_id: destinationId,
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

      if (error) throw error

      setSuccess(true)
      setForm({ full_name: '', phone: '', email: '', visit_date: '', participants: 1, notes: '' })
    } catch {
      alert('Gagal mengirim pemesanan. Coba lagi.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <aside className="bg-white rounded-2xl shadow-xl overflow-hidden w-full">
      <div className="bg-[#0B2C4D] px-6 py-5 text-center">
        <h3 className="text-white text-lg font-semibold">Pesan Tur Ini</h3>
      </div>
      <div className="p-8 space-y-5">
        {success ? (
          <p className="text-green-600 text-sm text-center py-4">
            ✅ Pemesanan berhasil! Tim kami akan menghubungi Anda segera.
          </p>
        ) : (
          <>
            {bookingFields.map(({ name, label, type }) => (
              <input
                key={name}
                name={name}
                type={type}
                placeholder={label}
                value={form[name as keyof typeof form]}
                onChange={handleChange}
                min={type === 'number' ? 1 : undefined}
                className="w-full h-[54px] px-5 rounded-lg border border-gray-200 text-sm text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
              />
            ))}
            <textarea
              name="notes"
              placeholder="Pesan Tambahan"
              value={form.notes}
              onChange={handleChange}
              rows={4}
              className="w-full px-5 py-4 rounded-lg border border-gray-200 text-sm text-gray-700 shadow-sm resize-none focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
            />
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="w-full h-[54px] mt-2 bg-[#FB8C00] text-white font-semibold rounded-lg hover:bg-orange-600 transition disabled:opacity-60"
            >
              {submitting ? 'Mengirim...' : 'PESAN SEKARANG'}
            </button>
          </>
        )}
      </div>
    </aside>
  )
}