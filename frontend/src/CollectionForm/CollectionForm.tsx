import {
  createStyles,
  InputAdornment,
  InputBase,
  makeStyles,
  TextField,
  Theme
} from "@material-ui/core";
import axios from "axios";
import React, { SyntheticEvent, useEffect, useState } from "react";
import EditIcon from '@material-ui/icons/Edit';
import Autocomplete from "@material-ui/lab/Autocomplete";
import ActionButtons from "../ActionButtons/ActionButtons";
import SearchCard from "SideBarSearch/searchCard";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    flexContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "start",
      width: "40vw",
      maxWidth: "500px",
      padding: theme.spacing(3)
    },
    field: {
      width: "100%",
      margin: theme.spacing(0, 0, 2, 0)
    },
    title: {
      fontSize: "180%",
    },
  })
);

function CollectionForm() {
  const [murals, setMurals] = useState<any>([]);
  const [muralsInCollection, setMuralsInCollection] = useState<any>([]);
  const [muralResults, setMuralResults] = useState<any>([]);
  const [muralQuery, setMuralQuery] = useState<string>("");

  const [description, setDescription] = useState([]);
  const [editingDesc, setEditingDesc] = useState<boolean>(false);
  const [hoveringDesc, setHoveringDesc] = useState<boolean>(false);

  const [title, setTitle] = useState([]);
  const [editingTitle, setEditingTitle] = useState<boolean>(false);
  const [hoveringTitle, setHoveringTitle] = useState<boolean>(false);

  const styles = useStyles();

  const handleAddMural = (addedMural: any) => {
    if (!addedMural) return
    if (muralsInCollection.some((currMural: any) => currMural.id === addedMural.id))
      return

    setMuralsInCollection((oldMurals: any) => [...oldMurals, addedMural]);
  };

  const handleSave = () => {
    // TODO: remember to replace this with localhost before merging
    axios.post('http://mumapbackend.us-east-1.elasticbeanstalk.com/collection', {
      collection: {
        name: title,
        description: description
      },
      murals: muralsInCollection.map((mural: any) => mural.id)
    })
      .then((response: any) => { console.log("Collection added!") })
      .catch((err: any) => console.log(err));
  };

  const handleCancel = () => {
    console.log("cancel")
  };

  useEffect(() => {
    // TODO: remember to replace this with localhost before merging
    axios.get('http://mumapbackend.us-east-1.elasticbeanstalk.com/mural')
      .then((response) => {
        if (response.data) setMurals(response.data.murals.rows)
      })
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    const filtered = murals.filter((mural: any) => {
      return mural.name.toLowerCase().includes(muralQuery)
    });
    setMuralResults(filtered);
  }, [muralQuery, murals]);

  return (
    <div>
      <form
        noValidate
        autoComplete="off"
        onSubmit={(e: SyntheticEvent) => { e.preventDefault(); handleSave() }}>
        <div className={styles.flexContainer}>
          <InputBase
            className={`${styles.title} ${styles.field}`}
            defaultValue="Name the collection"
            onChange={(e: any) => setTitle(e.target.value)}
            inputProps={{ 'aria-label': 'New collection title' }}
            onClick={() => setEditingTitle(true)}
            onBlur={() => setEditingTitle(false)}
            onMouseEnter={() => setHoveringTitle(true)}
            onMouseLeave={() => setHoveringTitle(false)}
            endAdornment={!editingTitle && (
              <InputAdornment position="start">
                <EditIcon color={hoveringTitle ? "primary" : "action"} />
              </InputAdornment>
            )}
          />
          <InputBase
            className={styles.field}
            multiline
            rows={4}
            placeholder="Add a description"
            onChange={(e: any) => setDescription(e.target.value)}
            onClick={() => setEditingDesc(true)}
            onBlur={() => setEditingDesc(false)}
            onMouseEnter={() => setHoveringDesc(true)}
            onMouseLeave={() => setHoveringDesc(false)}
            endAdornment={!editingDesc && (
              <InputAdornment position="start">
                <EditIcon color={hoveringDesc ? "primary" : "action"} />
              </InputAdornment>
            )}
          />
          <div className={styles.field}>
            <Autocomplete
              freeSolo
              options={muralResults.map((mural: any) => mural)}
              getOptionLabel={(mural: any) => mural.name}
              onChange={(e: any, value: any) => handleAddMural(value)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Add a mural"
                  variant="outlined"
                  size="small"
                  onChange={
                    (e: any) => setMuralQuery(e.target.value.toLowerCase())
                  }
                />
              )}
            />
          </div>
        </div>
      </form>
      <SearchCard searchCards={muralsInCollection} />
      <ActionButtons saveCallback={handleSave} cancelCallback={handleCancel} />
    </div>
  )
}

export default CollectionForm;