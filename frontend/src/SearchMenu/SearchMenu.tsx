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
      maxWidth: "500px",
      padding: theme.spacing(3),
    },
    field: {
      width: "50%",
      margin: theme.spacing(0, 0, 0, 2),
    },
    title: {
      fontSize: "170%",
    },
    searchBar: {
      display: "flex",
    },
    icon: {
      width: "10%",
      height: "10%",
      margin: theme.spacing(0, 2, 0, 2),
    },
    noResults: {
      textAlign: "center",
      fontSize: "170%",
    },
  })
);

interface ISearchMenuProps {
  handleMuralClick: (lat: number, long: number) => void;
  handleCancel: () => void;
  setSelectedMural: (mural: any) => void;
  setSelectedTour: (tour: any) => void;
  setSelectedCollection: (collection: any) => void;
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
        if (response.data) setCollections(response.data.collections);
      })
      .catch((err) => console.log(err));
    axios
      .get(GET_ALL_TOUR)
      .then((response) => {
        if (response.data) setTours(response.data.tours);
      })
      .catch((err) => console.log(err));
  }, []);

  /**
   * Filters a list of items matching the current search query
   * @param collection a list of items to filter
   * @returns a list of items matching the search query
   */
  function filterItems(collection: any[]): any[] {
    return collection.filter(function (item: any) {
      return item.name.toLowerCase().includes(searchQuery.toLowerCase());
    });
  }

  /**
   * Filter search results when enter is pressed
   * @param e button click event
   */
  function handleEnter(e: any) {
    if (e.keyCode === 13) {
      if (searchQuery === "") {
        setDisplayedCollections([]);
        setDisplayedMurals([]);
        setDisplayedTours([]);
        return;
      }
      setDisplayedMurals(filterItems(murals));
      setDisplayedTours(filterItems(tours));
      setDisplayedCollections(filterItems(collections));
    }
  }

  return (
    <div>
      <div className={styles.searchBar}>
        <img className={styles.icon} src="/apple-touch-icon.png" alt="mural" />
        <InputBase
          className={`${styles.title} ${styles.field}`}
          placeholder="Search..."
          onKeyDown={handleEnter}
          onChange={(e: any) => setSearchQuery(e.target.value)}
          inputProps={{ "aria-label": "Search bar" }}
        />
      </div>
      <div className={styles.flexContainer}>
        {displayedCollections.length < 1 &&
          displayedMurals.length < 1 &&
          displayedTours.length < 1 && (
            <p className={styles.noResults}>No Results</p>
          )}
        {displayedMurals.map((mural: any) => {
          return (
            <SearchResultCard
              type={FORM.MURAL}
              item={mural}
              key={mural.id}
              handleMuralClick={props.handleMuralClick}
              handleCancel={props.handleCancel}
              setSelectedMural={props.setSelectedMural}
              setSelectedTour={props.setSelectedTour}
              setSelectedCollection={props.setSelectedCollection}
            />
          );
        })}
        {displayedTours.map((tour: any) => {
          return (
            <SearchResultCard
              type={FORM.TOUR}
              item={tour}
              key={tour.id}
              handleMuralClick={props.handleMuralClick}
              handleCancel={props.handleCancel}
              setSelectedMural={props.setSelectedMural}
              setSelectedTour={props.setSelectedTour}
              setSelectedCollection={props.setSelectedCollection}
            />
          );
        })}
        {displayedCollections.map((collection: any) => {
          return (
            <SearchResultCard
              type={FORM.COLLECTION}
              item={collection}
              key={collection.id}
              handleMuralClick={props.handleMuralClick}
              handleCancel={props.handleCancel}
              setSelectedMural={props.setSelectedMural}
              setSelectedTour={props.setSelectedTour}
              setSelectedCollection={props.setSelectedCollection}
            />
          );
        })}
      </div>
    </div>
  );
}

export default SearchMenu;
