import Logo from "@/components/atoms/logo"
import NavLink from "@/components/molecules/nav-link"
import DropdownMenu from "@/components/molecules/dropdown-menu"
import LanguageSwitch from "@/components/molecules/language-switch"

export default function Navbar() {
  return (
    <header className="absolute top-0 left-0 w-full z-20 bg-[#0B2C4D]/90 backdrop-blur">
      <div className="max-w-[1440px] mx-auto h-[64px] flex items-center justify-between px-6 text-white">

        {/* LOGO */}
        <Logo />

        {/* NAVIGATION */}
        <nav className="hidden md:flex items-center gap-6 font-inter text-sm">

          <NavLink href="/" label="Beranda" />
          <NavLink href="/about" label="Tentang Kami" />

          {/* Paket Wisata */}
          <DropdownMenu
            label="Paket Wisata"
            items={[
              { href: "/paket-wisata", label: "Paket Wisata" },
              { href: "/detail-paket-wisata", label: "Detail Paket Wisata" },
            ]}
          />

          {/* Destinasi */}
          <DropdownMenu
            label="Destinasi"
            items={[
              { href: "/destinasi", label: "Destinasi" },
              { href: "/detail-destinasi", label: "Detail Destinasi" },
            ]}
          />

          {/* Pages */}
          <DropdownMenu
            label="Pages"
            items={[
              { href: "/guide", label: "Guide" },
              { href: "/gallery", label: "Gallery" },
              { href: "/blog-article", label: "Blog & Article" },
              { href: "/single-post", label: "Single Post" },
            ]}
          />

          <NavLink href="/kontak" label="Kontak" />

          {/* Language */}
          <LanguageSwitch />

        </nav>
      </div>
    </header>
  )
}