// src/restapi/destinasi/constants.ts

export const DESTINATION_ENDPOINTS = {
  list: '/api/destinasi',
  detail: (id: string) => `/api/destinasi/${id}`,
  images: (id: string) => `/api/destinasi/images?destination_id=${id}`,
  includes: (id: string) => `/api/destinasi/includes?destination_id=${id}`,
  excludes: (id: string) => `/api/destinasi/excludes?destination_id=${id}`,
  itineraries: (id: string) => `/api/destinasi/itineraries?destination_id=${id}`,
  bookings: '/api/destinasi/bookings'
}