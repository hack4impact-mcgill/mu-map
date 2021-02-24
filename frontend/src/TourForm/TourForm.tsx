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
  import DragDrop from "TourForm/DragDrop"
  import Alert from "@material-ui/lab/Alert";
  import { CREATE_MURAL_API, GET_ALL_TOUR } from "constants/constants";

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
  
  interface ITourFormProps {
    handleCancel: () => void;
  };
  
  function TourForm({ handleCancel }: ITourFormProps) {
    const [murals, setMurals] = useState<any>([]);
    const [muralsInTour, setMuralsInTour] = useState<any>([]);
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
  
    const handleAddMural = (addedMural: any) => {
      if (!addedMural) return
      if (muralsInTour.some((currMural: any) => currMural.id === addedMural.id))
        return
  
      setMuralsInTour((oldMurals: any) => [...oldMurals, addedMural]);
    };
  
    const handleSave = () => {
      if (!title.length || !description.length) return;
  
      axios.post(GET_ALL_TOUR, {
        tour: {
          name: title,
          description: description
        },
        murals: muralsInTour.map((mural: any) => mural.id)
      })
        .then(() => {
          setPopup(true);
          setTimeout(() => setPopup(false), 5000);
        })
        .catch((err: any) => console.log(err));
    };

    const reorderMurals = (startIndex: number, endIndex: number) => {
        const result = Array.from(muralsInTour);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
        setMuralsInTour(result)
      };
  
    useEffect(() => {
      axios.get(CREATE_MURAL_API)
        .then((response) => {
          if (response.data) setMurals(response.data.rows)
        })
        .catch(err => console.log(err));
    }, []);
  
    useEffect(() => {
      const filtered = murals.filter((mural: any) => {
        return mural.name.toLowerCase().includes(muralQuery)
      });
      setMuralResults(filtered);
    }, [muralQuery, murals]);

    useEffect(() => {
        console.log(muralsInTour)
      }, [muralsInTour]);
  
    return (
      <div>
        <form
          noValidate
          autoComplete="off"
          onSubmit={(e: SyntheticEvent) => { e.preventDefault(); handleSave() }}>
          <div className={styles.flexContainer}>
            <InputBase
              className={`${styles.title} ${styles.field}`}
              placeholder="Name the tour"
              onChange={(e: any) => setTitle(e.target.value)}
              inputProps={{ 'aria-label': 'New tour title' }}
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
        <DragDrop key={muralsInTour} passedItems={muralsInTour} itemsReorderedCallback={reorderMurals}/>
        <ActionButtons saveCallback={handleSave} cancelCallback={handleCancel} />
        <Snackbar open={popup} autoHideDuration={6000}>
          <Alert severity="success">
            Tour published successfully!
          </Alert>
        </Snackbar>
      </div>
    )
  }
  
  export default TourForm;
  