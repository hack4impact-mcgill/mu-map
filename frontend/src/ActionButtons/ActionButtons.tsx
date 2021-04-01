import {
  Button,
  createStyles,
  makeStyles,
  Theme,
} from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import Context from "context";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    bottomButton: {
      margin: theme.spacing(0, 0, 0, 3)
    },
    bottomButtonContainer: {
      display: "flex",
      justifyContent: "flex-end",
      padding: theme.spacing(3),
      width: "100%",
      maxWidth: "100vw",
      bottom: 0
    },
  })
);

interface IActionButtonsProps {
  saveCallback: () => void;
  cancelCallback: () => void;
}

function ActionButtons({ saveCallback, cancelCallback }: IActionButtonsProps) {

  const styles = useStyles();

  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  /**
   * Show cancel and save buttons for admin users
   */
  const userContext = useContext(Context)
  useEffect(() => setIsAdmin(!!(userContext as any).user), [userContext]);

  const handleSave = () => {
    saveCallback()
  };

  const handleCancel = () => {
    cancelCallback()
  };

  return (
    <div className={styles.bottomButtonContainer}>
      {
        isAdmin &&
        <Button
        color="secondary"
        size="small"
        variant="outlined"
        className={styles.bottomButton}
        onClick={handleCancel}
      >
        Cancel
        </Button>
      }
      {
        isAdmin &&
        <Button
          color="primary"
          size="small"
          variant="contained"
          disableElevation
          className={styles.bottomButton}
          onClick={handleSave}>
          Save
        </Button>
      }
    </div>
  )
}

export default ActionButtons