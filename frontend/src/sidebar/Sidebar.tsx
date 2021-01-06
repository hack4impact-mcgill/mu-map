import React from "react";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import closeButton from "./closeButton.png";

const useStyles = makeStyles({
  drawer: {
    backgroundColor: "#E5E5E5",
  },
  title: {
    fontSize: "larger",
    fontWeight: 500,
    paddingLeft: "26px",
    paddingRight: "200px",
  },
  closeImage: {
    cursor: "pointer",
    float: "right",
    marginTop: "19px",
    width: "14px",
    marginRight: "23px",
  },
  flexContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  bottomButton: {
    fontWeight: 500,
  },
  bottomButtonContainer: {
    display: "flex",
    justifyContent: "space-evenly",
  },
  deleteButtonVisible: {
    color: "red",
  },
  deleteButtonInvisible: {
    display: "none",
  },
});

interface ISidebarProps {
  name: string;
  children?: React.ReactNode | null;
  isVisible: boolean,
  closeSidebar: () => void;
}

function Sidebar(props: ISidebarProps) {
  const styles = useStyles();
  const [deleteButtonVisible, setDeleteButtonVisible] = React.useState<boolean>(
    false
  );

  return (
    <div>
      <Drawer
        classes={{ paper: styles.drawer }}
        open={props.isVisible}
        onClose={props.closeSidebar}
      >
        <div>
          <img
            src={closeButton}
            className={styles.closeImage}
            alt="closeButton"
            onClick={props.closeSidebar}
          />
        </div>
        <p className={styles.title}>{props.name}</p>
        <div className={styles.flexContainer}>{props.children}</div>
        <div className={styles.bottomButtonContainer}>
          <Button color="primary" size="small" className={styles.bottomButton}>
            Cancel
          </Button>
          <Button color="primary" size="small">
            Save
          </Button>
          <Button
            className={
              deleteButtonVisible
                ? styles.deleteButtonVisible
                : styles.deleteButtonInvisible
            }
            size="small"
          >
            Delete
          </Button>
        </div>
      </Drawer>
    </div>
  );
}

export default Sidebar;
