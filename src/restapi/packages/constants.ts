// src/restapi/packages/constants.ts

export const PACKAGE_ENDPOINTS = {
  list: '/api/paket-wisata',
  detail: (id: string) => `/api/paket-wisata/${id}`,
  images: (id: string) => `/api/paket-wisata/images?package_id=${id}`,
  includes: (id: string) => `/api/paket-wisata/includes?package_id=${id}`,
  excludes: (id: string) => `/api/paket-wisata/excludes?package_id=${id}`,
  itineraries: (id: string) => `/api/paket-wisata/itineraries?package_id=${id}`,
  bookings: '/api/paket-wisata/bookings'
}