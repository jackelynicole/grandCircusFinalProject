// client/src/components/EventMap.tsx
import { useRef, useEffect } from "react"
import mapboxgl from "mapbox-gl"
import "mapbox-gl/dist/mapbox-gl.css"
import "./EventMap.css"

interface EventMapProps {
  location: string
}

const EventMap: React.FC<EventMapProps> = ({ location }) => {
  const mapRef = useRef<mapboxgl.Map | null>(null)
  const mapContainerRef = useRef<HTMLDivElement>(null)

  const getVenueName = (location: string) => {
    const commaIndex = location.indexOf(",")
    const dashIndex = location.indexOf("-")

    if (commaIndex > 0) {
      return location.substring(0, commaIndex).trim()
    } else if (dashIndex > 0) {
      return location.substring(0, dashIndex).trim()
    } else {
      return location.length > 20 ? location.substring(0, 20) + "..." : location
    }
  }

  useEffect(() => {
    if (!mapContainerRef.current) return
    mapboxgl.accessToken =
      "pk.eyJ1IjoibGlnaHRuaW5nc3ByZWUiLCJhIjoiY205YzB0NnhlMG52ejJrcTJseWxhcXZhZiJ9.VFBHYF5wcCBw35HASKi_eA"
    const detroitCoordinates: [number, number] = [-83.0458, 42.3314]

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: detroitCoordinates,
      zoom: 12,
      dragPan: false,
      scrollZoom: false,
      interactive: false
    })

    return () => {
      if (mapRef.current) {
        mapRef.current.remove()
      }
    }
  }, [location])

  return (
    <div className='event-map-container'>
      <div className='event-map' ref={mapContainerRef}></div>
      <div className='event-map-overlay'>
        <p>{getVenueName(location)}</p>
      </div>
    </div>
  )
}

export default EventMap
