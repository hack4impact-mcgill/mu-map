import React from 'react';
import './Search.css';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { useState, useEffect } from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
      backgroundColor: '#fff',
      zIndex: 1,
      position: 'relative',
      display: 'inline-block',

    },
  },
}));

export default function SearchBar() {
  const [murals, setMurals] = useState([]);
  const [query, setQuery] = useState('');
  const classes = useStyles();
  const [result, setResult] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/mural').then((response) => { if (response.data) setMurals(response.data.murals.rows) }).catch(err => console.log(err));
  }, []);

  useEffect(() => {
    const filtered = murals.filter((mural: any) => { return mural.name.toLowerCase().includes(query) });
    setResult(filtered);
  }, [query, murals]);

  return (
    <form className={classes.root} >
      <Autocomplete
        freeSolo
        disableClearable
        options={result.map((mural: any) => mural.name)}
        renderInput={(params) => (
          <TextField
            {...params}
            id="outlined-basic"
            label="Search..."
            variant="outlined"
            onChange={(e) => setQuery(e.target.value.toLowerCase())}
          />
        )}
      />
    </form>


  );
}



