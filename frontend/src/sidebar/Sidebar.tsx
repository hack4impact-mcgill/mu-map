import React from "react";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  drawer: {
    backgroundColor: "#EEE3E3",
  },
  title: {
    fontSize: "larger",
    fontWeight: "bold",
    paddingLeft: "30px",
    paddingRight: "200px",
    paddingTop: "40px",
  },
});

interface ISidebarProps {
  name: string;
}

function Sidebar(props: ISidebarProps) {
  const styles = useStyles();
  const [open, setOpen] = React.useState<boolean>(false);

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          setOpen(!open);
        }}
      >
        Open sidebar
      </Button>
      <Drawer
        classes={{ paper: styles.drawer }}
        open={open}
        onClose={() => {
          setOpen(!open);
        }}
      >
        <p className={styles.title}>{props.name}</p>
      </Drawer>
    </div>
  );
}

export default Sidebar;
