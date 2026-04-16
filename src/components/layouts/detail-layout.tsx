// src/components/templates/detail-layout.tsx

import { ReactNode } from 'react'

interface DetailLayoutProps {
  children: ReactNode
  sidebar: ReactNode
}

export default function DetailLayout({ children, sidebar }: DetailLayoutProps) {
  return (
    <section className="w-full bg-white py-10 lg:py-14">
      <div className="max-w-[1200px] mx-auto px-6 flex flex-col lg:flex-row gap-10 items-start">
        {/* LEFT CONTENT */}
        <div className="flex-1 min-w-0">{children}</div>

        {/* RIGHT SIDEBAR */}
        <aside className="w-full lg:w-[360px] shrink-0 lg:sticky lg:top-[84px]">{sidebar}</aside>
      </div>
    </section>
  )
}