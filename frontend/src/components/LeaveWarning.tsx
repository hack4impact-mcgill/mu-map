import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@material-ui/core";

interface ILeaveWarningProps {
  open: boolean;
  handleStay: () => void;
  handleLeave: () => void;
};

function LeaveWarning({ open, handleStay, handleLeave }: ILeaveWarningProps) {

  return (
    <Dialog
      open={open}
      onClose={handleStay}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Leaving?</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Any unsaved changes will be lost.
      </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleLeave} color="secondary" >
          Leave
        </Button>
        <Button
          onClick={handleStay}
          color="primary"
          variant="contained"
          disableElevation
          autoFocus
        >
          Stay
        </Button>
      </DialogActions>
    </Dialog>)
}

export default LeaveWarning;