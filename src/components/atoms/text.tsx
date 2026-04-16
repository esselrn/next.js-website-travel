type TextProps = {
  children: React.ReactNode
  variant?: "hero" | "title" | "body" | "small"
  color?: "dark" | "light"
  className?: string
}

export default function Text({
  children,
  variant = "body",
  color = "dark",
  className = "",
}: TextProps) {
  const variantStyle =
    variant === "hero"
      ? "font-montserrat text-4xl md:text-5xl lg:text-6xl leading-tight"
      : variant === "title"
      ? "font-montserrat text-lg"
      : variant === "small"
      ? "text-sm"
      : "text-base"

  const colorStyle = color === "light" ? "text-white" : "text-gray-800"

  return (
    <p className={`${variantStyle} ${colorStyle} ${className}`}>
      {children}
    </p>
  )
}