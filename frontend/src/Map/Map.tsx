import React, { useState, forwardRef, useImperativeHandle } from "react";
import ReactMapGL, {
  Popup,
  GeolocateControl,
  FlyToInterpolator,
} from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import CustomMarker from "../CustomMarker/CustomMarker";
import CustomSource from "../CustomSource/CustomSource";
import {
  Button,
  IconButton,
  createStyles,
  makeStyles,
  Typography,
  Theme,
} from "@material-ui/core";
import HighlightOffOutlinedIcon from "@material-ui/icons/HighlightOffOutlined";
import {
  DEFAULT_LONGITUDE,
  DEFAULT_LATITUDE,
  DEFAULT_ZOOM,
  MAPBOX_STYLE_URL,
  PINPOINT_ZOOM,
  PLACEHOLDER_IMAGE
} from "constants/constants";
import "./Map.css";
import mapboxgl from "mapbox-gl";
// @ts-ignore
import { easeCubic } from "d3-ease";
// eslint-disable-next-line import/no-webpack-loader-syntax
(mapboxgl as any).workerClass = require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;

interface IMapProps {
  muralClick: (mural: any) => void;
  murals: any;
  tours: any;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    popupDetailButton: {
      width: "100%",
      margin: theme.spacing(1, 0, 0, 0)
    },
    popupDetails: {
      width: "300px",
      padding: theme.spacing(0, 2, 2, 2)
    },
    geolocateControl: {
      bottom: theme.spacing(2),
      right: 0,
      padding: theme.spacing(2)
    },
    popupImage: {
      width: "300px",
      height: "100px",
      paddingBottom: "10px",
      objectFit: "cover",
      borderRadius: "4px"
    },
    popupCloseButton: {
      position: 'absolute',
      padding: theme.spacing(1),
      margin: theme.spacing(-2, 0, 0, -3)
    }
  })
);

const Map = forwardRef(({ muralClick, murals, tours }: IMapProps, ref: any) => {

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
        <Popup
          tipSize={0}
          anchor={"top"}
          longitude={popupInfo.coordinates.coordinates[0]}
          latitude={popupInfo.coordinates.coordinates[1]}
          closeOnClick={false}
          closeButton={false}
          onClose={setPopupInfo}
        >
          <img
            className={styles.popupImage}
            src={!!popupInfo.imgURLs ? popupInfo.imgURLs[0] : PLACEHOLDER_IMAGE }
            alt="Mural_img"
          />
          <IconButton
            onClick={setPopupInfo}
            className={styles.popupCloseButton}
          >
            <HighlightOffOutlinedIcon color="action" />
          </IconButton>
          <div className={styles.popupDetails}>
            <Typography variant="h6">
              <strong>
                {popupInfo.name}
              </strong>
            </Typography>
            <Typography variant="caption">{popupInfo.address}</Typography>
            <Button
              variant="outlined"
              disableElevation
              color="primary"
              onClick={() => muralClick(popupInfo)}
              className={styles.popupDetailButton}
            >
              DETAILS
            </Button>
          </div>
        </Popup>
      )}

      <CustomSource tours={tours} />
    </ReactMapGL>
  );
});

export default Map;
