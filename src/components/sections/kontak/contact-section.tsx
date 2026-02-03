import Image from 'next/image'
import ContactInfo from '@/components/molecules/contact-info'
import ContactForm from '@/components/molecules/contact-form'

export default function ContactSection() {
  return (
    <section className="relative w-full h-screen">
      {/* Background Image */}
      <Image src="/assets/desgallery1.jpg" alt="Contact Background" fill className="object-cover" priority />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 h-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <ContactInfo />
        <ContactForm />
      </div>
    </section>
  )
}
