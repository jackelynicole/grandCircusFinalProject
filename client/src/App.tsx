import { useRef, useEffect } from 'react'
import mapboxgl from 'mapbox-gl'

import 'mapbox-gl/dist/mapbox-gl.css';

import './App.css'
import EventsTest from "./components/EventsTest"

function App() {

  const mapRef = useRef()
  const mapContainerRef = useRef()

  useEffect(() => {
    mapboxgl.accessToken = 'pk.eyJ1IjoibGlnaHRuaW5nc3ByZWUiLCJhIjoiY205YzB0NnhlMG52ejJrcTJseWxhcXZhZiJ9.VFBHYF5wcCBw35HASKi_eA'
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      center: [-83.0502, 42.3337],
      zoom: 12.42
    });

    return () => {
      mapRef.current.remove()
    }
  }, [])

  return (
    <>
      <h1>hello, world</h1>
      <EventsTest />
      <div id='map-container' ref={mapContainerRef}/>
    </>
  )
}

export default App
