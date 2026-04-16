// src/restapi/packages/queries.ts

import api from '@/services/api'
import { PACKAGE_ENDPOINTS } from './constants'
import type { Package, PackageImage, PackageInclude, PackageItinerary, PackageBookingPayload } from '@/types/packages'

// ========================
// PACKAGES
// ========================

export const getPackages = async (): Promise<Package[]> => {
  const { data } = await api.get<Package[]>(PACKAGE_ENDPOINTS.list)
  return data
}

export const getPackageDetail = async (id: string): Promise<Package> => {
  const { data } = await api.get<Package>(PACKAGE_ENDPOINTS.detail(id))
  return data
}

// ========================
// PACKAGE DETAIL RELATION
// ========================

export const getPackageImages = async (id: string): Promise<PackageImage[]> => {
  const { data } = await api.get<PackageImage[]>(PACKAGE_ENDPOINTS.images(id))
  return data
}

export const getPackageIncludes = async (id: string): Promise<PackageInclude[]> => {
  const { data } = await api.get<PackageInclude[]>(PACKAGE_ENDPOINTS.includes(id))
  return data
}

export const getPackageExcludes = async (id: string): Promise<PackageInclude[]> => {
  const { data } = await api.get<PackageInclude[]>(PACKAGE_ENDPOINTS.excludes(id))
  return data
}

export const getPackageItineraries = async (id: string): Promise<PackageItinerary[]> => {
  const { data } = await api.get<PackageItinerary[]>(PACKAGE_ENDPOINTS.itineraries(id))
  return data
}

// ========================
// BOOKING
// ========================

export const createPackageBooking = async (payload: PackageBookingPayload) => {
  const { data } = await api.post(PACKAGE_ENDPOINTS.bookings, payload)
  return data
}