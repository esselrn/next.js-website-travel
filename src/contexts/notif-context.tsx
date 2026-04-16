'use client'

import { createContext, useContext, useEffect, useState, useCallback, useRef } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/contexts/auth-context'
import { CheckCircle, XCircle, Clock, PartyPopper, AlertCircle, X, CreditCard } from 'lucide-react'

// ── Types ────────────────────────────────────────────────────────────────────
export type ToastType = 'success' | 'error' | 'warning' | 'info' | 'payment' | 'done'

type Toast = {
  id: string
  type: ToastType
  title: string
  message: string
  duration?: number
}

type NotifContextType = {
  hasNotif: boolean
  clearNotif: () => void
  showToast: (type: ToastType, title: string, message: string, duration?: number) => void
}

const NotifContext = createContext<NotifContextType>({
  hasNotif: false,
  clearNotif: () => {},
  showToast: () => {}
})

// ── Toast visual config ───────────────────────────────────────────────────────
const toastConfig: Record<
  ToastType,
  {
    icon: React.ElementType
    accent: string
    border: string
    bar: string
    iconBg: string
  }
> = {
  success: {
    icon: CheckCircle,
    accent: 'text-emerald-600',
    border: 'border-emerald-100',
    bar: 'bg-emerald-500',
    iconBg: 'bg-emerald-50'
  },
  payment: {
    icon: CreditCard,
    accent: 'text-blue-600',
    border: 'border-blue-100',
    bar: 'bg-blue-500',
    iconBg: 'bg-blue-50'
  },
  error: { icon: XCircle, accent: 'text-red-600', border: 'border-red-100', bar: 'bg-red-500', iconBg: 'bg-red-50' },
  warning: {
    icon: AlertCircle,
    accent: 'text-amber-600',
    border: 'border-amber-100',
    bar: 'bg-amber-500',
    iconBg: 'bg-amber-50'
  },
  info: { icon: Clock, accent: 'text-sky-600', border: 'border-sky-100', bar: 'bg-sky-500', iconBg: 'bg-sky-50' },
  done: {
    icon: PartyPopper,
    accent: 'text-purple-600',
    border: 'border-purple-100',
    bar: 'bg-purple-500',
    iconBg: 'bg-purple-50'
  }
}

// ── Single Toast ──────────────────────────────────────────────────────────────
function ToastItem({ toast, onDismiss }: { toast: Toast; onDismiss: (id: string) => void }) {
  const [visible, setVisible] = useState(false)
  const [progress, setProgress] = useState(100)
  const duration = toast.duration ?? 4500
  const cfg = toastConfig[toast.type]
  const Icon = cfg.icon

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 10)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    const step = (16 / duration) * 100
    const iv = setInterval(() => setProgress((p) => Math.max(0, p - step)), 16)
    const dt = setTimeout(() => {
      setVisible(false)
      setTimeout(() => onDismiss(toast.id), 380)
    }, duration)
    return () => {
      clearInterval(iv)
      clearTimeout(dt)
    }
  }, [toast.id, duration, onDismiss])

  const dismiss = () => {
    setVisible(false)
    setTimeout(() => onDismiss(toast.id), 380)
  }

  return (
    <div
      style={{
        transform: visible ? 'translateX(0) scale(1)' : 'translateX(calc(100% + 24px)) scale(0.94)',
        opacity: visible ? 1 : 0,
        transition: 'transform 0.4s cubic-bezier(0.34,1.56,0.64,1), opacity 0.38s ease'
      }}
      className={`relative w-[360px] bg-white border ${cfg.border} rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.13)] overflow-hidden`}
    >
      {/* Colored top strip */}
      <div className={`h-[3px] w-full ${cfg.bar}`} />

      <div className="flex items-start gap-3 px-4 pt-3.5 pb-3">
        {/* Icon bubble */}
        <div className={`shrink-0 w-9 h-9 rounded-xl ${cfg.iconBg} flex items-center justify-center mt-0.5`}>
          <Icon size={18} className={cfg.accent} />
        </div>
        {/* Content */}
        <div className="flex-1 min-w-0">
          <p className="font-bold text-[#0B2C4D] text-sm leading-snug">{toast.title}</p>
          <p className="text-gray-500 text-xs mt-0.5 leading-relaxed">{toast.message}</p>
        </div>
        {/* Close */}
        <button
          onClick={dismiss}
          className="shrink-0 w-6 h-6 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-300 hover:text-gray-500 transition mt-0.5"
        >
          <X size={12} />
        </button>
      </div>

      {/* Progress bar */}
      <div className="mx-4 mb-3">
        <div className="h-[3px] bg-gray-100 rounded-full overflow-hidden">
          <div
            className={`h-full ${cfg.bar} rounded-full`}
            style={{ width: `${progress}%`, transition: 'width 16ms linear' }}
          />
        </div>
      </div>
    </div>
  )
}

// ── Toast Container ───────────────────────────────────────────────────────────
function ToastContainer({ toasts, onDismiss }: { toasts: Toast[]; onDismiss: (id: string) => void }) {
  if (toasts.length === 0) return null
  return (
    <div className="fixed top-[76px] right-5 z-[9999] flex flex-col gap-2.5 pointer-events-none">
      {toasts.map((t) => (
        <div key={t.id} className="pointer-events-auto">
          <ToastItem toast={t} onDismiss={onDismiss} />
        </div>
      ))}
    </div>
  )
}

// ── Provider ──────────────────────────────────────────────────────────────────
export function NotifProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth()
  const [hasNotif, setHasNotif] = useState(false)
  const [toasts, setToasts] = useState<Toast[]>([])
  const lastStatusesRef = useRef<Record<string, string>>({})

  // Existing booking notif polling — unchanged
  useEffect(() => {
    let cancelled = false
    const run = async () => {
      if (!user) return
      const cleared = JSON.parse(localStorage.getItem(`notif_cleared_${user.id}`) ?? '{}') as Record<string, string>
      const [{ data: pb }, { data: db }] = await Promise.all([
        supabase.from('package_bookings').select('id, status').eq('user_id', user.id),
        supabase.from('destination_bookings').select('id, status').eq('user_id', user.id)
      ])
      const all = [...(pb ?? []), ...(db ?? [])]
      const NOTIFY_STATUSES = ['confirmed', 'cancelled', 'done', 'paid']
      const currentStatuses: Record<string, string> = {}
      all.forEach((b) => {
        currentStatuses[b.id] = b.status
      })
      lastStatusesRef.current = currentStatuses
      const hasNew = all.some((b) => NOTIFY_STATUSES.includes(b.status) && cleared[b.id] !== b.status)
      if (!cancelled) setHasNotif(hasNew)
    }
    run()
    const interval = setInterval(run, 30000)
    return () => {
      cancelled = true
      clearInterval(interval)
    }
  }, [user])

  const clearNotif = useCallback(() => {
    if (!user) return
    localStorage.setItem(`notif_cleared_${user.id}`, JSON.stringify(lastStatusesRef.current))
    setHasNotif(false)
  }, [user])

  const showToast = useCallback((type: ToastType, title: string, message: string, duration?: number) => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2)}`
    // Max 5 toasts at once
    setToasts((prev) => [...prev.slice(-4), { id, type, title, message, duration }])
  }, [])

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  return (
    <NotifContext.Provider value={{ hasNotif, clearNotif, showToast }}>
      {children}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </NotifContext.Provider>
  )
}

export const useNotif = () => useContext(NotifContext)