'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { signIn } from '@/lib/auth'
import { supabase } from '@/lib/supabase'
import { Eye, EyeOff, Mail, Lock, ArrowRight } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPass, setShowPass] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const { data, error } = await signIn(email, password)
    if (error) {
      setError('Email atau password salah.')
      setLoading(false)
      return
    }

    const { data: profile } = await supabase.from('users').select('role').eq('id', data.user!.id).single()

    if (profile?.role === 'admin') {
      // Admin HANYA bisa masuk ke /admin — tidak ada akses ke halaman user
      router.push('/admin')
    } else {
      // User biasa: ambil redirect param, tapi blokir jika mengarah ke /admin
      const params = new URLSearchParams(window.location.search)
      const redirect = params.get('redirect') || '/'
      const safeRedirect = redirect.startsWith('/admin') ? '/' : redirect
      router.push(safeRedirect)
    }
  }

  return (
    <div className="min-h-screen w-full relative flex items-center justify-center overflow-hidden">
      {/* BG */}
      <div className="absolute inset-0 z-0">
        <Image src="/assets/bali.jpg" alt="bg" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-[#0B2C4D]/75" />
        <div className="absolute top-[-80px] left-[-80px] w-[400px] h-[400px] rounded-full bg-[#FB8C00]/10 blur-3xl" />
        <div className="absolute bottom-[-60px] right-[-60px] w-[350px] h-[350px] rounded-full bg-blue-400/10 blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-[420px] mx-4" style={{ animation: 'fadeUp 0.5s ease forwards' }}>
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <Image src="/assets/logo.png" alt="NusaTrip" width={90} height={60} className="mb-3" />
          <span className="font-montserrat font-bold text-white text-xl tracking-widest">NUSA TRIP</span>
          <div className="w-12 h-[2px] bg-[#FB8C00] rounded-full mt-3" />
        </div>

        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl px-8 py-10 shadow-2xl">
          <h1 className="font-montserrat font-bold text-2xl text-white mb-1">Selamat Datang</h1>
          <p className="text-white/50 text-sm mb-8">Masuk dan mulai jelajahi Indonesia</p>

          {error && (
            <div className="bg-red-500/20 border border-red-400/30 text-red-200 text-sm px-4 py-3 rounded-xl mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
                className="w-full bg-white/10 border border-white/20 text-white placeholder-white/40 text-sm rounded-xl pl-11 pr-4 py-3.5 focus:outline-none focus:border-[#FB8C00]/60 focus:bg-white/15 transition"
              />
            </div>

            <div className="relative">
              <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
              <input
                type={showPass ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
                className="w-full bg-white/10 border border-white/20 text-white placeholder-white/40 text-sm rounded-xl pl-11 pr-12 py-3.5 focus:outline-none focus:border-[#FB8C00]/60 focus:bg-white/15 transition"
              />
              <button
                type="button"
                onClick={() => setShowPass((s) => !s)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition"
              >
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-[#FB8C00] hover:bg-orange-500 disabled:opacity-50 text-white font-semibold py-3.5 rounded-xl transition-all hover:shadow-lg hover:shadow-orange-500/30 mt-2 group"
            >
              {loading ? (
                'Memproses...'
              ) : (
                <>
                  Masuk <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-white/15" />
            <span className="text-white/30 text-xs">atau</span>
            <div className="flex-1 h-px bg-white/15" />
          </div>

          <p className="text-center text-sm text-white/50">
            Belum punya akun?{' '}
            <Link href="/auth/register" className="text-[#FB8C00] font-semibold hover:text-orange-400 transition">
              Daftar sekarang
            </Link>
          </p>
        </div>
        <p className="text-center text-white/30 text-xs mt-6">© 2025 NusaTrip. All rights reserved.</p>
      </div>

      <style jsx global>{`
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  )
}