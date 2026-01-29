import { ReactNode } from "react"

interface DetailLayoutProps {
  children: ReactNode
  sidebar: ReactNode
}

export default function DetailLayout({
  children,
  sidebar,
}: DetailLayoutProps) {
  return (
    <section className="w-full bg-white py-16">
      <div className="max-w-[1200px] mx-auto px-6 flex gap-10 items-start">

        {/* LEFT CONTENT */}
        <div className="flex-1 min-w-0">
          {children}
        </div>

        {/* RIGHT SIDEBAR */}
        <aside className="w-[360px] sticky top-[140px] self-start">
          {sidebar}
        </aside>

      </div>
    </section>
  )
}