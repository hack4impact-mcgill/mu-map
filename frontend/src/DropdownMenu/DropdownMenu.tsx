import React from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MenuIcon from "@material-ui/icons/Menu";
import TranslateIcon from "@material-ui/icons/Translate";
import { makeStyles, useTheme, createStyles, Theme } from "@material-ui/core/styles";


interface IDropdownMenuProps {
  isSignedIn: boolean;
  signInClick: () => void;
}



const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      DropdownMenu: {
        position: "absolute",
        top: theme.spacing(1),
        right: theme.spacing(1)
      },
      signinText: {
        color: theme.palette.primary.main,
      },
      signoutText: {
        color: theme.palette.secondary.main,
      }
    })
)



function DropdownMenu(props: IDropdownMenuProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const theme = useTheme()
  const buttonText = {
    signin:  <strong style={{color: theme.palette.primary.main}}>SIGN IN </strong> ,
    signout: <strong style={{color: theme.palette.secondary.main}}>SIGN OUT </strong>
  };

  const classes = useStyles();

  return (
    <div className={classes.DropdownMenu}>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        color="primary"
        onClick={handleClick}
      >
        <MenuIcon fontSize="large" style={{ fill: "black" }} />
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={!!anchorEl}
        onClose={handleClose}
      >
        <MenuItem>
          <TranslateIcon /> English (Anglais)
        </MenuItem>
        <MenuItem>Turn Location Off</MenuItem>
        <MenuItem component="a" href="https://mumtl.org/" target="_blank">
          Visit MU site
        </MenuItem>
        <MenuItem>Donate</MenuItem>
        <MenuItem onClick={props.signInClick}>
          {props.isSignedIn ? buttonText.signout : buttonText.signin}
        </MenuItem>
        <hr></hr>
        <MenuItem onClick={handleClose}>Cancel</MenuItem>
      </Menu>
    </div>
  );
}

export default DropdownMenu;