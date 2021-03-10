import React from "react";
import { FORM } from "constants/constants";
import SearchIcon from "@material-ui/icons/Search";
import IconButton from "@material-ui/core/IconButton";

import { createStyles, makeStyles, Theme } from "@material-ui/core";
interface ISearchButtonProps {
  toggleSidebar: (formName: FORM) => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    searchButton: {
      width: "fit-content",
      position: "absolute",
      bottom: "93%",
      marginLeft: theme.spacing(1),
      zIndex: 1,
    },
  })
);

function SearchButton(props: ISearchButtonProps) {
  const styles = useStyles();
  return (
    <div className={styles.searchButton}>
      <IconButton
        color="primary"
        onClick={() => props.toggleSidebar(FORM.SEARCH)}
      >
        <SearchIcon fontSize="large" />
      </IconButton>
    </div>
  );
}

export default SearchButton;
