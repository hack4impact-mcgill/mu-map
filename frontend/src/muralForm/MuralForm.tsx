import React, { useEffect, useState, useContext } from "react";
import {
  InputBase,
  InputAdornment,
  Typography,
  Snackbar,
  Button,
} from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import AddressSearch from "../AddressSearch/addressSearch";
import MultiAdd from "../multiAdd/MultiAdd";
import ActionButtons from "../ActionButtons/ActionButtons";
import EditIcon from "@material-ui/icons/Edit";
import axios from "axios";
import {
  CREATE_MURAL_API,
  GET_ALL_ARTISTS_API,
  GET_ALL_BOROUGH_API,
} from "../constants/constants";
import ShareIcon from "@material-ui/icons/Share";
import Alert from "@material-ui/lab/Alert";
import ImageUpload from "../ImageUpload/ImageUpload";
import Directions from "../Directions/Directions";
import ArtistBoroughSearch from "ArtistBoroughSearch";
import Context from "context";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    flexContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "start",
      width: "500px",
      maxWidth: "100vw",
      padding: theme.spacing(3),
    },
    element: {
      width: "100%",
      margin: theme.spacing(0, 0, 2, 0),
    },
    bottomButton: {
      fontWeight: 500,
    },
    bottomButtonContainer: {
      display: "flex",
      width: "100%",
      justifyContent: "space-between",
    },
    name: {
      fontSize: "180%",
    },
    directionButton: {
      width: "100%",
      margin: theme.spacing(2, 0, 0, 0),
    },
  })
);

interface IMuralFormProps {
  mural?: any;
  handleCancel: () => void;
}

interface Image {
  url: string;
  path: string;
}

function MuralForm({ mural, handleCancel }: IMuralFormProps) {
  const styles = useStyles();

  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [year, setYear] = useState<number>(new Date().getFullYear());

  const [address, setAddress] = useState<string>("");
  const [addressCoords, setAddressCoords] = useState<number[]>([]);
  const [borough, setBorough] = useState<number | null>(null);
  const [neighbourhood, setNeighbourhood] = useState<string>("");

  const [assistants, setAssistants] = useState<string[]>([]);
  const [socialMedia, setSocialMedia] = useState<string[]>([]);
  const [partners, setPartners] = useState<string[]>([]);
  const [artist, setArtist] = useState<number | null>(null);
  const [imgUrlsAndPath, setImgUrlsAndPath] = useState<Image[]>([]);
  const [editingName, setEditingName] = useState<boolean>(false);
  const [hoveringName, setHoveringName] = useState<boolean>(false);

  const [editingDesc, setEditingDesc] = useState<boolean>(false);
  const [hoveringDesc, setHoveringDesc] = useState<boolean>(false);

  const [popup, setPopup] = useState<boolean>(false);
  const [directionOpen, setDirectionOpen] = useState<boolean>(false);

  const [currentPos, setCurrentPos] = useState<number[]>([]);
  const [isGeoOn, setIsGeoOn] = useState<boolean>(false);

  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  const [linkCopied, setLinkCopied] = useState<boolean>(false);

  /**
   * Enable editable form fields for admin users
   */
  const userContext: any = useContext(Context);
  useEffect(() => setIsAdmin(!!(userContext as any).user), [userContext]);

  /**
   * Populate the form when an existing mural is passed as a prop
   */
  useEffect(() => {
    if (!mural || !Object.keys(mural)) return;
    setName(mural.name);
    setDescription(mural.description);
    setYear(mural.year);
    setAddress(mural.address);
    setAddressCoords(mural.coordinates.coordinates);
    setBorough(mural.boroughId);
    setNeighbourhood(mural.neighbourhood);
    setAssistants(mural.assistants);
    setSocialMedia(mural.socialMediaURLs);
    setPartners(mural.partners);
    setArtist(mural.artistId);
    if (mural.imgURLs) {
      setImgUrlsAndPath(
        mural.imgURLs.map((url: string) => {
          return { url: url, path: pathFromUrl(url) };
        })
      );
    }
  }, [mural]);

  function success(pos: any) {
    setCurrentPos([pos.coords.longitude, pos.coords.latitude]);
    setIsGeoOn(true);
  }

  function error(err: any) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
    setIsGeoOn(false);
  }

  useEffect(() => {
    var options = {
      enableHighAccuracy: true,
      timeout: 60000,
      maximumAge: 0,
    };
    navigator.geolocation.getCurrentPosition(success, error, options);
  }, []);

  function submitForm() {
    if (name === "") {
      alert("Please enter a name.");
      return;
    }
    if (artist == null) {
      alert("Please select a valid artist.");
      return;
    }
    if (borough == null) {
      alert("Please select a valid borough.");
      return;
    }
    if (addressCoords.length !== 2 || address === "" || neighbourhood === "") {
      alert("Please check validity of address.");
      return;
    }
    if (!userContext.token) {
      alert("Please log in again.");
      return;
    }

    // TODO: apply a Mural interface to this object
    let payload = {
      name: name,
      boroughId: borough,
      artistId: artist,
      year: year,
      city: "Montreal",
      longitude: addressCoords[0],
      latitude: addressCoords[1],
      assistants: assistants,
      partners: partners,
      description: description,
      socialMedia: socialMedia,
      address: address,
      neighbourhood: neighbourhood,
      imgURLs: imgUrlsAndPath.map((urlAndPath) => urlAndPath.url),
    } as any;

    let existingMural = mural && Object.keys(mural);
    if (existingMural) payload.id = mural.id;

    /**
     * An axios request to add a new mural to AWS database
     * Depending on whether the mural exists already
     * we either update or add a new mural.
     */
    axios({
      method: existingMural ? "put" : "post",
      url: existingMural
        ? `${CREATE_MURAL_API}/${payload.id}`
        : CREATE_MURAL_API,
      data: payload,
      headers: {
        authorization: userContext.token,
      },
    }).then(
      (response) => {
        console.log(response);
        setPopup(true);
        let context = userContext as any;
        context.getMural();
        setTimeout(() => setPopup(false), 5000);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  function handleAddressUpdate(
    coords: number[],
    address: string,
    neighbourhood: string
  ) {
    setAddressCoords(coords);
    setAddress(address);
    setNeighbourhood(neighbourhood);
  }

  function handleImgUrlAdd(urlToAdd: string, pathToAdd: string) {
    setImgUrlsAndPath([
      ...imgUrlsAndPath,
      {
        url: urlToAdd,
        path: pathToAdd,
      },
    ]);
  }

  function handleImgUrlRemove(pathToRemove: string) {
    var urlsAndPaths = [...imgUrlsAndPath];
    const newUrlsAndPaths = urlsAndPaths.filter(
      (urlAndPath) => pathToRemove !== urlAndPath.path
    );
    setImgUrlsAndPath(newUrlsAndPaths);
  }

  /**
   * Extract the Firebase-friendly path from a URL
   * @param url download URL of mural image from Firebase Storage
   */
  function pathFromUrl(url: string) {
    let substrings = url.split("/");
    if (substrings.length < 1) return;
    let path = substrings[substrings.length - 1].split("?")[0];
    path = path.replaceAll("%20", " ");
    path = path.replaceAll("%2F", "/");
    return path;
  }

  function directionsButton() {
    if (isGeoOn) {
      return (
        <Button
          color="primary"
          size="medium"
          variant="outlined"
          disableElevation
          className={styles.directionButton}
          onClick={() => setDirectionOpen(true)}
        >
          Directions
        </Button>
      );
    }
    return null;
  }

  function copyLink() {
    try {
      const dummy = document.createElement("p");
      dummy.textContent = window.location.href;
      document.body.appendChild(dummy);

      const range = document.createRange();
      range.setStartBefore(dummy);
      range.setEndAfter(dummy);

      const selection = window.getSelection();
      // First clear, in case the user already selected some other text
      if (selection != null) {
        selection.removeAllRanges();
        selection.addRange(range);
      }

      document.execCommand("copy");
      document.body.removeChild(dummy);
    } catch (error) {
      console.error(error);
      return;
    }

    // Indicate success to the user
    setLinkCopied(true);
    setTimeout(() => {
      setLinkCopied(false);
    }, 2000);
  }

  function shareableLink() {
    return (
      <Button
        color="default"
        size="medium"
        variant="outlined"
        disableElevation
        className={styles.directionButton}
        onClick={copyLink}
      >
        <ShareIcon></ShareIcon>
        <span>{linkCopied ? "Copied!" : "Copy Link"}</span>
      </Button>
    );
  }

  return (
    <div>
      <form noValidate autoComplete="off">
        <div className={styles.flexContainer}>
          <InputBase
            className={`${styles.name} ${styles.element}`}
            required={true}
            placeholder="Name the mural"
            id="name"
            defaultValue={mural?.name}
            disabled={!isAdmin}
            inputProps={{ "aria-label": "naked" }}
            onChange={(e: any) => setName(e.target.value)}
            onClick={() => setEditingName(true)}
            onBlur={() => setEditingName(false)}
            onMouseEnter={() => setHoveringName(true)}
            onMouseLeave={() => setHoveringName(false)}
            endAdornment={
              !editingName &&
              isAdmin && (
                <InputAdornment position="start">
                  <EditIcon color={hoveringName ? "primary" : "action"} />
                </InputAdornment>
              )
            }
          />
          <InputBase
            className={styles.element}
            multiline
            rows={4}
            id="description"
            defaultValue={mural?.description}
            placeholder="Add a description"
            disabled={!isAdmin}
            inputProps={{ "aria-label": "naked" }}
            onChange={(e: any) => setDescription(e.target.value)}
            onClick={() => setEditingDesc(true)}
            onBlur={() => setEditingDesc(false)}
            onMouseEnter={() => setHoveringDesc(true)}
            onMouseLeave={() => setHoveringDesc(false)}
            endAdornment={
              !editingDesc &&
              isAdmin && (
                <InputAdornment position="start">
                  <EditIcon color={hoveringDesc ? "primary" : "action"} />
                </InputAdornment>
              )
            }
          />
          <Typography variant="caption" display="block" color="textSecondary">
            Year
          </Typography>
          <InputBase
            required
            id="year"
            type="number"
            defaultValue={mural?.year}
            disabled={!isAdmin}
            inputProps={{ "aria-label": "naked" }}
            onChange={(e: any) => setYear(e.target.value)}
          />
          <AddressSearch
            defaultAddress={mural?.address}
            callback={handleAddressUpdate}
          />
          <ArtistBoroughSearch
            defaultSelection={mural?.artistId}
            callback={(artistId: number | null) => setArtist(artistId)}
            endpoint={GET_ALL_ARTISTS_API}
            label="Artist"
            placeHolder="Who made it?"
          />
          <ArtistBoroughSearch
            defaultSelection={mural?.boroughId}
            callback={(boroughId: number | null) => setBorough(boroughId)}
            endpoint={GET_ALL_BOROUGH_API}
            label="Borough"
            placeHolder="Choose a borough"
          />
          <MultiAdd
            title={"Assistants"}
            placeholder={"Add assistants..."}
            defaultItems={mural?.assistants}
            callback={(newAssistants: string[]) => setAssistants(newAssistants)}
          />
          <MultiAdd
            title={"Partners"}
            placeholder={"Add partners..."}
            defaultItems={mural?.partners}
            callback={(newPartners: string[]) => setPartners(newPartners)}
          />
          <MultiAdd
            title={"Social Media"}
            placeholder={"Add social media..."}
            defaultItems={mural?.socialMediaURLs}
            callback={(newSocialMedia: string[]) =>
              setSocialMedia(newSocialMedia)
            }
          />
          <Typography variant="body1" display="block" color="textSecondary">
            Gallery
          </Typography>
          <ImageUpload
            uploadHandler={handleImgUrlAdd}
            removeHandler={handleImgUrlRemove}
            imgsUrlAndPath={imgUrlsAndPath}
          />
          {directionsButton()}
          {shareableLink()}
        </div>
      </form>
      <Directions
        open={directionOpen}
        handleClose={() => setDirectionOpen(false)}
        coordinates={[currentPos, addressCoords]}
        wpNames={[name]}
        wpPics={imgUrlsAndPath[0] ? [imgUrlsAndPath[0].url] : [""]} // use the first image to display
      />
      <ActionButtons saveCallback={submitForm} cancelCallback={handleCancel} />
      <Snackbar open={popup} autoHideDuration={6000}>
        <Alert severity="success">Mural published successfully!</Alert>
      </Snackbar>
    </div>
  );
}

export default MuralForm;
