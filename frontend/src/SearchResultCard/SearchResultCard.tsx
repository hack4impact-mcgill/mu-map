import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import { createStyles, makeStyles, Theme } from "@material-ui/core";
import React from "react";
import { FORM } from "constants/constants";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      margin: theme.spacing(0, 2, 2, 3),
      display: "flex",
      justifyContent: "flex-start",
      width: "90%",
      cursor: "pointer"
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
  handleMuralClick: (lat: number, long: number) => void
  handleCancel: () => void
}

function SearchResultCard(props: ISearchCardSetProps) {
  const styles = useStyles();

  function generateBody(): String {
    switch (props.type) {
      case FORM.TOUR:
        return props.item.description
      case FORM.COLLECTION:
          return props.item.description
      case FORM.MURAL:
        return props.item.address + ", " + props.item.city
      default:
        return ""
    }
  }

  function handleClick() {
    switch (props.type) {
      case FORM.MURAL:
        props.handleMuralClick(props.item.coordinates.coordinates[0],props.item.coordinates.coordinates[1])
    }
    props.handleCancel()
  }

  const body = generateBody()

  return (
    <Card className={styles.card} onClick={handleClick}>
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
