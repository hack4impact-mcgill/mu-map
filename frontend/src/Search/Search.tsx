import React from 'react';
import './Search.css';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { useState, useEffect } from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';

interface ISearchBarProps {
  searchCallBack: (data: any) => void;
}
const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '70vw',
      maxWidth: '350px',
      backgroundColor: '#fff',
      zIndex: 1,
      position: 'absolute',
      left: '35vw',
    },
  },
}));


export default function SearchBar({ searchCallBack }: ISearchBarProps) {
  const [murals, setMurals] = useState([]);
  const [query, setQuery] = useState('');
  const classes = useStyles();
  const [result, setResult] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/mural').then((response) => { if (response.data) setMurals(response.data.rows) }).catch(err => console.log(err));
  }, []);

  useEffect(() => {
    const filtered = murals.filter((mural: any) => { return mural.name.toLowerCase().includes(query) });
    setResult(filtered);

  }, [query, murals]);

  const toggleSearch = (event: any) => {
    setQuery(event.target.value.toLowerCase())
    searchCallBack(result);
  }

  return (
    <form className={classes.root}>
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
            onChange={(e) => toggleSearch(e)}
          />
        )}
      />
    </form>


  );
}



