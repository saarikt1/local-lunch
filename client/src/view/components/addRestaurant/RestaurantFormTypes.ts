export interface SearchResult {
  place_id: number
  address: {
    amenity: string
    road: string
    house_number: string
    postcode: number
    city: string
    town: string
    country: string
  }
  lat: string
  lng: string
  extratags: {
    website: string
  }
}

export interface FormData {
  (name: string, subtitle: string, website: string, latlon: string): void
}
