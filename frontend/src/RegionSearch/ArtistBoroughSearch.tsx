import React from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { useState, useEffect } from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { GET_ALL_ARTISTS_API, GET_ALL_BOROUGH_API } from "../constants/constants"


const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(0, 0, 3, 0),
        width: "100%",
        zIndex: 1,
        position: "relative",
        display: "inline-block",

    },
    element: {
        margin: theme.spacing(0, 0, 3, 0)
    }
}));


interface IArtistBoroughSearchProps {
    defaultArtist?: number;
    defaultBorough?: string;
    callbackArtist: (artistId: number | null) => void;
    callbackBorough: (boroughId: number | null) => void;
}


export default function ArtistBoroughSearch(props: IArtistBoroughSearchProps) {
    const [artists, setArtists] = useState([]);
    const [boroughs, setboroughs] = useState([]);
    const [queryArtist, setQueryArtist] = useState("");
    const [queryBorough, setQueryBorough] = useState("");
    const classes = useStyles();
    const [artistResult, setArtistResult] = useState([]);
    const [boroughResult, setBoroughResult] = useState([]);
    const [defaultArtistName, setDefaultArtistName] = useState("");
    const [defaultBoroughName, setDefaultBoroughName] = useState("");

    useEffect(() => {
        axios
            .get(GET_ALL_ARTISTS_API)
            .then((response) => {
                if (response.data) setArtists(response.data.rows);
            })
            .catch((err) => console.log(err));
    }, []);

    useEffect(() => {
        axios
            .get(GET_ALL_BOROUGH_API)
            .then((response) => {
                if (response.data) setboroughs(response.data.rows);
            })
            .catch((err) => console.log(err));
    }, []);

    useEffect(() => {
        const filtered = artists.filter((artist: any) => {
            return artist.name.toLowerCase().includes(queryArtist);
        });
        setArtistResult(filtered);
    }, [queryArtist, artists]);

    useEffect(() => {
        const filtered = boroughs.filter((borough: any) => {
            return borough.name.toLowerCase().includes(queryBorough);
        });
        setBoroughResult(filtered);
    }, [queryBorough, boroughs]);

    useEffect(() => {
        if (props.defaultArtist && artists.length > 0) {
            const filtered: any = artists.filter((artist: any) => {
                return artist.id === props.defaultArtist
            })
            setDefaultArtistName(filtered[0].name);
        }
    }, [props.defaultArtist, artists]);

    useEffect(() => {
        if (props.defaultBorough && boroughs.length > 0) {
            const filtered: any = boroughs.filter((borough: any) => {
                return borough.id === props.defaultBorough
            })
            setDefaultBoroughName(filtered[0].name);
        }
    }, [props.defaultBorough, boroughs])

    function getArtistIdAndCallback(newValue: string) {
        // results has a default max size of 5 I believe, so this is O(1)
        const filtered: any = artistResult.filter((result: any) => {
            return result.name.toLowerCase().includes(newValue.toLowerCase());
        });
        if (filtered.length === 0) props.callbackArtist(null);
        setDefaultArtistName(filtered[0].name);
        props.callbackArtist(filtered[0].id);
    }

    function getBoroughIdAndCallback(newValue: string) {
        // results has a default max size of 5 I believe, so this is O(1)
        const filtered: any = boroughResult.filter((result: any) => {
            return result.name.toLowerCase().includes(newValue.toLowerCase());
        });
        if (filtered.length === 0) props.callbackBorough(null);
        setDefaultBoroughName(filtered[0].name);
        props.callbackBorough(filtered[0].id);
    }


    return (
        <div className={classes.root}>
            <Autocomplete className={classes.element}
                freeSolo={false}
                disableClearable
                value={defaultArtistName || null}
                options={artistResult.map((artist: any) => artist.name)}
                onChange={(event: any, newValue: string) => {
                    getArtistIdAndCallback(newValue);
                }}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        id="search-artist"
                        label="Artist"
                        variant="outlined"
                        size="small"
                        placeholder="Who made it?"
                        onChange={(e) => setQueryArtist(e.target.value.toLowerCase())}
                    />
                )}
            />
            <Autocomplete
                freeSolo={false}
                disableClearable
                value={defaultBoroughName || null}
                options={boroughResult.map((borough: any) => borough.name)}
                onChange={(event: any, newValue: string) => {
                    getBoroughIdAndCallback(newValue);
                }}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        id="search-borough"
                        label="Borough"
                        variant="outlined"
                        size="small"
                        placeholder="Choose a borough"
                        onChange={(e) => setQueryBorough(e.target.value.toLowerCase())}
                    />
                )}
            />
        </div>
    );
}