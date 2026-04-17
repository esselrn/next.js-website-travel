import Image from 'next/image'
import ContactInfo from '@/components/molecules/contact-info'
import ContactForm from '@/components/molecules/contact-form'

export default function ContactSection() {
  return (
    <section className="relative w-full">
      {/* Background Image */}
      <Image src="/assets/kontak/bromo.jpg" alt="Contact Background" fill className="object-cover" priority />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
        <ContactInfo />
        <ContactForm />
      </div>
    </section>
  )
}