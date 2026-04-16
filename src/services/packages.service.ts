// src/services/packages.service.ts

export type { Package, PackageImage, PackageInclude, PackageItinerary, PackageBookingPayload } from '@/types/packages'

export {
  getPackages,
  getPackageDetail,
  getPackageImages,
  getPackageIncludes,
  getPackageExcludes,
  getPackageItineraries,
  createPackageBooking
} from '@/restapi/packages/queries'