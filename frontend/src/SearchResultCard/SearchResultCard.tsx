import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import { createStyles, makeStyles, Theme } from "@material-ui/core";
import React from "react";
import { FORM, PLACEHOLDER_IMAGE } from "constants/constants";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      marginBottom: theme.spacing(2),
      display: "flex",
      width: "100%",
      maxHeight: "80px",
      cursor: "pointer",
      boxShadow: "0px 0px 20px 0px #99999940"
    },
    icon: {
      width: "25%",
      minHeight: "100%",
      objectFit: "cover"
    },
    properties: {
      display: "flex",
      flexDirection: "column",
      flexGrow: 1,
      justifyContent: "space-around",
      margin: theme.spacing(1, 2, 1, 2),
      width: "75%",
    },
    title: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
    },
  })
);

interface ISearchCardSetProps {
  type: FORM;
  item: any;
  handleMuralClick: (lat: number, long: number) => void
  handleCancel: () => void
  setSelectedResource: (resource: any) => void;
  setResourceType: (type: FORM) => void;
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

  /**
   * When the search result is clicked, pass its type and contents
   * up to the parent to render the correct form. If the result is
   * a mural, zoom the map to its location.
   */
  function handleClick() {
    switch (props.type) {
      case FORM.MURAL:
        props.setResourceType(FORM.MURAL);
        props.setSelectedResource(props.item)
        props.handleMuralClick(props.item.coordinates.coordinates[0],props.item.coordinates.coordinates[1])
        break;
      case FORM.TOUR:
        props.setResourceType(FORM.TOUR);
        props.setSelectedResource(props.item)
        break;
      case FORM.COLLECTION:
        props.setResourceType(FORM.COLLECTION);
        props.setSelectedResource(props.item)
        break;
    }
  }

  const body = generateBody()

  return (
    <Card className={styles.card} onClick={handleClick}>
      <img
        className={styles.icon}
        src={props.item.imgURLs ? props.item.imgURLs[0] : PLACEHOLDER_IMAGE}
        alt="mural"
      />
      <div className={styles.properties}>
        <div className={styles.title}>
          <Typography variant="body2">
            <strong>{props.item.name}</strong>
          </Typography>
          <Typography variant="overline" color="error">
            {props.type}
          </Typography>
        </div>
        <Typography variant="caption">{body}</Typography>
      </div>
    </Card>
  );
}

export default SearchResultCard;
