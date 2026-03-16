export interface Package {
  id: string
  slug?: string
  name: string
  location: string
  full_location: string
  rating: number
  price_per_person: number
  short_description: string
  summary: string
  cover_image_url: string
  thumbnail_url: string
  is_featured: boolean
  duration_day?: number
  duration_night?: number
  type?: string
  max_person?: number
  language?: string
  created_at?: string
}

export interface PackageImage {
  id: string
  package_id: string
  image_url: string
  sort_order: number
}

export interface PackageInclude {
  id: string
  package_id: string
  item: string
  is_included: boolean
  sort_order: number
}

export interface PackageItinerary {
  id: string
  package_id: string
  day: number
  title: string
  description: string
  sort_order: number
}

export interface PackageBookingPayload {
  package_id: string
  full_name: string
  phone: string
  email: string
  travel_date: string
  participants: number
  notes?: string
  price_per_person: number
}