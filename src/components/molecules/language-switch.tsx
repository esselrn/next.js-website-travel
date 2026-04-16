'use client'

import { useState } from 'react'

export default function LanguageSwitch() {
  const [lang, setLang] = useState<'EN' | 'ID'>('ID')

  return (
    <div className="flex items-center gap-1 text-sm font-inter">
      <button
        onClick={() => setLang('EN')}
        className={`px-2 py-1 rounded transition ${
          lang === 'EN' ? 'bg-orange-500 text-white' : 'text-white hover:text-orange-500'
        }`}
      >
        EN
      </button>

      <button
        onClick={() => setLang('ID')}
        className={`px-2 py-1 rounded transition ${
          lang === 'ID' ? 'bg-orange-500 text-white' : 'text-white hover:text-orange-500'
        }`}
      >
        ID
      </button>
    </div>
  )
}