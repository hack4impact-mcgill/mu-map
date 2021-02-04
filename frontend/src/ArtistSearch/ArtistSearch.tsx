import React from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { useState, useEffect } from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { GET_ALL_ARTISTS_API } from "../constants/constants"

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1),
    width: "195px",
    zIndex: 1,
    position: "relative",
    display: "inline-block",
  },
}));

interface IArtistSearchBarProps {
  callback: (artistId: number | null) => void;
}

export default function ArtistSearchBar(props: IArtistSearchBarProps) {
  const [artists, setArtists] = useState([]);
  const [query, setQuery] = useState("");
  const classes = useStyles();
  const [result, setResult] = useState([]);

  useEffect(() => {
    axios
      .get(GET_ALL_ARTISTS_API)
      .then((response) => {
        if (response.data) setArtists(response.data.rows);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    const filtered = artists.filter((artist: any) => {
      return artist.name.toLowerCase().includes(query);
    });
    setResult(filtered);
  }, [query, artists]);

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
        options={result.map((artist: any) => artist.name)}
        onChange={(event: any, newValue: string) => {
          getIdAndCallback(newValue);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            id="search-artist"
            label="Search Artist..."
            variant="filled"
            size="small"
            onChange={(e) => setQuery(e.target.value.toLowerCase())}
          />
        )}
      />
    </div>
  );
}
