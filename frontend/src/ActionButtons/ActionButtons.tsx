import {
  Button,
  createStyles,
  makeStyles,
  Theme,
} from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    bottomButton: {
      margin: theme.spacing(0, 0, 0, 3)
    },
    bottomButtonContainer: {
      display: "flex",
      justifyContent: "flex-end",
      padding: theme.spacing(3),
      width: "40vw",
      maxWidth: "500px",
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

  const handleSave = () => {
    saveCallback()
  };

  const handleCancel = () => {
    cancelCallback()
  };

  return (
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
        className={styles.bottomButton}
        onClick={handleSave}>
        Save
      </Button>
    </div>
  )
}

export default ActionButtons