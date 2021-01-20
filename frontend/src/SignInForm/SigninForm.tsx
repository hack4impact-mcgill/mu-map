import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";

interface ISigninFormProps {
  signInClick: () => void;
  children: JSX.Element;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      fontSize: "200%",
      margin: "0",
    },
    textField: {
      width: "70%",
      margin: theme.spacing(2),
    },
    signInText: {
      width: "100%",
    },
    flexContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
  })
);

function SigninForm({ signInClick, children }: ISigninFormProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const classes = useStyles();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <span onClick={handleOpen} className={classes.signInText}>
        {children}
      </span>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>
          <p className={classes.title}> Welcome</p>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>MUMTL's map editor</DialogContentText>
          <div className={classes.flexContainer}>
            <TextField
              autoFocus
              label="Email"
              variant="outlined"
              className={classes.textField}
            />
            <TextField
              id="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleClickShowPassword}>
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              className={classes.textField}
            />
          </div>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button variant="contained" onClick={signInClick} color="primary">
            Sign in
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default SigninForm;
