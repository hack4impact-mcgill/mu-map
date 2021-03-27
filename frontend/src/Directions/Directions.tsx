import React from "react";
import { createStyles, makeStyles, StylesProvider, Theme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import Paper from "@material-ui/core/Paper";
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import { TransitionProps } from "@material-ui/core/transitions";

interface IDirctionsProps {
  open: boolean;
  handleClose: () => void;
  muralCoords: number[];
  muralName: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      position: "relative",
    },
    appBar: {
      position: "relative",
    },
    title: {
      marginLeft: theme.spacing(2),
      flex: 1,
    },
    startButton: {
      margin: theme.spacing(2),
      marginBottom: theme.spacing(1),
    },
    arrowContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      margin: theme.spacing(1),
      marginRight: theme.spacing(3)
    },
  })
);

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});



function Directions(props: IDirctionsProps) {
  const classes = useStyles();

  // get current location
  if ("geolocation" in navigator) {
    console.log("Location available");
  } else {
    console.log("Location not available");
  }

  var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  function success(pos: any) {
    var currentPos = pos.coords;

    console.log("Your current position is:");
    console.log(currentPos)
    console.log(`Latitude : ${currentPos.latitude}`);
    console.log(`Longitude: ${currentPos.longitude}`);
    console.log(`More or less ${currentPos.accuracy} meters.`);
  }

  function error(err: any) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  navigator.geolocation.getCurrentPosition(success, error, options);

  return (
    <div className={classes.container}>
        
      <Dialog
        fullScreen
        open={props.open}
        onClose={props.handleClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={props.handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              {props.muralName}
            </Typography>
          </Toolbar>
        </AppBar>
        <Paper style={{ maxHeight: 900, overflow: "auto" }}>
          <List>
          <ListItem>
                <div className={classes.arrowContainer}>
                    <ArrowUpwardIcon/>
                    <p>500 m</p>
                </div>
              <ListItemText primary="Test text"/>
            </ListItem>
            <Divider />
            <ListItem>
                <div className={classes.arrowContainer}>
                    <ArrowUpwardIcon/>
                    <p>500 m</p>
                </div>
              <ListItemText primary="Test text"/>
            </ListItem>
            <Divider />
            <ListItem>
                <div className={classes.arrowContainer}>
                    <ArrowUpwardIcon/>
                    <p>500 m</p>
                </div>
              <ListItemText primary="Test text"/>
            </ListItem>
            <Divider />
            <ListItem>
                <div className={classes.arrowContainer}>
                    <ArrowUpwardIcon/>
                    <p>500 m</p>
                </div>
              <ListItemText primary="Test text"/>
            </ListItem>
            <Divider />
            <ListItem>
                <div className={classes.arrowContainer}>
                    <ArrowUpwardIcon/>
                    <p>500 m</p>
                </div>
              <ListItemText primary="Test text"/>
            </ListItem>
            <Divider />
            <ListItem>
                <div className={classes.arrowContainer}>
                    <ArrowUpwardIcon/>
                    <p>500 m</p>
                </div>
              <ListItemText primary="Test text"/>
            </ListItem>
            <Divider />
            <ListItem>
                <div className={classes.arrowContainer}>
                    <ArrowUpwardIcon/>
                    <p>500 m</p>
                </div>
              <ListItemText primary="Test text"/>
            </ListItem>
            <Divider />
            <ListItem>
                <div className={classes.arrowContainer}>
                    <ArrowUpwardIcon/>
                    <p>500 m</p>
                </div>
              <ListItemText primary="Test text"/>
            </ListItem>
            <Divider />
            <ListItem>
                <div className={classes.arrowContainer}>
                    <ArrowUpwardIcon/>
                    <p>500 m</p>
                </div>
              <ListItemText primary="Test text"/>
            </ListItem>
            <Divider /><ListItem>
                <div className={classes.arrowContainer}>
                    <ArrowUpwardIcon/>
                    <p>500 m</p>
                </div>
              <ListItemText primary="Test text"/>
            </ListItem>
            <Divider />
          </List>
        </Paper>
        <Button
          className={classes.startButton}
          variant="contained"
          color="primary"
          disableElevation
        >
          Start
        </Button>
      </Dialog>
    </div>
  );
}

export default Directions;
