// Beer spots in Sofia. Coordinates are approximate — tweak lat/lng here if a pin is slightly off.
export const MAP_CENTER = { lat: 42.6925, lng: 23.332 }

export const places = [
  {
    id: 'high-five',
    name: 'High Five Taproom',
    address: 'ul. "Hristo Belchev" 29B, 1000 Sofia',
    description: 'Craft beer bar & shop with 15 taps and well-stocked fridges.',
    position: { lat: 42.69118, lng: 23.31946 },
  },
  {
    id: 'crafter',
    name: 'Crafter Bar - Craft Beer & Drinks',
    address: 'ul. "Hristo Belchev" 6, 1000 Sofia',
    description: 'Curated Bulgarian and international craft beers just off Vitosha Blvd.',
    position: { lat: 42.69402, lng: 23.32012 },
  },
  {
    id: 'kanaal',
    name: 'KANAAL',
    address: 'bul. "Madrid" 2, 1505 Sofia',
    description: "Sofia's craft beer bar since 2011 — 38 taps and 100+ beers.",
    position: { lat: 42.69466, lng: 23.34786 },
  },
  {
    id: 'ale-house',
    name: 'Ale House Center',
    address: 'ul. "Hristo Belchev" 42, 1000 Sofia',
    description: 'Cozy pub where you pour live beer from a tap at your own table.',
    position: { lat: 42.68953, lng: 23.31907 },
  },
]

export function googleMapsLink(place) {
  const query = encodeURIComponent(`${place.name}, ${place.address}`)
  return `https://www.google.com/maps/search/?api=1&query=${query}`
}
