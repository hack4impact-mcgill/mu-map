import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Button from "@material-ui/core/Button";
import { makeStyles, useTheme, Theme } from "@material-ui/core/styles";

interface IDonationModalProps {
  open: boolean;
  handleClose: () => void;
}

const useStyles = makeStyles((theme: Theme) => ({
  button: {
    width: "90%",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function DonationModal(props: IDonationModalProps) {
  const classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Dialog
      fullScreen={fullScreen}
      open={props.open}
      onClose={props.handleClose}
    >
      <DialogTitle>{<b>Congrats</b>}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          MU's mission is to beautify the city of Montreal by creating murals
          that are anchored in local communities. At the hear of its approach is
          the desire to see and experience art on a daily basis, to trigger a
          social transformation and to turn Montreal into an open-air MUseum!
        </DialogContentText>
      </DialogContent>
      <Button
        className={classes.button}
        size="large"
        variant="contained"
        onClick={props.handleClose}
        color="default"
      >
        Visit MU
      </Button>
      <Button
        className={classes.button}
        size="large"
        onClick={props.handleClose}
        color="primary"
        variant="contained"
      >
        Donate
      </Button>
    </Dialog>
  );
}

export default DonationModal;
