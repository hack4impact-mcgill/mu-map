import React, { useState, useImperativeHandle } from "react";
import FormGroup from '@material-ui/core/FormGroup';
import Modal from "@material-ui/core/Modal";
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';



const useStyles = makeStyles((theme: Theme) => 
    createStyles({
        text: {
            height: '100%',
            width: '100%'
        }
    })
)

const SigninForm = React.forwardRef((props: any, ref) => {
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();

  const handleOpen = () => {
    setOpen(true);
    console.log("12")
  };

  const handleClose = () => {
    setOpen(false);
  };


  return (
    <>
      <span onClick={handleOpen} className={classes.text}>{props.children}</span>
      <Modal open={open} onClose={handleClose}>
        <p id="simple-modal-description">
          Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
        </p>
      </Modal>
    </>
  );
});

export default SigninForm;
