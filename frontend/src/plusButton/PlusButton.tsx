import React from "react";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import "./PlusButton.css";

interface IPlusButtonProps {
  isVisible: true; // Property doesn't take in App when I put boolean ?
}

function plusButtonClicked() {
  // TODO: Notify App
  console.log("Button Clicked"); // This doesn't work ...
}

function PlusButton(props: IPlusButtonProps) {
  return (
    <div className="button">
      {props.isVisible ? (
        <Fab
          size="medium"
          color="primary"
          aria-label="add"
          onClick={plusButtonClicked}
        >
          <AddIcon />
        </Fab>
      ) : null}
    </div>
  );
}

export default PlusButton;
