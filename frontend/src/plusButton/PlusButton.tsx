import React from "react";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import "./PlusButton.css";

interface IPlusButtonProps {
  isVisible: boolean;
  handleClick: () => void;
}

function PlusButton(props: IPlusButtonProps) {
  return (
    <div className="button">
      {props.isVisible ? (
        <Fab
          size="medium"
          color="primary"
          aria-label="add"
          onClick={props.handleClick}
        >
          <AddIcon />
        </Fab>
      ) : null}
    </div>
  );
}

export default PlusButton;
