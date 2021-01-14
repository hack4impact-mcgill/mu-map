import React from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import AddressSearch from "../AddressSearch/addressSearch";

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

  return (
    <form noValidate autoComplete="off">
      <div className={styles.flexContainer}>
        <TextField className={styles.element} required id="name" label="Name" />
        <TextField
          className={styles.element}
          required
          id="year"
          label="year"
          type="number"
          defaultValue={currYear}
        />
        <AddressSearch />
        <TextField
          className={styles.element}
          required
          id="artist"
          label="Artist"
          placeholder="Unknown Artist"
        />
        <TextField
          className={styles.element}
          multiline
          rows={4}
          id="description"
          label="Description"
          placeholder="No Description"
        />
      </div>
    </form>
  );
}

export default MuralForm;