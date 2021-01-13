import React from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { useState, useEffect } from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {
  MAPBOX_GEOCODING_API,
  MTL_MIN_LONGITUDE,
  MTL_MAX_LATITUDE,
  MTL_MAX_LONGITUDE,
  MTL_MIN_LATITUDE,
} from "../constants/constants";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "195px",
      zIndex: 1,
      position: "relative",
      display: "inline-block",
    },
  },
}));

export default function AddressSearchBar() {
  const styles = useStyles();
  const [open, setOpen] = useState<boolean>(false);
  const [query, setQuery] = useState<string>("");
  const [options, setOptions] = useState([]);
  const loading = open && options.length === 0;

  useEffect(() => {
    let active = true;
    if (query == null || query.length < 1) {
      return;
    }
    axios
      .get(MAPBOX_GEOCODING_API + query + ".json", {
        params: {
          access_token: process.env.REACT_APP_MAPBOX_TOKEN || "",
          types: "address",
          fuzzyMatch: "true",
          bbox:
            MTL_MIN_LONGITUDE +
            "," +
            MTL_MIN_LATITUDE +
            "," +
            MTL_MAX_LONGITUDE +
            "," +
            MTL_MAX_LATITUDE,
        },
      })
      .then((response) => {
        if (active) {
          setOptions(
            response.data.features.map((feature: any) => feature.place_name)
          );
        }
      })
      .catch(() => {
        console.log("error");
      })
      .finally(() => {
        active = false;
      });
  }, [loading, query]);

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (
    <div className={styles.root}>
      <Autocomplete
        freeSolo={false}
        open={open}
        loading={loading}
        id="address-search-bar"
        options={options}
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          setOpen(false);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            id="autocomplete-text-f"
            label="Search..."
            onChange={(e) => setQuery(e.target.value.toLowerCase())}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  {loading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              ),
            }}
          />
        )}
      />
    </div>
  );
}
