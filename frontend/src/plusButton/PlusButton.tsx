import React from "react";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import "./PlusButton.css";

interface IPlusButtonProps {
  isVisible: boolean;
}

function plusButtonClicked() {
  // TODO: Notify App
  console.log("Button Clicked"); // Not sure if this works
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
