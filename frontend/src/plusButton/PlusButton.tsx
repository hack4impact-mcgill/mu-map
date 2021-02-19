import React, { useState } from "react";
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import FormatPaintIcon from '@material-ui/icons/FormatPaint';
import CollectionsBookmarkIcon from '@material-ui/icons/CollectionsBookmark';
import TimelineIcon from '@material-ui/icons/Timeline';
import "./PlusButton.css";
import { FORM } from "constants/constants";

interface IPlusButtonProps {
  isVisible: boolean;
  handleClick: (formName: FORM) => void;
}

const actions = [
  { icon: <FormatPaintIcon />, name: FORM.MURAL },
  { icon: <CollectionsBookmarkIcon />, name: FORM.COLLECTION },
  { icon: <TimelineIcon />, name: FORM.TOUR },
];

function PlusButton(props: IPlusButtonProps) {

  const [open, setOpen] = useState(false);

  return (
    <div className="button">
      {props.isVisible && (
        <SpeedDial
          icon={<SpeedDialIcon />}
          ariaLabel="form selector"
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          open={open}
        >
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              tooltipOpen
              tooltipPlacement="right"
              onClick={() => { setOpen(false); props.handleClick(action.name) }}
            />
          ))}
        </SpeedDial>
      )}
    </div>
  );
}

export default PlusButton;
