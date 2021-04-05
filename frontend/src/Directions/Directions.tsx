import React, { useEffect, useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import List from "@material-ui/core/List";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import Slide from "@material-ui/core/Slide";
import Paper from "@material-ui/core/Paper";
import { TransitionProps } from "@material-ui/core/transitions";
import CustomLegs from "../CustomLegs/CustomLegs";
import { MAPBOX_DIRECTIONS_API } from "../constants/constants";
import axios from "axios";

interface IDirectionsProps {
  open: boolean;
  handleClose: () => void;
  coordinates: number[][];
  wpNames: string[]; // waypoint names excluding starting point
  wpPics: string[];
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      position: "relative",
    },
    appBar: {
      position: "relative",
      height: "13%",
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
      marginRight: theme.spacing(3),
    },
    nameContainer: {
      margin: theme.spacing(2),
      display: "flex",
      flexDirection: "column",
    },
  })
);

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Directions(props: IDirectionsProps) {
  const classes = useStyles();
  const [timeRequired, setTimeRequired] = useState<number[]>([]);
  const [totalDistance, setTotalDistance] = useState<number>(0);
  const [waypoints, setWaypoints] = useState<any[]>([]);

  useEffect(() => {
    if (!props.open) return;
    let coordString = "";
    for (let i = 0; i < props.coordinates.length; i++) {
      coordString += props.coordinates[i][0];
      coordString += ",";
      coordString += props.coordinates[i][1];
      if (i !== props.coordinates.length - 1) coordString += ";";
    }
    var url =
      MAPBOX_DIRECTIONS_API +
      coordString +
      "?steps=true&geometries=geojson&access_token=" +
      process.env.REACT_APP_MAPBOX_TOKEN;
    axios
      .get(url)
      .then((res) => {
        let timeRequired = new Date(res.data.routes[0].duration * 1000)
          .toISOString()
          .substr(11, 8);
        // Converts "hh:mm:ss" to an array of int type, [hh, mm, ss]
        setTimeRequired(timeRequired.split(":").map((time) => parseInt(time)));
        setTotalDistance(Math.round(res.data.routes[0].distance / 1000)); // m -> km

        var zip = props.wpNames.map((n, i) => [n, res.data.routes[0].legs[i]]);
        setWaypoints(zip);
      })
      .catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.coordinates, props.wpNames, props.open]);

  function timingText(timeRequired: number[]) {
    if (timeRequired[2] > 30) {
      timeRequired[1] += 1; // rounding
    }
    if (timeRequired[0] !== 0) {
      return timeRequired[0] + " hrs " + timeRequired[1] + " mins, ";
    } else if (timeRequired[1] !== 0) {
      return timeRequired[1] + " mins, ";
    } else {
      return "Within 1 minute ";
    }
  }

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
              aria-label="back"
            >
              <ArrowBackIosIcon />
            </IconButton>
            <div className={classes.nameContainer}>
              <Typography variant="h3" className={classes.title}>
                {props.wpNames[0]}
              </Typography>
              <Typography variant="subtitle1" className={classes.title}>
                {timingText(timeRequired) + totalDistance + " km"}
              </Typography>
            </div>
          </Toolbar>
        </AppBar>
        <Paper style={{ maxHeight: 900, overflow: "auto" }}>
          <List>
            <CustomLegs waypoints={waypoints} waypointPics={props.wpPics} />
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
