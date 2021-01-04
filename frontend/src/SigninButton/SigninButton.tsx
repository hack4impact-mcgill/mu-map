import React from "react";
import Button from "@material-ui/core/Button";
import "./SigninButton.css";

interface ISigninButtonProps {
  isSignedIn: boolean;
  onClick: () => void;
}

function SigninButton(props: ISigninButtonProps) {
  return (
    <div className="SigninButton">
      {props.isSignedIn ? (
        <Button variant="contained" onClick={props.onClick} color="secondary">
          SIGN OUT
        </Button>
      ) : (
        <Button variant="contained" onClick={props.onClick} color="primary">
          SIGN IN
        </Button>
      )}
    </div>
  );
}
export default SigninButton;
