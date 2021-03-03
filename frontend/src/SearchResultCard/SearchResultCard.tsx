import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import { createStyles, InputBase, makeStyles, Theme } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  CREATE_MURAL_API,
  GET_ALL_COLLECTION,
  GET_ALL_TOUR,
} from "constants/constants";
import { FORM } from "constants/constants";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      margin: theme.spacing(0, 2, 2, 3),
      display: "flex",
      justifyContent: "flex-start",
    },
    icon: {
      maxWidth: "25%",
      height: "100%",
    },
    properties: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      padding: theme.spacing(0, 0, 1, 2),
      width: "50%",
    },
    type: {
      margin: theme.spacing(1, 0, 0, 1),
      color: theme.palette.error.main,
    },
  })
);

interface ISearchCardSetProps {
  type: FORM;
  item: any;
}

function SearchResultCard(props: ISearchCardSetProps) {
  const styles = useStyles();

  function generateBody(): String {
    switch (props.type) {
      case FORM.TOUR:
        return ""
      case FORM.COLLECTION:
          return ""
      case FORM.MURAL:
        return props.item.address + ", " + props.item.city
      default:
        return ""
    }
  }

  const body = generateBody()

  return (
    <Card className={styles.card}>
      <img
        className={styles.icon}
        src="https://cdn2.lamag.com/wp-content/uploads/sites/6/2020/01/kobe-mural-mr-brainwash-chris-delmas-afp-getty-1068x712.jpg"
        alt="mural"
      ></img>
      <div className={styles.properties}>
        <Typography variant="subtitle1">{props.item.name}</Typography>
        <Typography variant="body2">{body}</Typography>
      </div>
      <Typography variant="body1" className={styles.type}>
        {props.type}
      </Typography>
    </Card>
  );
}

export default SearchResultCard;
