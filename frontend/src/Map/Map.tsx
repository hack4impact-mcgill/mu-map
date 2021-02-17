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
  const lng = DEFAULT_LONGITUDE;
  const lat = DEFAULT_LATITUDE;
  const zoom = DEFAULT_ZOOM;

  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: lat,
    longitude: lng,
    zoom: zoom,
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
  const [editMural, setEditMural] = useState<any>([]);

  // ----------------------USING MAPBOX----------------------------------- //
  // const [lng, setLng] = useState(DEFAULT_LONGITUDE);
  // const [lat, setLat] = useState(DEFAULT_LATITUDE);
  // const [zoom, setZoom] = useState(DEFAULT_ZOOM);
  // useEffect(() => {
  //   const map = new mapboxgl.Map({
  //     container: (mapContainer as any),
  //     style: "mapbox://styles/mapbox/streets-v11",
  //     center: [lng, lat],
  //     zoom: zoom,
  //     attributionControl: false
  //   });
  //   map.addControl(
  //     new mapboxgl.GeolocateControl({
  //       positionOptions: {
  //         enableHighAccuracy: true
  //       },
  //       trackUserLocation: true
  //     }),
  //     'bottom-right'
  //   );

  //   map.addControl(new mapboxgl.AttributionControl(), 'top-left');

  //   map.on("move", () => {
  //     setLng(map.getCenter().lng);
  //     setLat(map.getCenter().lat);
  //     setZoom(map.getZoom());
  //   });

  //   murals.forEach((mural: any) => {
  //     // new mapboxgl.Marker({ color: "red" })
  //     //   .setLngLat([
  //     //     mural.coordinates.coordinates[0],
  //     //     mural.coordinates.coordinates[1],
  //     //   ])
  //     //   .addTo(map);
  //     <Marker key={mural.name} latitude={mural.coordinates.coordinates[0]} longitude={mural.coordinates.coordinates[1]}>
  //       <img src="https://toppng.com/uploads/preview/pin-drop-icon-drop-pin-icon-11553428790llctccp464.png" alt="Pin" />
  //     </Marker >
  //   });
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [murals]);

  // ----------------------------------------------------------------------- //

  return (
    // ----------------------USING MAPBOX----------------------------------- //
    // <div>
    //   <div ref={(el) => (mapContainer = el)} className="mapContainer" />
    // </div>
    // ----------------------------------------------------------------------- //
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
          <Button variant="contained" color="primary" onClick={() => setEditMural(popupInfo)}>EDIT</Button>
        </Popup>
      )
      }

    </ReactMapGL >
  );
}

export default Map;


