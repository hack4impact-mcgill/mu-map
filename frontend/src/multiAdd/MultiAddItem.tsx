import React, { useContext, useEffect, useState } from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import TextField from "@material-ui/core/TextField";
import Context from "context";

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

  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  
  /**
   * Enable image deletion for admin users
   */
  const userContext = useContext(Context)
  useEffect(() => setIsAdmin(!!(userContext as any).user), [userContext]);

  return (
    <div className={styles.itemContainer}>
      <TextField
        defaultValue={props.name}
        size="small"
        disabled={!isAdmin}
        InputProps={{
          readOnly: true,
        }}
      />
      {
        isAdmin &&
        <DeleteIcon
        className={styles.deleteIcon}
        onClick={() => props.onDelete(props.name)}
      />
      }
    </div>
  );
}

export default MultiAddItem;
