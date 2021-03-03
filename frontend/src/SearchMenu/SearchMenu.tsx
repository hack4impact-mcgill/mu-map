import { createStyles, InputBase, makeStyles, Theme } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  CREATE_MURAL_API,
  GET_ALL_COLLECTION,
  GET_ALL_TOUR,
} from "constants/constants";
import SearchResultCard from "SearchResultCard/SearchResultCard";
import { FORM } from "constants/constants";

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
    field: {
      width: "100%",
      margin: theme.spacing(0, 2, 2, 2),
    },
    title: {
      fontSize: "180%",
    },
    searchBar: {
      width: "80%",
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

  function filterItems(collection: any[]): any[] {
    return collection.filter(function (item: any) {
      return item.name.toLowerCase().includes(searchQuery.toLowerCase());
    });
  }

  function handleEnter(e: any) {
    if (e.keyCode === 13) {
      if (searchQuery === "" ) {
        setDisplayedCollections([])
        setDisplayedMurals([])
        setDisplayedTours([])
      }
      setDisplayedMurals(filterItems(murals));
      setDisplayedTours(filterItems(tours));
      setDisplayedCollections(filterItems(collections));
    }
  }

  return (
    <div>
      <div className={styles.searchBar}>
        <InputBase
          className={`${styles.title} ${styles.field}`}
          placeholder="Search..."
          onKeyDown={handleEnter}
          onChange={(e: any) => setSearchQuery(e.target.value)}
          inputProps={{ "aria-label": "Search bar" }}
        />
      </div>
      <div className={styles.flexContainer}>
        {displayedMurals.map((mural: any) => {
          return (
            <SearchResultCard type={FORM.MURAL} item={mural} key={mural.id} />
          );
        })}
        {displayedTours.map((tour: any) => {
          return (
            <SearchResultCard type={FORM.TOUR} item={tour} key={tour.id} />
          );
        })}
        {displayedCollections.map((colletion: any) => {
          return (
            <SearchResultCard
              type={FORM.COLLECTION}
              item={colletion}
              key={colletion.id}
            />
          );
        })}
      </div>
    </div>
  );
}

export default SearchMenu;
