'use client'

import { useState } from 'react'
import { PaperAirplaneIcon } from '@heroicons/react/24/solid'
import { supabase } from '@/lib/supabase'
import { CheckCircle, AlertCircle } from 'lucide-react'

export default function NewsletterSection() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async () => {
    if (!email) {
      setError('Masukkan alamat email Anda.')
      return
    }
    setLoading(true)
    setError('')
    const { error: supabaseError } = await supabase.from('newsletters').insert([{ email }])
    setLoading(false)
    if (supabaseError) {
      setError(supabaseError.code === '23505' ? 'Email ini sudah terdaftar.' : 'Gagal mendaftar. Silakan coba lagi.')
    } else {
      setSuccess(true)
      setEmail('')
    }
  }

  return (
    <section className="w-full bg-white py-16 lg:py-24">
      <div className="max-w-[1440px] mx-auto px-6 w-full flex flex-col lg:flex-row items-center justify-between gap-10">
        <div className="max-w-xl text-center lg:text-left">
          <h3 className="font-montserrat text-2xl lg:text-3xl font-bold text-[#0B2C4D]">Berlangganan Newsletter NusaTrip</h3>
          <p className="mt-3 font-inter text-gray-600 leading-relaxed">
            Dapatkan update destinasi terbaru, promo perjalanan, dan tips wisata langsung ke email Anda.
          </p>
        </div>
        <div className="flex flex-col gap-3 w-full lg:w-auto">
          {success ? (
            <div className="flex items-center gap-3 px-5 py-4 bg-green-50 border border-green-200 rounded-xl text-green-700 text-sm">
              <div className="w-9 h-9 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                <CheckCircle className="w-5 h-5 text-green-500" />
              </div>
              <div>
                <p className="font-semibold">Berhasil Berlangganan!</p>
                <p className="text-green-600 text-xs mt-0.5">Update terbaru NusaTrip akan dikirim ke email Anda.</p>
              </div>
            </div>
          ) : (
            <>
              <div className="flex flex-col sm:flex-row items-center gap-4 w-full">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    setError('')
                  }}
                  placeholder="Masukkan alamat email Anda"
                  className="w-full sm:w-[320px] px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FB8C00]"
                />
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="inline-flex items-center justify-center gap-2 bg-[#FB8C00] hover:bg-[#e67e00] disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-inter font-semibold transition whitespace-nowrap w-full sm:w-auto"
                >
                  <PaperAirplaneIcon className="w-5 h-5 rotate-45" />
                  {loading ? 'Mendaftar...' : 'BERLANGGANAN'}
                </button>
              </div>
              {error && (
                <div className="flex items-center gap-2 text-red-500 text-xs">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  {error}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  )
}