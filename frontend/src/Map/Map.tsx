import React, { useState } from "react";
import ReactMapGL, { Popup, GeolocateControl } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import CustomMarker from "../CustomMarker/CustomMarker";
import Button from '@material-ui/core/Button';
import {
  DEFAULT_LONGITUDE,
  DEFAULT_LATITUDE,
  DEFAULT_ZOOM,
  MAPBOX_STYLE_URL,
} from "constants/constants";
import "./Map.css";
import mapboxgl from "mapbox-gl";
// eslint-disable-next-line import/no-webpack-loader-syntax
(mapboxgl as any).workerClass = require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;

interface IMapProps {
  markerClick: (marker: any) => void;
  murals: any;
}

function Map({ markerClick, murals }: IMapProps) {

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
    padding: '10px'
  };

  const imgStyle = {
    maxWidth: '200px',
    maxHeight: '200px',
    padding: 'none'
  };

  const [popupInfo, setPopupInfo] = useState<any>([]);

  return (
    <ReactMapGL
      {...viewport}
      onViewportChange={(nextViewport: any) => setViewport(nextViewport)
      }
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
          <img style={imgStyle} src={popupInfo.ImgURLs} alt="Mural_img" ></img>
          <p>
            <h3> {popupInfo.name} </h3>
            {popupInfo.address}
          </p>
          <Button
            variant="outlined"
            disableElevation
            color="primary"
            onClick={() => markerClick(popupInfo)}>DETAILS</Button>
        </Popup>
      )
      }
    </ReactMapGL >
  );
}

export default Map;
