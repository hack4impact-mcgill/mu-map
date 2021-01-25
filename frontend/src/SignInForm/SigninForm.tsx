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
  signInClick: (credentials: { email: string; password: string }) => void;
  cancelClick: () => void;
  open: boolean;
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

function SigninForm({ signInClick, cancelClick, open }: ISigninFormProps) {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [emailIsValid, setEmailIsValid] = useState<boolean>(false);
  const [passwordIsValid, setPasswordIsValid] = useState<boolean>(false);

  const classes = useStyles();
  const emailPattern = new RegExp(
    /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
  );

  const handleClose = () => {
    cancelClick();
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = () => {
    signInClick({ email, password });
  };

  const handleEmailChange = (newEmail: string) => {
    const testPassed = emailPattern.test(newEmail);
    if (!testPassed && emailIsValid) {
      setEmailIsValid(false);
    }
    if (testPassed && !emailIsValid) {
      setEmailIsValid(true);
    }
    setEmail(newEmail);
  };

  const handlePasswordChange = (newPassword: string) => {
    const newPasswordLength = newPassword.length;
    if (newPasswordLength < 8 && passwordIsValid) {
      setPasswordIsValid(false);
    }
    if (newPasswordLength >= 8 && !passwordIsValid) {
      setPasswordIsValid(true);
    }
    setPassword(newPassword);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>
          <p className={classes.title}>Welcome</p>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>MU MTL's Map Editor</DialogContentText>
          <div className={classes.flexContainer}>
            <TextField
              autoFocus
              error={emailIsValid || email.length === 0 ? false : true}
              label="Email"
              type="email"
              variant="outlined"
              className={classes.textField}
              onChange={(e) => handleEmailChange(e.target.value)}
              helperText={
                emailIsValid || email.length === 0
                  ? ""
                  : "Invalid email address"
              }
            />
            <TextField
              error={passwordIsValid || password.length === 0 ? false : true}
              id="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              variant="outlined"
              onChange={(e) => handlePasswordChange(e.target.value)}
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
          <Button
            variant="contained"
            onClick={handleSubmit}
            color="primary"
            disabled={passwordIsValid && emailIsValid ? false : true}
          >
            Sign in
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default SigninForm;
