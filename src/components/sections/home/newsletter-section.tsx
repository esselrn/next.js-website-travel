import { NEWSLETTER } from "@/constants/newsletter"
import { PaperAirplaneIcon } from "@heroicons/react/24/solid"

export default function NewsletterSection() {
  return (
    <section className="bg-white w-full h-[288px] flex items-center">
      <div className="max-w-[1440px] mx-auto px-6 w-full flex flex-col lg:flex-row items-center justify-between gap-8">

        <div className="max-w-xl">
          <h3 className="font-montserrat text-2xl font-bold text-[#0B2C4D]">
            {NEWSLETTER.title}
          </h3>
          <p className="mt-2 font-inter text-gray-600">
            {NEWSLETTER.description}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
          <input
            type="email"
            placeholder={NEWSLETTER.placeholder}
            className="w-full sm:w-[320px] px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FB8C00]"
          />

          <button className="inline-flex items-center gap-2 bg-[#FB8C00] hover:bg-[#e67e00] text-white px-5 py-3 rounded-lg font-inter font-semibold transition whitespace-nowrap">
            <PaperAirplaneIcon className="w-5 h-5 rotate-45" />
            {NEWSLETTER.buttonText}
          </button>
        </div>
      </div>
    </section>
  )
}