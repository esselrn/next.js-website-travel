import InfoItem from "@/components/atoms/info-item"
import {
  ClockIcon,
  CarIcon,
  UserGroupIcon,
  LanguageIcon,
} from "@/components/atoms/icons/icons"
import { PACKAGE_META } from "@/constants/package-meta"

export default function PackageMeta() {
  return (
    <div className="border-y border-gray-200 py-6 mb-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <InfoItem
          icon={<ClockIcon />}
          label="Durasi"
          value={PACKAGE_META.duration}
        />
        <InfoItem
          icon={<CarIcon />}
          label="Tipe Tur"
          value={PACKAGE_META.type}
        />
        <InfoItem
          icon={<UserGroupIcon />}
          label="Jumlah Peserta"
          value={PACKAGE_META.maxPerson}
        />
        <InfoItem
          icon={<LanguageIcon />}
          label="Bahasa"
          value={PACKAGE_META.language}
        />
      </div>
    </div>
  )
}