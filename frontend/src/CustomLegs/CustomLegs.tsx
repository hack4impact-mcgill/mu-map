import "mapbox-gl/dist/mapbox-gl.css";
import React, { useEffect, useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import CustomSteps from "../CustomSteps/CustomSteps";

interface ILegsProps {
  waypoints: any;
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

// TODO change icon to image of mural
function CustomLegs({ waypoints }: ILegsProps) {
  const classes = useStyles();

  return waypoints.map((wp: any) => (
    <div>
      <CustomSteps steps={wp[1].steps} />
      <ListItem>
        <div className={classes.arrowContainer}>
          <ArrowUpwardIcon />
        </div>
        <ListItemText primary={wp[0]} />
      </ListItem>
      <Divider />
    </div>
  ));
}

export default React.memo(CustomLegs);
