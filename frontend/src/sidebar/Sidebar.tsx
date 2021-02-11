import React from "react";
import Drawer from "@material-ui/core/Drawer";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      paper: "primary",
      width: "30%",
    },
    title: {
      fontSize: "180%",
      fontWeight: 500,
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(25),
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
      </Drawer>
    </div>
  );
}

export default Sidebar;
