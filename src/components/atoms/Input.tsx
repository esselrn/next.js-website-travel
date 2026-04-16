export default function Input({ className = '', ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`w-full block px-4 py-3 border border-gray-300 rounded-lg shadow-sm
      focus:ring-2 focus:ring-[#FB8C00] outline-none ${className}`}
    />
  )
}
