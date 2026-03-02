type RatingProps = {
  value: number | string
}

export default function Rating({ value }: RatingProps) {
  const numericValue = Number(value)

  return (
    <div className="flex items-center gap-2 text-sm">
      <span className="text-[#FB8C00]">
        {"★".repeat(Math.round(numericValue))}
      </span>
      <span className="font-inter text-gray-600">
        {numericValue.toFixed(1)}
      </span>
    </div>
  )
}