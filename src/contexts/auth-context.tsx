'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import type { User } from '@supabase/supabase-js'

type UserProfile = {
  id: string
  email: string
  full_name: string
  role: 'user' | 'admin'
  phone?: string
  city?: string
  birthdate?: string
  avatar_url?: string
}

type AuthContextType = {
  user: User | null
  profile: UserProfile | null
  loading: boolean
  refreshProfile: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  loading: true,
  refreshProfile: async () => {}
})

// Daftar path yang HANYA boleh diakses user biasa (admin diblokir)
// Admin hanya boleh akses /admin dan /auth/*
const USER_ONLY_PATHS = ['/profile', '/booking', '/review', '/pesanan', '/paket', '/destinasi', '/blog', '/kontak']

function isUserOnlyPath(pathname: string): boolean {
  // Cek apakah path saat ini termasuk halaman user-only
  return USER_ONLY_PATHS.some((p) => pathname.startsWith(p))
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  const fetchProfile = async (userId: string) => {
    const { data } = await supabase.from('users').select('*').eq('id', userId).single()
    if (data) setProfile(data)
    return data
  }

  const refreshProfile = async () => {
    if (!user) return
    await fetchProfile(user.id)
  }

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setUser(session?.user ?? null)
      if (session?.user) {
        const profileData = await fetchProfile(session.user.id)
        // Guard: jika admin mencoba akses halaman user-only, redirect ke /admin
        if (profileData?.role === 'admin' && isUserOnlyPath(pathname)) {
          router.replace('/admin')
        }
      }
      setLoading(false)
    })

    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setUser(session?.user ?? null)
      if (session?.user) {
        const profileData = await fetchProfile(session.user.id)
        // Guard saat auth state berubah (misal: login)
        if (profileData?.role === 'admin' && isUserOnlyPath(pathname)) {
          router.replace('/admin')
        }
      } else {
        setProfile(null)
      }
    })

    return () => subscription.unsubscribe()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Guard reaktif: jika admin navigasi ke halaman user-only
  useEffect(() => {
    if (!loading && profile?.role === 'admin' && isUserOnlyPath(pathname)) {
      router.replace('/admin')
    }
  }, [pathname, profile, loading, router])

  return <AuthContext.Provider value={{ user, profile, loading, refreshProfile }}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)