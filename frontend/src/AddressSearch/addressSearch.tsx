import React, { useContext } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { useState, useEffect, Fragment } from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {
  MAPBOX_GEOCODING_API,
  MTL_MIN_LONGITUDE,
  MTL_MAX_LATITUDE,
  MTL_MAX_LONGITUDE,
  MTL_MIN_LATITUDE,
} from "../constants/constants";
import CircularProgress from "@material-ui/core/CircularProgress";
import Context from "context";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1, 0, 3, 0),
    width: "100%",
    zIndex: 1,
    position: "relative",
    display: "inline-block",
  },
}));

interface IAddressSearchBarProps {
  defaultAddress?: string;
  callback: (coords: number[], address: string, neighbourhood: string) => void;
}

export default function AddressSearchBar(props: IAddressSearchBarProps) {
  const styles = useStyles();
  const [open, setOpen] = useState<boolean>(false);
  const [query, setQuery] = useState<string>("");
  const [options, setOptions] = useState([]);
  const [response, setResponse] = useState([]);
  const loading = open && options.length === 0;

  const [isAdmin, setIsAdmin] = useState<boolean>(false);

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
          setResponse(response.data.features);
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

  /**
   * Enable editing for admin users
   */
  const userContext = useContext(Context)
  useEffect(() => setIsAdmin(!!(userContext as any).user), [userContext]);

  function updateCoordinates(selection: string) {
    const filtered: any = response.filter((option: any) => {
      return option.place_name === selection;
    });
    if (filtered.length === 0) props.callback([], "", "");
    props.callback(
      filtered[0].center,
      filtered[0].place_name,
      filtered[0].context[0].text
    );
  }

  return (
    <div className={styles.root}>
      {
        isAdmin ? (
          <Autocomplete
            freeSolo={false}
            disableClearable
            open={open}
            loading={loading}
            id="address-search-bar"
            options={options}
            defaultValue={props.defaultAddress}
            filterOptions={(options) => options}
            onOpen={() => {
              setOpen(true);
            }}
            onClose={() => {
              setOpen(false);
            }}
            onChange={(event: any, selection: string) =>
              updateCoordinates(selection)
            }
            renderInput={(params) => (
              <TextField
                {...params}
                id="autocomplete-text-f"
                label="Address"
                variant="outlined"
                size="small"
                placeholder="Type at least two characters"
                onChange={(e) => setQuery(e.target.value.toLowerCase())}
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <Fragment>
                      {loading ? (
                        <CircularProgress color="inherit" size={20} />
                      ) : null}
                      {params.InputProps.endAdornment}
                    </Fragment>
                  ),
                }}
              />
            )}
          />
          ) : (
          <div>
            <Typography variant="caption" color="textSecondary">Address</Typography>
            <Typography variant="body1">{props.defaultAddress}</Typography>
          </div>
        )
      }
    </div>
  );
}
