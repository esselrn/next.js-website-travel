import Image from "next/image"
import FooterColumn from "@/components/molecules/footer-column"
import { FOOTER_LINKS } from "@/constants/footer"

export default function FooterSection() {
  return (
    <footer className="bg-[#0B2C4D] text-white">
      <div className="max-w-[1440px] mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Brand */}
          <div>
            <Image
              src="/assets/logonb.png"
              alt="NusaTrip Logo"
              width={214}
              height={64}
              className="mb-4"
            />
            <p className="font-inter text-sm text-white/80 leading-relaxed">
              NusaTrip adalah platform perjalanan yang menghadirkan destinasi
              wisata terbaik di Indonesia dengan pengalaman liburan yang aman,
              nyaman, dan berkesan.
            </p>
          </div>

          {/* Quick Links */}
          <FooterColumn title="Tautan Cepat" links={FOOTER_LINKS.quickLinks} />

          {/* Other Pages */}
          <FooterColumn title="Halaman Lainnya" links={FOOTER_LINKS.otherPages} />

          {/* Contact */}
          <FooterColumn title="Informasi Kontak" links={FOOTER_LINKS.contact} />

        </div>

        {/* Divider */}
        <div className="border-t border-white/20 mt-16 pt-6 text-center">
          <p className="font-inter text-sm text-white/60">
            © 2025 NusaTrip. Seluruh hak cipta dilindungi.
          </p>
        </div>
      </div>
    </footer>
  )
}