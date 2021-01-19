import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import AddressSearch from "../AddressSearch/addressSearch";
import MultiAdd from "../multiAdd/MultiAdd";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    flexContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    element: {
      margin: theme.spacing(1),
      width: "195px",
    },
  })
);

interface IMuralFormProps {}

function MuralForm(props: IMuralFormProps) {
  const styles = useStyles();
  const currYear = new Date().getFullYear();
  const [assistants, setAssistants] = useState<string[]>([]);
  const [socialMedia, setSocialMedia] = useState<string[]>([]);
  //todo: delete these logs once we actually use the state
  console.log(assistants)
  console.log(socialMedia)

  function updateAssistants(newAssistants: string[]) {
    setAssistants(newAssistants);
  }

  function updateSocialMedia(newSocialMedia: string[]) {
    setSocialMedia(newSocialMedia);
  }

  return (
    <form noValidate autoComplete="off">
      <div className={styles.flexContainer}>
        <TextField
          className={styles.element}
          required
          id="name"
          label="Name"
          variant="filled"
          size="small"
        />
        <TextField
          className={styles.element}
          required
          id="year"
          label="Year"
          type="number"
          defaultValue={currYear}
          variant="filled"
          size="small"
        />
        <AddressSearch />
        <TextField
          className={styles.element}
          required
          id="artist"
          label="Artist"
          placeholder="Unknown Artist"
          variant="filled"
          size="small"
        />
        <TextField
          className={styles.element}
          multiline
          rows={4}
          id="description"
          label="Description"
          placeholder="No Description"
          variant="filled"
          size="small"
        />
        <MultiAdd
          title={"Assistants"}
          placeholder={"Add Assistants..."}
          callback={updateAssistants}
        />
        <MultiAdd
          title={"Social Media"}
          placeholder={"Add Social Media..."}
          callback={updateSocialMedia}
        />
      </div>
    </form>
  );
}

export default MuralForm;
