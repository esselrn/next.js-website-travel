'use client'

import Link from 'next/link'
import { useState } from 'react'

type DropdownItem = { href: string; label: string; onClick?: never } | { href?: never; label: string; onClick: () => void }

export default function DropdownMenu({ label, items }: { label: string; items: DropdownItem[] }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button className={`flex items-center gap-1 px-3 py-2 transition ${open ? 'text-orange-500' : 'text-white'}`}>
        {label}
        <span className="text-xs">▾</span>
      </button>
      <div
        className={`absolute top-full left-0 mt-2 min-w-[180px] rounded-lg bg-white shadow-lg transition-all duration-200 ${open ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
      >
        {items.map((item, i) =>
          item.onClick ? (
            <button
              key={i}
              onClick={() => {
                item.onClick()
                setOpen(false)
              }}
              className="w-full text-left block px-4 py-2 text-sm text-slate-700 transition hover:text-orange-500"
            >
              {item.label}
            </button>
          ) : (
            <Link
              key={i}
              href={item.href}
              className="block px-4 py-2 text-sm text-slate-700 transition hover:text-orange-500"
            >
              {item.label}
            </Link>
          )
        )}
      </div>
    </div>
  )
}