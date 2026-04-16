// src/services/destinations.service.ts

export type {
  Destination,
  DestinationImage,
  DestinationInclude,
  DestinationItinerary,
  DestinationBookingPayload
} from '@/types/destinations'

export {
  getDestinations,
  getDestinationDetail,
  getDestinationImages,
  getDestinationIncludes,
  getDestinationExcludes,
  getDestinationItineraries,
  createDestinationBooking
} from '@/restapi/destinasi/queries'