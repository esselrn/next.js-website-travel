'use client'

import { useEffect, useRef } from 'react'
import { CheckCircle } from 'lucide-react'

type Props = {
  show: boolean
  name?: string
}

export default function LogoutToast({ show, name }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = wrapRef.current
    const bar = barRef.current
    if (!el || !bar) return

    if (!show) return

    // Show
    el.style.opacity = '1'
    el.style.transform = 'translateX(-50%) translateY(0) scale(1)'
    bar.style.animation = 'none'
    // force reflow
    void bar.offsetWidth
    bar.style.animation = 'shrink 2s linear forwards'

    // Hide after 2s
    const hideTimer = setTimeout(() => {
      el.style.opacity = '0'
      el.style.transform = 'translateX(-50%) translateY(-8px) scale(0.95)'
    }, 2000)

    return () => clearTimeout(hideTimer)
  }, [show])

  return (
    <div
      ref={wrapRef}
      style={{
        position: 'fixed',
        top: '76px',
        left: '50%',
        transform: 'translateX(-50%) translateY(-8px) scale(0.95)',
        opacity: 0,
        transition: 'all 0.35s cubic-bezier(0.34,1.56,0.64,1)',
        zIndex: 999,
        pointerEvents: 'none'
      }}
    >
      <div
        style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          background: '#0B2C4D',
          borderRadius: '16px',
          padding: '12px 20px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
          minWidth: '220px',
          overflow: 'hidden'
        }}
      >
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: '50%',
            background: 'rgba(74,222,128,0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}
        >
          <CheckCircle size={16} color="#4ade80" />
        </div>
        <div>
          <p style={{ fontSize: 14, fontWeight: 600, color: '#fff', margin: 0 }}>Berhasil Keluar</p>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', margin: 0 }}>
            {name ? `Sampai jumpa, ${name}!` : 'Sampai jumpa!'}
          </p>
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            height: 3,
            background: 'rgba(74,222,128,0.2)',
            borderRadius: '0 0 16px 16px'
          }}
        >
          <div ref={barRef} style={{ height: '100%', background: '#4ade80', borderRadius: 'inherit', width: '100%' }} />
        </div>
      </div>
      <style>{`@keyframes shrink { from { width:100% } to { width:0% } }`}</style>
    </div>
  )
}