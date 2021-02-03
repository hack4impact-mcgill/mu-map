import React, { useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import {
  DEFAULT_LONGITUDE,
  DEFAULT_LATITUDE,
  DEFAULT_ZOOM,
} from "constants/constants";
import "./Map.css";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN || "";

interface IMapProps {
  mapContainer: HTMLElement | string | null;
  murals: any;
}

function Map({mapContainer, murals}: IMapProps) {
  const [lng, setLng] = useState(DEFAULT_LONGITUDE);
  const [lat, setLat] = useState(DEFAULT_LATITUDE);
  const [zoom, setZoom] = useState(DEFAULT_ZOOM);


  useEffect(() => {
    const map = new mapboxgl.Map({
      container: (mapContainer as any),
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
    });

    map.addControl(
        new mapboxgl.GeolocateControl({
            positionOptions: {
                enableHighAccuracy: true
            },
            trackUserLocation: true
        })
    );

    map.on("move", () => {
      setLng(map.getCenter().lng);
      setLat(map.getCenter().lat);
      setZoom(map.getZoom());
    });

    murals.forEach((mural: any) => {
      new mapboxgl.Marker()
        .setLngLat([
          mural.coordinates.coordinates[0],
          mural.coordinates.coordinates[1],
        ])
        .addTo(map);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [murals]);

  return (
    <div>
      <div ref={(el) => (mapContainer = el)} className="mapContainer" />
    </div>
  );
}

export default Map;
