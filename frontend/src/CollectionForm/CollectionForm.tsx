import {
    createStyles,
    InputAdornment,
    InputBase,
    makeStyles,
    Theme
} from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import EditIcon from '@material-ui/icons/Edit';
import SearchBar from "Search/Search";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        flexContainer: {
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
            width: "40vw",
            padding: theme.spacing(2)
        },
        field: {
            width: "100%",
            margin: theme.spacing(1, 1, 3, 1)
        },
        title: {
            fontSize: "180%",
        },
        bottomButton: {
            fontWeight: 500,
        },
        bottomButtonContainer: {
            display: "flex",
            justifyContent: "space-between",
        },
    })
);

function CollectionForm() {
    const [murals, setMurals] = useState([]);

    const [description, setDescription] = useState([]);
    const [editingDesc, setEditingDesc] = useState<boolean>(false);
    const [hoveringDesc, setHoveringDesc] = useState<boolean>(false);

    const [title, setTitle] = useState([]);
    const [editingTitle, setEditingTitle] = useState<boolean>(false);
    const [hoveringTitle, setHoveringTitle] = useState<boolean>(false);

    const styles = useStyles();

    useEffect(() => {
        // TODO: remember to replace this with localhost before merging
        axios.get('http://mumapbackend.us-east-1.elasticbeanstalk.com/mural')
            .then((response) => {
                if (response.data) setMurals(response.data.murals.rows)
            })
            .catch(err => console.log(err));
    }, []);

    return (
        <form noValidate autoComplete="off">
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
                    <SearchBar
                        searchCallBack={(e: any) => console.log(e)}
                    />
                </div>
            </div>
        </form>
    )
}

export default CollectionForm