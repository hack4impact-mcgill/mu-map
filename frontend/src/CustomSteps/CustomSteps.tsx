import React from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";

interface IStepsProps {
  steps: any;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    arrowContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      margin: theme.spacing(1),
      marginRight: theme.spacing(3),
    },
  })
);

// TODO change icon depending on step.maneuver.modifier
function CustomSteps({ steps }: IStepsProps) {
  const classes = useStyles();

  return steps.map((step: any) => (
    <div>
      <ListItem>
        <div className={classes.arrowContainer}>
          <ArrowUpwardIcon />
          <p>{Math.round(step.distance)}m</p>
        </div>
        <ListItemText primary={step.maneuver.instruction} />
      </ListItem>
      <Divider />
    </div>
  ));
}

export default React.memo(CustomSteps);
