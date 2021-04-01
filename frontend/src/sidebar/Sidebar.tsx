import React from "react";
import Drawer from "@material-ui/core/Drawer";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      paper: "primary",
      width: "30%",
    },
    closeIcon: {
      cursor: "pointer",
      float: "right",
      margin: theme.spacing(2),
    },
    flexContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
  })
);

interface ISidebarProps {
  children?: React.ReactNode | null;
  isVisible: boolean;
  closeSidebar: () => void;
}

function Sidebar(props: ISidebarProps) {
  const styles = useStyles();

  return (
    <div>
      <Drawer
        className={styles.drawer}
        open={props.isVisible}
        onClose={props.closeSidebar}
      >
        <span>
          <IconButton
            onClick={props.closeSidebar}
            className={styles.closeIcon}>
            <CloseIcon />
          </IconButton>
        </span>
        <div className={styles.flexContainer}>{props.children}</div>
      </Drawer>
    </div>
  );
}

export default Sidebar;
