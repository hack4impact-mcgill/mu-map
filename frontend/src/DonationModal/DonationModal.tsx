import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Button from "@material-ui/core/Button";
import { makeStyles, useTheme, Theme } from "@material-ui/core/styles";

interface IDonationModalProps {
  open: boolean;
  handleClose: () => void;
}

const useStyles = makeStyles((theme: Theme) => ({
  button: {
    width: "90%",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  logo: {
      
  }
}));

function DonationModal(props: IDonationModalProps) {
  const classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Dialog
      fullScreen={fullScreen}
      open={props.open}
      onClose={props.handleClose}
    >
      <DialogTitle>{<b>Congrats</b>}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                xmlSpace="preserve"
                width="576"
                height="325.58667"
                viewBox="0 0 576 325.58667"
              >
                <g transform="matrix(1.3333333, 0, 0, -1.3333333, 0, 325.58667)">
                  <g transform="scale(0.1)">
                    <path
                      d="m 4309.87,1700.76 c -55.08,53.76 -95.15,98.22 -160.95,90.34 -36.92,-4.38 -69.44,0 -90.59,-91.29 -84.85,-368.5 -137.35,-605.71 -304.37,-921.009 0,0 6.06,787.519 12.5,1141.409 10,72.23 40.67,118.64 -50.77,198.02 -78.31,14.4 -185.94,44.23 -221.19,-17.07 -18.37,-145.44 -32.72,-214.41 -69.58,-392.3 C 3346.44,1329.98 3271,1033.7 3077.58,651.77 c -14.67,495.16 -80.51,1049.84 -137.7,1565.01 -4.8,43.08 -2.18,92.8 -12.2,121.38 -16.1,45.94 -21.92,55.06 -115.59,68.58 0,0 -52.67,6.15 -111.14,-5.67 -53.67,-28.84 -43.39,-71.03 -51.21,-153.22 -47.52,-499.04 -141.48,-993.62 -329.04,-1419.92 -17.6,143 -7.29,252.2 -12.83,566.55 -5.39,308.42 0,732.88 -21.94,998.11 -32.67,65.03 -131.68,49.11 -175.5,43.21 -69.91,-3.16 -92.38,-26.42 -99.87,-67.67 -3.82,-6.46 -7.32,-13.17 -11.32,-19.99 -226.67,-318.3 -304.51,-704.51 -416.84,-1029.51 -18.29,282.91 -59.22,532.37 -50.61,806.91 l 3.08,100.78 c 10.97,55 -10.93,78.56 -35.47,101.41 -70.6,47.89 -164.86,39.1 -213.2,28.26 -34.18,-28.94 -98.68,-90.46 -116.97,-137.55 -211.25,-260.17 -268.917,-544.73 -389.757,-840.87 5.785,153.21 27.699,529.13 27.699,576.3 7.308,62.86 -10.942,90.4 -32.914,106.07 -73.668,68.54 -155.43,54.98 -197.383,52.74 -28.711,-18.18 -48.34,-31.37 -72.086,-72.34 C 366.773,1886.7 251.328,1520.91 160.039,1299.17 61.2656,1059.47 69.9648,1055.23 13.3477,859 -0.464844,811.129 -6.64453,784.43 10.1133,741.129 c 55.0625,-53.668 95.0507,-98.207 160.8827,-90.41 36.957,4.48 69.465,0 90.613,91.32 84.817,368.511 137.274,605.741 304.309,920.991 0,0 -5.969,-787.491 -12.5,-1141.358 -9.824,-72.223 -40.613,-118.692 50.793,-198.024 78.289,-14.386 185.926,-44.238 221.258,17.051 18.34,145.492 32.683,214.512 69.519,392.34 78.535,378.901 153.952,675.151 347.332,1057.081 14.62,-495.16 80.51,-1006.011 137.77,-1521.14 4.76,-43.128 2.11,-136.671 12.19,-165.351 16,-45.7579 21.93,-54.9884 115.58,-68.4102 0,0 52.6,-6.2071 111.1,5.5703 53.78,28.9414 43.42,71.0429 51.22,153.2499 47.56,499.043 141.5,993.611 329.06,1419.921 17.56,-142.98 7.29,-299.35 12.8,-613.69 5.42,-308.508 0,-685.731 22,-950.9614 32.67,-65.0078 131.56,-49.128912 175.42,-43.26954 69.99,3.16016 92.46,26.40234 99.91,67.65234 3.83,6.4375 7.32,13.207 11.33,20.0586 226.64,318.34 304.49,704.449 416.9,1029.56 18.22,-282.861 59.2,-532.451 50.53,-806.958 l -3.01,-100.782 c -10.99,-55.05 10.95,-78.601 35.45,-101.398 70.54,-47.8712 164.78,-39.1134 213.06,-28.2423 34.28,28.8593 98.83,90.4103 117.07,137.4923 211.26,260.16 268.95,544.75 389.77,840.908 -5.89,-153.221 -27.72,-529.131 -27.72,-576.299 -7.29,-62.871 10.87,-90.351 32.76,-106.082 73.74,-68.5 155.59,-55.019 197.52,-52.738 28.8,18.199 48.4,31.32 72.13,72.34 137.96,153.66 253.48,519.488 344.73,741.189 98.79,239.7 89.94,243.94 146.72,440.17 13.87,47.88 20.04,74.54 3.26,117.85"
                      style={{fill:"#E6E5E6",fillRule:"nonzero",stroke:"none"}}
                    />
                  </g>
                </g>
              </svg>
              <p>
                  MU's mission is to beautify the city of Montreal by creating
              murals that are anchored in local communities. At the hear of its
              approach is the desire to see and experience art on a daily basis,
              to trigger a social transformation and to turn Montreal into an
              open-air MUseum!
              </p>
              
            </div>
          }
        </DialogContentText>
      </DialogContent>
      <Button
        className={classes.button}
        size="large"
        variant="contained"
        onClick={props.handleClose}
        color="default"
      >
        Visit MU
      </Button>
      <Button
        className={classes.button}
        size="large"
        onClick={props.handleClose}
        color="primary"
        variant="contained"
      >
        Donate
      </Button>
    </Dialog>
  );
}

export default DonationModal;
