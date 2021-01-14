import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    itemContainer: {
      marginTop: theme.spacing(2),
      display: "flex",
      alignItems: "center",
      height: theme.spacing(4),
      width: "195px",
    },
    deleteIcon: {
      marginLeft: "auto",
      cursor: "pointer",
    },
  })
);

interface IMultiAddItemProps {
  name: string;
  onDelete: (itemToDelete: string) => void;
}

function MultiAddItem(props: IMultiAddItemProps) {
  const styles = useStyles();

  return (
    <div className={styles.itemContainer}>
      <TextField
        defaultValue={props.name}
        size="small"
        InputProps={{
          readOnly: true,
        }}
      />
      <DeleteIcon
        className={styles.deleteIcon}
        onClick={() => props.onDelete(props.name)}
      />
    </div>
  );
}

export default MultiAddItem;
