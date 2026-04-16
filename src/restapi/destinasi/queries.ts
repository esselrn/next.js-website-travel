// src/restapi/destinasi/queries.ts

import api from '@/services/api'
import { DESTINATION_ENDPOINTS } from './constants'
import type {
  Destination,
  DestinationImage,
  DestinationInclude,
  DestinationItinerary,
  DestinationBookingPayload
} from '@/types/destinations'

// ========================
// DESTINATIONS
// ========================

export const getDestinations = async (): Promise<Destination[]> => {
  const { data } = await api.get<Destination[]>(DESTINATION_ENDPOINTS.list)
  return data
}

export const getDestinationDetail = async (id: string): Promise<Destination> => {
  const { data } = await api.get<Destination>(DESTINATION_ENDPOINTS.detail(id))
  return data
}

// ========================
// DESTINATION DETAIL RELATION
// ========================

export const getDestinationImages = async (id: string): Promise<DestinationImage[]> => {
  const { data } = await api.get<DestinationImage[]>(DESTINATION_ENDPOINTS.images(id))
  return data
}

export const getDestinationIncludes = async (id: string): Promise<DestinationInclude[]> => {
  const { data } = await api.get<DestinationInclude[]>(DESTINATION_ENDPOINTS.includes(id))
  return data
}

export const getDestinationExcludes = async (id: string): Promise<DestinationInclude[]> => {
  const { data } = await api.get<DestinationInclude[]>(DESTINATION_ENDPOINTS.excludes(id))
  return data
}

export const getDestinationItineraries = async (id: string): Promise<DestinationItinerary[]> => {
  const { data } = await api.get<DestinationItinerary[]>(DESTINATION_ENDPOINTS.itineraries(id))
  return data
}

// ========================
// BOOKING
// ========================

export const createDestinationBooking = async (payload: DestinationBookingPayload) => {
  const { data } = await api.post(DESTINATION_ENDPOINTS.bookings, payload)
  return data
}