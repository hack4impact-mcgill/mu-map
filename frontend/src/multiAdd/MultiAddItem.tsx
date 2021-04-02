import React, { useContext, useEffect, useState } from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Context from "context";
import Chip from '@material-ui/core/Chip';

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
   * Enable multi-add item editing and deletion for admin users
   */
  const userContext = useContext(Context)
  useEffect(() => setIsAdmin(!!(userContext as any).user), [userContext]);

  return (
    <div className={styles.itemContainer}>
      {!isAdmin &&
        <Chip
          label={props.name}
        />
      }
      {
        isAdmin &&
        <Chip
          label={props.name}
          disabled={!isAdmin}
          onDelete={() => props.onDelete(props.name)}
        />
      }
    </div>
  );
}

export default MultiAddItem;
