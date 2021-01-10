import React, { useState, useEffect, useRef } from "react";
import FormGroup from "@material-ui/core/FormGroup";
import TextField from "@material-ui/core/TextField";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    flexContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    element: {
      margin: theme.spacing(1),
    },
  })
);

interface IMuralFormProps {}

interface geocoderResponse {
  text: string;
  name: string;
  coordinates: {
    long: number;
    lat: number;
  };
  neighborhood: string;
}

function MuralForm(props: IMuralFormProps) {
  const styles = useStyles();
  const currYear = new Date().getFullYear();
  const accessToken = process.env.REACT_APP_MAPBOX_TOKEN || "";
  const [geoResp, setGeoResp] = useState<geocoderResponse>();

  function handleGeocoderResponse(results: any) {
    if (results.features.length > 0) {
        const mostRelevantQuery: any = results.features[0];
        const newGeoResp : geocoderResponse = {
            text: mostRelevantQuery.text,
            name: mostRelevantQuery.place_name,
            coordinates: {
              long: mostRelevantQuery.center[0],
              lat: mostRelevantQuery.center[1],
            },
            neighborhood: mostRelevantQuery.context[0].text,
        }
        setGeoResp(newGeoResp);
      }
  }

  //runs once after html is built to add the geocoder
  useEffect(() => {
    //todo: find the best bounding box for montreal and put it in constants
    const geocoder = new MapboxGeocoder({
      accessToken: accessToken,
      bbox: [-73.85123, 45.370932, -73.33952, 45.752154],
      types: "address",
    });
    // ugly but no other way to do it?
    geocoder.addTo("#geocoder");
    geocoder.on("results", handleGeocoderResponse);
    geocoder.on("result", function ()  {
        console.log('here')
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //runs whenever geocoder response is updated
  useEffect(() => {
    console.log(geoResp)
  }, [geoResp])

  return (
    <form noValidate autoComplete="off">
      <div className={styles.flexContainer}>
        <TextField className={styles.element} required id="name" label="Name" />
        <TextField
          className={styles.element}
          required
          id="year"
          label="year"
          type="number"
          defaultValue={currYear}
        />
        <TextField
          className={styles.element}
          required
          id="artist"
          label="Artist"
          defaultValue="Unknown Artist"
        />
        <div id="geocoder" className={styles.element} />
        <TextField
          className={styles.element}
          multiline
          rows={4}
          id="description"
          label="Description"
          defaultValue="No Description"
        />
      </div>
    </form>
  );
}

export default MuralForm;
