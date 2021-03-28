import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MenuIcon from "@material-ui/icons/Menu";
import TranslateIcon from "@material-ui/icons/Translate";
import {
  makeStyles,
  useTheme,
  Theme,
} from "@material-ui/core/styles";

interface IDropdownMenuProps {
  isSignedIn: boolean;
  signinClick: () => void;
  signoutClick: () => void;
  donateClick: () => void;
}

const useStyles = makeStyles((theme: Theme) => ({
  DropdownMenu: {
    position: "absolute",
    top: theme.spacing(1),
    right: theme.spacing(1),
  },
})
);

function DropdownMenu({ isSignedIn, signinClick, signoutClick, donateClick }: IDropdownMenuProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignin = () => {
    signinClick()
    handleClose()
  }

  const handleSignout = () => {
    signoutClick()
    handleClose()
  }

  const handleDonate = () => {
    donateClick()
    handleClose()
  }

  const theme = useTheme();
  const buttonText = {
    signin: (
      'Sign in'
    ),
    signout: (
      <strong style={{ color: theme.palette.secondary.main }}>Sign out</strong>
    ),
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
        <MenuItem component="a" href="https://mumtl.org/" target="_blank">
          Visit MU site
        </MenuItem>
        <MenuItem
          onClick={handleDonate}
        >
          <strong style={{ color: theme.palette.secondary.main }}>Donate <span role="img" aria-label="praying hands">🙏</span> </strong>
        </MenuItem>
        <MenuItem onClick={isSignedIn ? handleSignout : handleSignin}>
          {isSignedIn ? buttonText.signout : buttonText.signin}
        </MenuItem>
      </Menu>
    </div>
  );
}

export default DropdownMenu;
