import React from "react";
import Card from '@material-ui/core/Card';
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    flexContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flexStart",
      width: "100%",
      maxWidth: "450px"
    },
    card: {
      margin: theme.spacing(0, 2, 2, 3),
      display: "flex",
      justifyContent: "flex-start"
    },
    icon: {
      maxWidth: "25%",
      height: "100%"
    },
    properties: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      padding: theme.spacing(0, 0, 1, 2),
      width: "50%"
    },
    type: {
      margin: theme.spacing(1, 0, 0, 1),
      color: theme.palette.error.main
    }
  }),
);

interface ISearchCardProps {
  searchCards: any;
}

function SearchCard(props: ISearchCardProps) {
  const styles = useStyles();

  return (
    <div className={styles.flexContainer}>
      {props.searchCards.map((mural: any, index: any) => {
        return (
          <Card className={styles.card} key={mural.id}>
            <img className={styles.icon}
              src="https://cdn2.lamag.com/wp-content/uploads/sites/6/2020/01/kobe-mural-mr-brainwash-chris-delmas-afp-getty-1068x712.jpg"
              alt="mural"></img>
            <div className={styles.properties}>
              <Typography variant="subtitle1">
                {mural.name}
              </Typography>
              <Typography variant="body2">
                {mural.address}, {mural.city}
              </Typography>
            </div>
            <Typography variant="body1" className={styles.type}>
              mural
            </Typography>
          </Card>
        )
      })
      }
    </div>
  );
}

export default SearchCard;
