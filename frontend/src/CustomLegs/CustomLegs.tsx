import "mapbox-gl/dist/mapbox-gl.css";
import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import CustomSteps from "../CustomSteps/CustomSteps";
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

interface ILegsProps {
  waypoints: any;
  waypointPics: string[]
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
    imageCard: {
      borderRadius: '10px',
      width: '120px',
      height: '120px',
      margin: theme.spacing(1),
      marginRight: theme.spacing(3),
    }
  })
);

function CustomLegs({ waypoints, waypointPics }: ILegsProps) {
  const classes = useStyles();

  return (
    <div>
    <ListItem>
        <div className={classes.arrowContainer}>
            <FiberManualRecordIcon color="primary"/>
          </div>
          <ListItemText primary="You are here"/>
        </ListItem>
        <Divider/>
    {waypoints.map((wp: any, index: number) => (
      <div>
        <CustomSteps steps={wp[1].steps} />
        <ListItem>
            <img className={classes.imageCard} src={waypointPics[index]} alt=""/>
          <ListItemText primary={wp[0]} />
        </ListItem>
        <Divider />
      </div>
    ))}
    </div>
  );
}

export default React.memo(CustomLegs);
