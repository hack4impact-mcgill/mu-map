import React, { useState } from "react";
import mapboxgl from "mapbox-gl";
import ReactMapGL, { Popup, GeolocateControl, AttributionControl } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import CustomMarker from "../CustomMarker/CustomMarker";
import Button from '@material-ui/core/Button';

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

function Map({ mapContainer, murals }: IMapProps) {

  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: DEFAULT_LATITUDE,
    longitude: DEFAULT_LONGITUDE,
    zoom: DEFAULT_ZOOM,
  });

  const geolocateStyle = {
    //bottom: 0,
    right: 0,
    padding: '10px'
  };
  const attributionStyle = {
    top: 0,
    left: 0,
    padding: '1px',
    width: "25vw",
  };

  const imgStyle = {
    maxWidth: '200px',
    maxHeight: '200px',
    padding: 'none'
  };

  const [popupInfo, setPopupInfo] = useState<any>([]);
  // const [editMural, setEditMural] = useState<any>([]); -> For the EDIT button of the popup

  return (
    <ReactMapGL
      {...viewport}
      onViewportChange={(nextViewport: any) => setViewport(nextViewport)
      }
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN || ""}
      mapStyle={'mapbox://styles/mumap/ckhb8l6je01ki1ao4tabh8e2q'} >
      <AttributionControl style={attributionStyle} />
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
            {popupInfo.address} </p>
          {/* <Button variant="contained" color="primary" onClick={() => setEditMural(popupInfo)}>EDIT</Button> */}
          <Button variant="contained" color="primary" >EDIT</Button>
        </Popup>
      )
      }

    </ReactMapGL >
  );
}

export default Map;


