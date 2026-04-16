import type { ReactNode } from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Admin Dashboard — NusaTrip'
}

export default function AdminLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}