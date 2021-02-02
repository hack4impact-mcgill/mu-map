import {
    Button,
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

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        flexContainer: {
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
            width: "40vw",
            padding: theme.spacing(3)
        },
        field: {
            width: "100%",
            margin: theme.spacing(2, 0, 2, 0)
        },
        title: {
            fontSize: "180%",
        },
        bottomButton: {
            fontWeight: 500,
        },
        bottomButtonContainer: {
            display: "flex",
            bottom: 0,
            justifyContent: "space-between",
            padding: theme.spacing(3)
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
        console.log(title)
        console.log(description)
        console.log(muralsInCollection)
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
            <div className={styles.flexContainer}>
                <form
                    noValidate
                    autoComplete="off"
                    onSubmit={(e: SyntheticEvent) => { e.preventDefault(); handleSave() }}>
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
                </form>
            </div>
            <div className={styles.bottomButtonContainer}>
                <Button
                    color="secondary"
                    size="small"
                    variant="outlined"
                    className={styles.bottomButton}
                    onClick={handleCancel}
                >
                    Cancel
                </Button>
                <Button
                    color="primary"
                    size="small"
                    variant="contained"
                    disableElevation
                    onClick={handleSave}>
                    Save
                </Button>
            </div>
        </div>
    )
}

export default CollectionForm