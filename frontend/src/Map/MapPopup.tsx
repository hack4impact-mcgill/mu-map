import React from "react";
import { Popup } from "react-map-gl";
import {
  Button,
  IconButton,
  createStyles,
  makeStyles,
  Typography,
  Theme,
} from "@material-ui/core";
import HighlightOffOutlinedIcon from "@material-ui/icons/HighlightOffOutlined";
import { PLACEHOLDER_IMAGE } from "constants/constants";
import "./Map.css";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    popupDetailButton: {
      width: "100%",
      margin: theme.spacing(1, 0, 0, 0)
    },
    popupDetails: {
      width: "300px",
      padding: theme.spacing(0, 2, 2, 2)
    },
    geolocateControl: {
      bottom: theme.spacing(2),
      right: 0,
      padding: theme.spacing(2)
    },
    popupImage: {
      width: "300px",
      height: "100px",
      paddingBottom: "10px",
      objectFit: "cover",
      borderRadius: "4px"
    },
    popupCloseButton: {
      position: 'absolute',
      padding: theme.spacing(1),
      margin: theme.spacing(-2, 0, 0, -3)
    }
  })
);

interface IPopupProps {
  popupInfo: any;
  setInfo: (mural: any) => void;
  clickDetail: (mural: any) => void;
}

const MapPopup = ({popupInfo, setInfo, clickDetail}: IPopupProps) => {
  
  const styles = useStyles();
  
  return (
    <Popup
      tipSize={0}
      anchor={"top"}
      longitude={popupInfo.coordinates.coordinates[0]}
      latitude={popupInfo.coordinates.coordinates[1]}
      closeOnClick={false}
      closeButton={false}
      onClose={setInfo}
    >
      <img
        className={styles.popupImage}
        src={!!popupInfo.imgURLs ? popupInfo.imgURLs[0] : PLACEHOLDER_IMAGE }
        alt="Mural_img"
      />
      <IconButton
        onClick={setInfo}
        className={styles.popupCloseButton}
      >
        <HighlightOffOutlinedIcon color="action" />
      </IconButton>
      <div className={styles.popupDetails}>
        <Typography variant="h6">
          <strong>
            {popupInfo.name}
          </strong>
        </Typography>
        <Typography variant="caption">{popupInfo.address}</Typography>
        <Button
          variant="outlined"
          disableElevation
          color="primary"
          onClick={() => clickDetail(popupInfo)}
          className={styles.popupDetailButton}
        >
          DETAILS
        </Button>
      </div>
    </Popup>
  )
}

export default MapPopup;
