import React, { useState } from "react";
import ReactMapGL, {
  Popup,
  GeolocateControl,
  Source,
  Layer,
} from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import CustomMarker from "../CustomMarker/CustomMarker";
import Button from "@material-ui/core/Button";
import {
  DEFAULT_LONGITUDE,
  DEFAULT_LATITUDE,
  DEFAULT_ZOOM,
  MAPBOX_STYLE_URL,
  PRIMARY,
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

function Map({ muralClick, murals }: IMapProps) {
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

  const geojson = {
    type: "Feature" as "Feature",
    properties: [],
    geometry: [
      {
        type: "LineString" as "LineString",
        coordinates: [[0, 0]], // fill in with mural.coordinates in tour.getMurals()
      },
    ],
  };

  const [popupInfo, setPopupInfo] = useState<any>([]);

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

      <Source id="polylineLayer" type="geojson" data={geojson}>
        <Layer
          id="tour"
          type="line"
          source="" // add data?
          layout={{
            "line-join": "round",
            "line-cap": "round",
          }}
          paint={{
            "line-color": PRIMARY,
            "line-width": 5,
          }}
        />
      </Source>
    </ReactMapGL>
  );
}

export default Map;
