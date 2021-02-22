import React, { useEffect, useState } from "react";
import { InputBase, InputAdornment, Typography, Snackbar } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import AddressSearch from "../AddressSearch/addressSearch";
import MultiAdd from "../multiAdd/MultiAdd";
import ArtistSearchBar from "../ArtistSearch/ArtistSearch";
import BoroughSearchBar from "../BoroughSearch/BoroughSearch";
import ActionButtons from "../ActionButtons/ActionButtons";
import EditIcon from "@material-ui/icons/Edit";
import axios from "axios";
import { CREATE_MURAL_API } from "../constants/constants";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    flexContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "start",
      width: "40vw",
      maxWidth: "500px",
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
  })
);

interface IMuralFormProps {
  mural?: any;
  handleCancel: () => void;
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

  const [editingName, setEditingName] = useState<boolean>(false);
  const [hoveringName, setHoveringName] = useState<boolean>(false);

  const [editingDesc, setEditingDesc] = useState<boolean>(false);
  const [hoveringDesc, setHoveringDesc] = useState<boolean>(false);

  const [popup, setPopup] = useState<boolean>(false);

  useEffect(() => {
    if (!mural || !Object.keys(mural)) return;
    setName(mural.name);
    setDescription(mural.description);
    setYear(mural.year);
    setAddress(mural.address);
    setAddressCoords(mural.coordinates.coordinates);
    setBorough(mural.borough);
    setNeighbourhood(mural.neighbourhood);
    setAssistants(mural.assistants);
    setSocialMedia(mural.socialMediaURLs);
    setPartners(mural.partners);
    setArtist(mural.artistId);
  }, [mural])

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
    axios
      .post(CREATE_MURAL_API, {
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
      })
      .then(
        (response) => {
          console.log(response);
          setPopup(true);
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
            inputProps={{ "aria-label": "naked" }}
            onChange={(e: any) => setName(e.target.value)}
            onClick={() => setEditingName(true)}
            onBlur={() => setEditingName(false)}
            onMouseEnter={() => setHoveringName(true)}
            onMouseLeave={() => setHoveringName(false)}
            endAdornment={
              !editingName && (
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
            inputProps={{ "aria-label": "naked" }}
            onChange={(e: any) => setDescription(e.target.value)}
            onClick={() => setEditingDesc(true)}
            onBlur={() => setEditingDesc(false)}
            onMouseEnter={() => setHoveringDesc(true)}
            onMouseLeave={() => setHoveringDesc(false)}
            endAdornment={
              !editingDesc && (
                <InputAdornment position="start">
                  <EditIcon color={hoveringDesc ? "primary" : "action"} />
                </InputAdornment>
              )
            }
          />
          <Typography variant="body1" display="block" color="textSecondary">
            Year
          </Typography>
          <InputBase
            required
            id="year"
            type="number"
            defaultValue={mural?.year}
            inputProps={{ "aria-label": "naked" }}
            onChange={(e: any) => setYear(e.target.value)}
          />
          <AddressSearch
            defaultAddress={mural?.address}
            callback={handleAddressUpdate}
          />
          <BoroughSearchBar
            defaultBorough={mural?.boroughId}
            callback={(boroughId: number | null) => setBorough(boroughId)}
          />
          <ArtistSearchBar
            defaultArtist={mural?.artistId}
            callback={(artistId: number | null) => setArtist(artistId)}
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
        </div>
      </form>
      <ActionButtons saveCallback={submitForm} cancelCallback={handleCancel} />
      <Snackbar open={popup} autoHideDuration={6000}>
        <Alert severity="success">
          Mural published successfully!
        </Alert>
      </Snackbar>
    </div>
  );
}

export default MuralForm;
