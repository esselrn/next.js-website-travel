export default function AdventureCTAPlayButton() {
  return (
    <button
      className="w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-lg hover:scale-105 transition"
      aria-label="Play Video"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="#0B2C4D"
        className="w-8 h-8 ml-1"
      >
        <path d="M8 5v14l11-7z" />
      </svg>
    </button>
  )
}