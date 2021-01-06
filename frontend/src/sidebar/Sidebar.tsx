import React, { useState } from "react";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      paper: "primary",
    },
    title: {
      fontSize: "larger",
      fontWeight: 500,
      paddingLeft: theme.spacing(3),
      paddingRight: "200px",
    },
    closeIcon: {
      cursor: "pointer",
      float: "right",
      marginTop: theme.spacing(2),
      marginRight: theme.spacing(3),
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
    deleteButtonInvisible: {
      display: "none",
    },
  })
);

interface ISidebarProps {
  name: string;
  children?: React.ReactNode | null;
  isVisible: boolean;
  closeSidebar: () => void;
}

function Sidebar(props: ISidebarProps) {
  const styles = useStyles();
  const [deleteButtonVisible] = useState<boolean>(false);

  return (
    <div>
      <Drawer
        className={styles.drawer}
        open={props.isVisible}
        onClose={props.closeSidebar}
      >
        <div>
          <CloseIcon
            onClick={props.closeSidebar}
            className={styles.closeIcon}
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
            className={deleteButtonVisible ? "" : styles.deleteButtonInvisible}
            size="small"
            color="secondary"
          >
            Delete
          </Button>
        </div>
      </Drawer>
    </div>
  );
}

export default Sidebar;
