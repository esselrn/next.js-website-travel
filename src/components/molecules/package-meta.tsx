import InfoItem from '@/components/atoms/info-item'
import { ClockIcon, CarIcon, UserGroupIcon, LanguageIcon } from '@/components/atoms/icons/icons'

type PackageMetaProps = {
  duration: string
  type: string
  maxPerson: number
  language: string
}

export default function PackageMeta({ duration, type, maxPerson, language }: PackageMetaProps) {
  return (
    <div className="border-y border-gray-200 py-6 mb-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <InfoItem icon={<ClockIcon />} label="Durasi" value={duration} />

        <InfoItem icon={<CarIcon />} label="Tipe Tur" value={type} />

        <InfoItem icon={<UserGroupIcon />} label="Jumlah Peserta" value={`Maks. ${maxPerson} Orang`} />

        <InfoItem icon={<LanguageIcon />} label="Bahasa" value={language} />
      </div>
    </div>
  )
}