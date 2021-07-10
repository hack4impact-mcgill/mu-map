import React, { useState, forwardRef, useImperativeHandle } from "react";
import ReactMapGL, {
  GeolocateControl,
  FlyToInterpolator,
} from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import CustomMarker from "../CustomMarker/CustomMarker";
import CustomSource from "../CustomSource/CustomSource";
import {
  createStyles,
  makeStyles,
  Theme,
} from "@material-ui/core";
import {
  DEFAULT_LONGITUDE,
  DEFAULT_LATITUDE,
  DEFAULT_ZOOM,
  MAPBOX_STYLE_URL,
  PINPOINT_ZOOM,
} from "constants/constants";
import "./Map.css";
import mapboxgl from "mapbox-gl";
// @ts-ignore
import { easeCubic } from "d3-ease";
import MapPopup from "./MapPopup";
// eslint-disable-next-line import/no-webpack-loader-syntax
(mapboxgl as any).workerClass = require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;

interface IMapProps {
  muralClick: (mural: any) => void;
  murals: any;
  tours: any;
  currentTour: any;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    geolocateControl: {
      bottom: theme.spacing(2),
      right: 0,
      padding: theme.spacing(2)
    },
  })
);

const Map = forwardRef(({ muralClick, murals, tours, currentTour }: IMapProps, ref: any) => {

  const styles = useStyles();

  // type has to be 'any' for interpolator to work
  const [viewport, setViewport] = useState<any>({
    width: "100vw",
    height: "100vh",
    latitude: DEFAULT_LATITUDE,
    longitude: DEFAULT_LONGITUDE,
    zoom: DEFAULT_ZOOM,
  });

  const [popupInfo, setPopupInfo] = useState<any>([]);

  /**
   * Defines functions that can be called by a ref owner (App.tsx)
   */
  useImperativeHandle(ref, () => ({
    /**
     * Used for zooming to a selected mural from search
     * @param long longitude to zoom to
     * @param lat latitude to zoom to
     */
    setLongLat(long: number, lat: number) {
      setViewport({
        width: "100vw",
        height: "100vh",
        latitude: lat,
        longitude: long,
        zoom: PINPOINT_ZOOM,
        transitionInterpolator: new FlyToInterpolator(),
        transitionEasing: easeCubic,
        transitionDuration: 3000,
      });
    },
  }));

  return (
    <ReactMapGL
      {...viewport}
      onViewportChange={(nextViewport: any) => {
        setViewport(nextViewport);
      }}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      mapStyle={MAPBOX_STYLE_URL}
    >
      <GeolocateControl
        className={styles.geolocateControl}
        positionOptions={{ enableHighAccuracy: true }}
        trackUserLocation={true}
      />
      <CustomMarker murals={murals} setInfo={setPopupInfo} />
      {popupInfo && popupInfo.coordinates && (
        <MapPopup
          popupInfo={popupInfo}
          setInfo={setPopupInfo}
          clickDetail={muralClick}
        />
      )}
      <CustomSource tours={tours} currentTour={currentTour}/>
    </ReactMapGL>
  );
});

export default Map;
