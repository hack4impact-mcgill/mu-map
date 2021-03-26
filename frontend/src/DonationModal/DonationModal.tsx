import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import MULogo from "MULogo/MULogo";
import CloseIcon from "@material-ui/icons/Close";
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
    marginBottom: theme.spacing(2),
  },
  title: {
    textAlign: "center",
    marginTop: theme.spacing(5),
    display: "block",
  },

  clsoeIcon: {
    position: "absolute",
    top: "20px",
    right: "20px",
    cursor: "pointer",
  },
  logo: {
    margin: theme.spacing(1)
  }
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
      <DialogContent>
        <DialogContentText>
          <CloseIcon
            onClick={props.handleClose}
            style={{ fontSize: 40 }}
            className={classes.clsoeIcon}
          ></CloseIcon>
          <div>
            <Typography variant="h4" className={classes.title}>
              Congrats
            </Typography>
            <p>
              MU's mission is to beautify the city of Montreal by creating
              murals that are anchored in local communities. At the heart of its
              approach is the desire to see and experience art on a daily basis,
              to trigger a social transformation and to turn Montreal into an
              open-air MUseum!
            </p>
            <div className={classes.logo}>
              <MULogo width="50%" height="100%" color="#E6E5E6" ></MULogo>
            </div>

          </div>
        </DialogContentText>
      </DialogContent>
      <Button
        className={classes.button}
        size="large"
        variant="contained"
        disableElevation
        onClick={props.handleClose}
        color="default"
        target="_blank"
        href="https://mumtl.org/"
      >
        Visit MU
      </Button>
      <Button
        className={classes.button}
        size="large"
        disableElevation
        onClick={props.handleClose}
        color="primary"
        variant="contained"
        href="https://www.canadahelps.org/en/charities/mu/"
        target="_blank"
      >
        Donate
      </Button>

    </Dialog >
  );
}

export default DonationModal;
