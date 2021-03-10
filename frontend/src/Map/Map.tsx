import React, { useState, forwardRef, useImperativeHandle } from "react";
import ReactMapGL, { Popup, GeolocateControl } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import CustomMarker from "../CustomMarker/CustomMarker";
import Button from "@material-ui/core/Button";
import {
  DEFAULT_LONGITUDE,
  DEFAULT_LATITUDE,
  DEFAULT_ZOOM,
  MAPBOX_STYLE_URL,
  PINPOINT_ZOOM,
} from "constants/constants";
import "./Map.css";
import mapboxgl from "mapbox-gl";
import { Typography } from "@material-ui/core";
// eslint-disable-next-line import/no-webpack-loader-syntax
(mapboxgl as any).workerClass = require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;

interface IMapProps {
  muralClick: (mural: any) => void;
  murals: any;
}

const Map = forwardRef(({ muralClick, murals }: IMapProps, ref: any) => {
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: DEFAULT_LATITUDE,
    longitude: DEFAULT_LONGITUDE,
    zoom: DEFAULT_ZOOM,
  });

  const geolocateStyle = {
    bottom: 30,
    right: 0,
    padding: "10px",
  };

  const imgStyle = {
    maxWidth: "200px",
    maxHeight: "200px",
    paddingBottom: "10px",
  };

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
      });
    },
  }));

  return (
    <ReactMapGL
      {...viewport}
      onViewportChange={(nextViewport: any) => setViewport(nextViewport)}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      mapStyle={MAPBOX_STYLE_URL}
    >
      <GeolocateControl
        style={geolocateStyle}
        positionOptions={{ enableHighAccuracy: true }}
        trackUserLocation={true}
      />
      <CustomMarker murals={murals} setInfo={setPopupInfo} />
      {popupInfo && popupInfo.coordinates && (
        <Popup
          tipSize={0}
          anchor={"top"}
          longitude={popupInfo.coordinates.coordinates[0]}
          latitude={popupInfo.coordinates.coordinates[1]}
          closeOnClick={false}
          onClose={setPopupInfo}
        >
          <img
            style={imgStyle}
            src={popupInfo.imgURLs?.[0]}
            alt="Mural_img"
          ></img>
          <div>
            <Typography variant="h5" gutterBottom>
              {popupInfo.name}
            </Typography>
            <Typography variant="caption">{popupInfo.address}</Typography>
          </div>
          <br />
          <Button
            variant="outlined"
            disableElevation
            color="primary"
            onClick={() => muralClick(popupInfo)}
          >
            DETAILS
          </Button>
        </Popup>
      )}
    </ReactMapGL>
  );
});

export default Map;
