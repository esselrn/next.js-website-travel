export interface Destination {
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
  created_at?: string
}

export interface DestinationImage {
  id: string
  destination_id: string
  image_url: string
  sort_order: number
}

export interface DestinationInclude {
  id: string
  destination_id: string
  item: string
  is_included: boolean
  sort_order: number
}

export interface DestinationItinerary {
  id: string
  destination_id: string
  time_range: string
  title: string
  description: string
  sort_order: number
}

export interface DestinationBookingPayload {
  destination_id: string
  full_name: string
  phone: string
  email: string
  visit_date: string
  participants: number
  notes?: string
  price_per_person: number
}