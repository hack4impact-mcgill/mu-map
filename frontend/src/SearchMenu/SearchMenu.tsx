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

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    flexContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flexStart",
      width: "40vw",
      maxWidth: "500px",
      padding: theme.spacing(3),
    },
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
    field: {
      width: "100%",
      margin: theme.spacing(0, 0, 2, 0),
    },
    title: {
      fontSize: "180%",
    },
  })
);

interface ISearchMenuProps {
  searchCards: any;
}

function SearchMenu(props: ISearchMenuProps) {
  const styles = useStyles();
  const [murals, setMurals] = useState<any>([]);
  const [tours, setTours] = useState<any>([]);
  const [collections, setCollections] = useState<any>([]);
  const [displayedMurals, setDisplayedMurals] = useState<any>([]);
  const [displayedTours, setDisplayedTours] = useState<any>([]);
  const [displayedCollections, setDisplayedCollections] = useState<any>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  /**
   * fetch all collections/tours/murals upon component load LOL!
   */
  useEffect(() => {
    axios
      .get(CREATE_MURAL_API)
      .then((response) => {
        if (response.data) setMurals(response.data.rows);
      })
      .catch((err) => console.log(err));
    axios
      .get(GET_ALL_COLLECTION)
      .then((response) => {
        if (response.data) setTours(response.data.collections);
      })
      .catch((err) => console.log(err));
    axios
      .get(GET_ALL_TOUR)
      .then((response) => {
        if (response.data) setCollections(response.data.tours);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    console.log(tours);
  }, [tours]);

  useEffect(() => {
    console.log(collections);
  }, [collections]);

  useEffect(() => {
    console.log(murals);
  }, [murals]);

  function test(e: any) {
    if (e.keyCode === 13) {
      console.log("value", e.target.value);
      const newDisplayedMurals = murals.filter(function (mural: any) {
        return mural.name.toLowerCase().includes(searchQuery.toLowerCase());
      });
      console.log(newDisplayedMurals);
      setDisplayedMurals(newDisplayedMurals);
      const newDisplayedTours = tours.filter(function (tour: any) {
        return tour.name.toLowerCase().includes(searchQuery.toLowerCase());
      });
      console.log(newDisplayedTours);
      setDisplayedTours(newDisplayedTours);
      const newDisplayedCollections = collections.filter(function (
        collection: any
      ) {
        return collection.name
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
      });
      console.log(newDisplayedCollections);
      setDisplayedCollections(newDisplayedCollections);
    }
  }

  return (
    <div>
      <InputBase
        className={`${styles.title} ${styles.field}`}
        placeholder="Search for murals / colls / tours"
        onKeyDown={test}
        onChange={(e: any) => setSearchQuery(e.target.value)}
        inputProps={{ "aria-label": "Search bar" }}
      />
      <div className={styles.flexContainer}>
        {displayedMurals.map((mural: any, index: any) => {
          return (
            <Card className={styles.card} key={mural.id}>
              <img
                className={styles.icon}
                src="https://cdn2.lamag.com/wp-content/uploads/sites/6/2020/01/kobe-mural-mr-brainwash-chris-delmas-afp-getty-1068x712.jpg"
                alt="mural"
              ></img>
              <div className={styles.properties}>
                <Typography variant="subtitle1">{mural.name}</Typography>
                <Typography variant="body2">
                  {mural.address}, {mural.city}
                </Typography>
              </div>
              <Typography variant="body1" className={styles.type}>
                mural
              </Typography>
            </Card>
          );
        })}
        {displayedTours.map((mural: any, index: any) => {
          return (
            <Card className={styles.card} key={mural.id}>
              <img
                className={styles.icon}
                src="https://cdn2.lamag.com/wp-content/uploads/sites/6/2020/01/kobe-mural-mr-brainwash-chris-delmas-afp-getty-1068x712.jpg"
                alt="mural"
              ></img>
              <div className={styles.properties}>
                <Typography variant="subtitle1">{mural.name}</Typography>
              </div>
              <Typography variant="body1" className={styles.type}>
                mural
              </Typography>
            </Card>
          );
        })}
        {displayedCollections.map((mural: any, index: any) => {
          return (
            <Card className={styles.card} key={mural.id}>
              <img
                className={styles.icon}
                src="https://cdn2.lamag.com/wp-content/uploads/sites/6/2020/01/kobe-mural-mr-brainwash-chris-delmas-afp-getty-1068x712.jpg"
                alt="mural"
              ></img>
              <div className={styles.properties}>
                <Typography variant="subtitle1">{mural.name}</Typography>
              </div>
              <Typography variant="body1" className={styles.type}>
                mural
              </Typography>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

export default SearchMenu;
