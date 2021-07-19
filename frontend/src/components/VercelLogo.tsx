import { Button, makeStyles, Theme } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme: Theme) => ({
  button: {
    position: "sticky",
    bottom: theme.spacing(0.5),
    width: 120,
    margin: "auto",
    textTransform: "none",
  },
}));

const VercelLogo = () => {
  const { button } = useStyles();

  return (
    <Button
      className={button}
      size="small"
      href="https://vercel.com?utm_source=mumap&utm_campaign=oss"
      target="_blank"
    >
      Powered by
      <svg
        width="30px"
        height="30px"
        viewBox="97 80 100 82"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title>Vercel Unicode Light</title>
        <path
          d="M159.772 108.37h22.475l-11.242-18.545-11.233 18.545z"
          fill="black"
          transform="scale(3.5) translate(-130, -65)"
        />
      </svg>
    </Button>
  );
};

export default VercelLogo;
