import { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

const DestinationMap = ({ lat, lon, title }) => {
  const mapRef = useRef(null)

  useEffect(() => {
    if (mapRef.current) return // already initialized

    const map = L.map('map').setView([lat, lon], 10)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map)
    L.marker([lat, lon]).addTo(map).bindPopup(title).openPopup()
    mapRef.current = map

    return () => {
      map.remove()
      mapRef.current = null
    }
  }, [lat, lon, title])

  return <div id="map" className='w-full h-64 rounded-2xl z-0' />
}

export default DestinationMap