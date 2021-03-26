import {
  createStyles,
  InputAdornment,
  InputBase,
  makeStyles,
  Snackbar,
  TextField,
  Theme
} from "@material-ui/core";
import axios from "axios";
import React, { SyntheticEvent, useEffect, useState } from "react";
import EditIcon from '@material-ui/icons/Edit';
import Autocomplete from "@material-ui/lab/Autocomplete";
import ActionButtons from "../ActionButtons/ActionButtons";
import SearchCard from "SideBarSearch/searchCard";
import Alert from "@material-ui/lab/Alert";
import { CREATE_MURAL_API, GET_ALL_COLLECTION } from "constants/constants";

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

interface ICollectionFormProps {
  collection?: any;
  muralsData?: any;
  handleCancel: () => void;
};

function CollectionForm({ collection, muralsData, handleCancel }: ICollectionFormProps) {
  const [murals, setMurals] = useState<any>([]);
  const [muralsInCollection, setMuralsInCollection] = useState<any>([]);
  const [muralResults, setMuralResults] = useState<any>([]);
  const [muralQuery, setMuralQuery] = useState<string>("");

  const [description, setDescription] = useState<string>("");
  const [editingDesc, setEditingDesc] = useState<boolean>(false);
  const [hoveringDesc, setHoveringDesc] = useState<boolean>(false);

  const [title, setTitle] = useState<string>("");
  const [editingTitle, setEditingTitle] = useState<boolean>(false);
  const [hoveringTitle, setHoveringTitle] = useState<boolean>(false);

  const [popup, setPopup] = useState<boolean>(false);

  const styles = useStyles();

  /**
   * Populate the form when an existing collection is passed as a prop
   */
  useEffect(() => {
    if (!collection || !Object.keys(collection)) return;
    setTitle(collection.name);
    setDescription(collection.description);
  }, [collection])

  useEffect(() => {
    if (!collection || murals.length === 0) return;
    let temp: any[] = [];
    collection.murals.forEach((tourMural: any) => {
      let found = murals.find((mural: any) => mural.id === tourMural.id);
      temp = ([...temp, found]);
    })
    setMuralsInCollection(temp);
  }, [collection, murals])  

  const handleAddMural = (addedMural: any) => {
    if (!addedMural) return
    if (muralsInCollection.some((currMural: any) => currMural.id === addedMural.id))
      return

    setMuralsInCollection((oldMurals: any) => [...oldMurals, addedMural]);
  };

  const handleSave = () => {
    if (!title.length || !description.length) return;

    axios.post(GET_ALL_COLLECTION, {
      collection: {
        name: title,
        description: description
      },
      murals: muralsInCollection.map((mural: any) => mural.id)
    })
      .then(() => {
        setPopup(true);
        setTimeout(() => setPopup(false), 5000);
      })
      .catch((err: any) => console.log(err));
  };

  useEffect(() => {
    axios.get(CREATE_MURAL_API)
      .then((response) => {
        if (response.data) setMurals(response.data.rows)
      })
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    if (muralQuery) {
      const filtered = murals.filter((mural: any) => {
      return mural.name.toLowerCase().includes(muralQuery)
      });
      setMuralResults(filtered);
    } else {
      setMuralResults(murals);
    }
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
            placeholder="Name the collection"
            defaultValue={collection?.name}
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
            defaultValue={collection?.description}
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
              freeSolo={false}
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
      <Snackbar open={popup} autoHideDuration={6000}>
        <Alert severity="success">
          Collection published successfully!
        </Alert>
      </Snackbar>
    </div>
  )
}

export default CollectionForm;
