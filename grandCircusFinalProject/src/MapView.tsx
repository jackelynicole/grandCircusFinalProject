import React, { useRef, useEffect } from "react";
import mapboxgl, { Map as MapboxMap } from "mapbox-gl"

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN as string

const MapView: React.FC = () => {
    const mapContainer = useRef<HTMLDivElement>(null);
    const map = useRef<MapboxMap | null>(null);

    useEffect(() => {
        if (map.current || !mapContainer.current) return;
    
        map.current = new mapboxgl.Map({
          container: mapContainer.current,
          style: "mapbox://styles/mapbox/streets-v11",
          center: [-74.5, 40], // lng, lat
          zoom: 9,
        });

        return () => {
            map.current?.remove(); // clean up on unmount
          };
        }, []);
        return <div ref={mapContainer} className="map-container" />;
}

export default MapView