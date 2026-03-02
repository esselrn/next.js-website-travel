// src/components/atoms/price.tsx
// Komponen ini menerima price sebagai number (integer dari Supabase)
// dan memformatnya ke format Rupiah

type PriceProps = {
  value: number
}

export default function Price({ value }: PriceProps) {
  const formatted = value.toLocaleString('id-ID')

  return (
    <p className="font-semibold text-[#F36F21]">
      Rp. {formatted} <span className="text-sm font-normal text-gray-500">/ Orang</span>
    </p>
  )
}