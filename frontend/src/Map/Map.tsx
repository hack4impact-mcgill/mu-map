import React, { useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import {
  DEFAULT_LONGITUDE,
  DEFAULT_LATITUDE,
  DEFAULT_ZOOM,
  MAPBOX_STYLE_URL
} from "constants/constants";
import { createStyles, makeStyles, Theme } from "@material-ui/core";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN || "";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      position: "absolute",
      left: 0,
      top: 0,
      bottom: 0,
      right: 0
    }
  })
);

interface IMapProps {
  mapContainer: HTMLElement | string | null;
  murals: any;
}

function Map({ mapContainer, murals }: IMapProps) {

  const styles = useStyles();

  const [lng, setLng] = useState(DEFAULT_LONGITUDE);
  const [lat, setLat] = useState(DEFAULT_LATITUDE);
  const [zoom, setZoom] = useState(DEFAULT_ZOOM);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: (mapContainer as any),
      style: MAPBOX_STYLE_URL,
      center: [lng, lat],
      zoom: zoom,
      attributionControl: false
    });

    map.addControl(new mapboxgl.NavigationControl(), 'bottom-right');
    map.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true
        },
        trackUserLocation: true
      }),
      'bottom-right'
    );
    map.addControl(new mapboxgl.AttributionControl(), 'top-left');

    map.on("move", () => {
      setLng(map.getCenter().lng);
      setLat(map.getCenter().lat);
      setZoom(map.getZoom());
    });

    murals.forEach((mural: any) => {
      new mapboxgl.Marker({ color: "#FC323E" })
        .setLngLat([
          mural.coordinates.coordinates[0],
          mural.coordinates.coordinates[1],
        ])
        .addTo(map);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [murals]);

  return (
    <div ref={(el) => (mapContainer = el)} className={styles.container} />
  );
}

export default Map;
