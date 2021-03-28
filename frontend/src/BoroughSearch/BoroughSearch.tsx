import React, { useContext } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { useState, useEffect } from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { GET_ALL_BOROUGH_API } from "../constants/constants";
import Context from "context";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(0, 0, 3, 0),
    width: "100%",
    zIndex: 1,
    position: "relative",
    display: "inline-block",
  },
}));

interface IBoroughSearchBarProps {
  defaultBorough?: string;
  callback: (boroughId: number | null) => void;
}

export default function BoroughSearchBar(props: IBoroughSearchBarProps) {
  const [boroughs, setboroughs] = useState([]);
  const [query, setQuery] = useState("");
  const classes = useStyles();
  const [result, setResult] = useState([]);
  const [defaultName, setDefaultName] = useState("");

  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  useEffect(() => {
    axios
      .get(GET_ALL_BOROUGH_API)
      .then((response) => {
        if (response.data) setboroughs(response.data.rows);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    const filtered = boroughs.filter((borough: any) => {
      return borough.name.toLowerCase().includes(query);
    });
    setResult(filtered);
  }, [query, boroughs]);

  /**
   * If a default boroughId prop is supplied, find the corresponding
   * borough's name
   */
  useEffect(() => {
    if (props.defaultBorough && boroughs.length > 0) {
      const filtered: any = boroughs.filter((borough: any) => {
        return borough.id === props.defaultBorough
      })
      setDefaultName(filtered[0].name);
    }
  }, [props.defaultBorough, boroughs])

  /**
   * Enable editing for admin users
   */
  const userContext = useContext(Context)
  useEffect(() => setIsAdmin(!!(userContext as any).user), [userContext]);
  
  function getIdAndCallback(newValue: string) {
    // results has a default max size of 5 I believe, so this is O(1)
    const filtered: any = result.filter((result: any) => {
      return result.name.toLowerCase().includes(newValue.toLowerCase());
    });
    if (filtered.length === 0) props.callback(null);
    setDefaultName(filtered[0].name);
    props.callback(filtered[0].id);
  }

  return (
    <div className={classes.root}>
      {
        isAdmin ? (
          <Autocomplete
            freeSolo={false}
            disableClearable
            value={defaultName || null}
            options={result.map((borough: any) => borough.name)}
            onChange={(event: any, newValue: string) => {
              getIdAndCallback(newValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                id="search-borough"
                label="Borough"
                variant="outlined"
                size="small"
                placeholder="Choose a borough"
                onChange={(e) => setQuery(e.target.value.toLowerCase())}
              />
            )}
          />
        ) : (
          <div>
            <Typography variant="caption" color="textSecondary">Borough</Typography>
            <Typography variant="body1">{defaultName}</Typography>
          </div>
        )
      }
    </div>
  );
}
