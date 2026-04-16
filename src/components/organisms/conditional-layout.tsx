'use client'

import { usePathname } from 'next/navigation'
import Navbar from '@/components/organisms/navbar'
import FooterSection from '@/components/organisms/footer'
import NusaAIChat from '@/components/organisms/nusa-ai-chat'
import { NotifProvider } from '@/contexts/notif-context'

export default function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAdmin = pathname?.startsWith('/admin')

  if (isAdmin) return <>{children}</>

  return (
    <NotifProvider>
      <Navbar />
      <main className="pt-[64px]">{children}</main>
      <FooterSection />
      <NusaAIChat />
    </NotifProvider>
  )
}