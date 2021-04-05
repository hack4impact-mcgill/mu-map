import React from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { useState, useEffect, useContext } from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Context from "context";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(0, 0, 3, 0),
    width: "100%",
    zIndex: 1,
    position: "relative",
    display: "inline-block",

  }
}));

interface IArtistBoroughSearchProps {
  defaultSelection?: number | string;
  callback: (artistOrBoroughId: number | null) => void;
  endpoint: any;
  label: string;
  placeHolder: string;
}

export default function ArtistBoroughSearch(props: IArtistBoroughSearchProps) {
  const [selections, setSelections] = useState([]);
  const [querySelection, setQuerySelection] = useState("");
  const classes = useStyles();
  const [selectionResult, setSelectionResult] = useState([]);
  const [defaultSelectionName, setDefaultSelectionName] = useState("");
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  useEffect(() => {
    axios
      .get(props.endpoint)
      .then((response) => {
        if (response.data) setSelections(response.data.rows);
      })
      .catch((err) => console.log(err));
  }, [props.endpoint]);

  useEffect(() => {
    const filtered = selections.filter((artistOrBorough: any) => {
      return artistOrBorough.name.toLowerCase().includes(querySelection);
    });
    setSelectionResult(filtered);
  }, [querySelection, selections]);

  useEffect(() => {
    if (props.defaultSelection && selections.length > 0) {
      const filtered: any = selections.filter((artist: any) => {
        return artist.id === props.defaultSelection
      })
      setDefaultSelectionName(filtered[0].name);
    }
  }, [props.defaultSelection, selections]);

  /**
   * Enable editing for admin users
   */
  const userContext = useContext(Context)
  useEffect(() => setIsAdmin(!!(userContext as any).user), [userContext]);

  /**
   * when the user finish inputting the borough or the artist, send to the parent component the object's id
   * @param newValue
   */
  function getSelectionAndCallback(newValue: string) {
    // results has a default max size of 5 I believe, so this is O(1)
    const filtered: any = selectionResult.filter((result: any) => {
      return result.name.toLowerCase().includes(newValue.toLowerCase());
    });
    if (filtered.length === 0) props.callback(null);
    setDefaultSelectionName(filtered[0].name);
    props.callback(filtered[0].id);
  }

  return (
    <div className={classes.root}>
      {
        isAdmin ? (
          <Autocomplete
            freeSolo={false}
            disableClearable
            value={defaultSelectionName || null}
            options={selectionResult.map((artist: any) => artist.name)}
            onChange={(event: any, newValue: string) => {
              getSelectionAndCallback(newValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label={props.label}
                variant="outlined"
                size="small"
                placeholder={props.placeHolder}
                onChange={(e) => setQuerySelection(e.target.value.toLowerCase())}
              />
            )}
          />
        ) : (
          <div>
            <Typography variant="caption" color="textSecondary">{props.label}</Typography>
            <Typography variant="body1">{defaultSelectionName}</Typography>
          </div>
        )
      }
    </div>
  );
}
