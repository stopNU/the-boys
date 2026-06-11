import { useState, useCallback } from 'react'
import { GoogleMap, MarkerF, InfoWindowF, useJsApiLoader } from '@react-google-maps/api'
import { places, googleMapsLink, MAP_CENTER } from '../data/places'

const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY

const containerStyle = { width: '100%', height: '100%' }

function PlaceList({ onSelect, selectedId }) {
  return (
    <div className="place-list">
      {places.map((place) => (
        <button
          key={place.id}
          className={`place-card ${selectedId === place.id ? 'selected' : ''}`}
          onClick={() => onSelect(place)}
        >
          <h3>🍺 {place.name}</h3>
          <p className="place-address">{place.address}</p>
          <p className="place-description">{place.description}</p>
          <a
            href={googleMapsLink(place)}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => e.stopPropagation()}
          >
            Open in Google Maps ↗
          </a>
        </button>
      ))}
    </div>
  )
}

function BeerMap({ selected, onSelect }) {
  const { isLoaded, loadError } = useJsApiLoader({ googleMapsApiKey: apiKey })
  const [map, setMap] = useState(null)

  const handleSelect = useCallback(
    (place) => {
      onSelect(place)
      if (place && map) map.panTo(place.position)
    },
    [map, onSelect],
  )

  if (loadError) {
    return (
      <div className="map-placeholder">
        <p>Could not load Google Maps. Check that your API key is valid.</p>
      </div>
    )
  }

  if (!isLoaded) {
    return (
      <div className="map-placeholder">
        <p>Loading map…</p>
      </div>
    )
  }

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={MAP_CENTER}
      zoom={14}
      onLoad={setMap}
      options={{ mapTypeControl: false, streetViewControl: false }}
    >
      {places.map((place) => (
        <MarkerF
          key={place.id}
          position={place.position}
          title={place.name}
          onClick={() => handleSelect(place)}
        />
      ))}
      {selected && (
        <InfoWindowF position={selected.position} onCloseClick={() => onSelect(null)}>
          <div className="info-window">
            <strong>{selected.name}</strong>
            <p>{selected.address}</p>
            <a href={googleMapsLink(selected)} target="_blank" rel="noreferrer">
              Open in Google Maps ↗
            </a>
          </div>
        </InfoWindowF>
      )}
    </GoogleMap>
  )
}

export default function MapPage() {
  const [selected, setSelected] = useState(null)

  return (
    <div className="map-page">
      <aside className="map-sidebar">
        <h2>Beer spots in Sofia</h2>
        <p className="subtitle">Tap a place to highlight it on the map.</p>
        <PlaceList onSelect={setSelected} selectedId={selected?.id} />
      </aside>
      <div className="map-container">
        {apiKey ? (
          <BeerMap selected={selected} onSelect={setSelected} />
        ) : (
          <div className="map-placeholder">
            <h3>Google Maps API key missing</h3>
            <p>
              Add <code>VITE_GOOGLE_MAPS_API_KEY</code> to your <code>.env</code> file (or Vercel
              environment variables) to show the map. The place list on the left still works.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
