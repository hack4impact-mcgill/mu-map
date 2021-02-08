import React from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { useState, useEffect } from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { GET_ALL_BOROUGH_API } from "../constants/constants"

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1),
    width: "195px",
    zIndex: 1,
    position: "relative",
    display: "inline-block",
  },
}));

interface IBoroughSearchBarProps {
  callback: (boroughId: number | null) => void;
}

export default function BoroughSearchBar(props: IBoroughSearchBarProps) {
  const [boroughs, setboroughs] = useState([]);
  const [query, setQuery] = useState("");
  const classes = useStyles();
  const [result, setResult] = useState([]);

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

  function getIdAndCallback(newValue: string) {
    // results has a default max size of 5 I believe, so this is O(1)
    const filtered: any = result.filter((result: any) => {
      return result.name.toLowerCase().includes(newValue.toLowerCase());
    });
    if (filtered.length === 0) props.callback(null);
    props.callback(filtered[0].id);
  }

  return (
    <div className={classes.root}>
      <Autocomplete
        freeSolo={false}
        disableClearable
        options={result.map((borough: any) => borough.name)}
        onChange={(event: any, newValue: string) => {
          getIdAndCallback(newValue);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            id="search-borough"
            label="Search borough..."
            variant="filled"
            size="small"
            onChange={(e) => setQuery(e.target.value.toLowerCase())}
          />
        )}
      />
    </div>
  );
}
