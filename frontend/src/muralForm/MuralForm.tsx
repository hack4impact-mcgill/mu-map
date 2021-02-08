import React, { useState } from "react";
import { InputBase, InputAdornment, Typography } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import AddressSearch from "../AddressSearch/addressSearch";
import MultiAdd from "../multiAdd/MultiAdd";
import ArtistSearchBar from "../ArtistSearch/ArtistSearch";
import BoroughSearchBar from "../BoroughSearch/BoroughSearch";
import Button from "@material-ui/core/Button";
import EditIcon from "@material-ui/icons/Edit";
import axios from "axios";
import { CREATE_MURAL_API } from "../constants/constants";

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

interface IMuralFormProps { }

function MuralForm(props: IMuralFormProps) {

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
        partners: assistants,
        description: description,
        socialMedia: socialMedia,
        address: address,
        neighbourhood: neighbourhood,
      })
      .then(
        (response) => {
          //TODO notify success and clear form.
          console.log(response);
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
    <form noValidate autoComplete="off">
      <div className={styles.flexContainer}>
        <InputBase
          className={`${styles.name} ${styles.element}`}
          required={true}
          placeholder="Name the mural"
          id="name"
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
          defaultValue={year}
          inputProps={{ "aria-label": "naked" }}
          onChange={(e: any) => setYear(e.target.value)}
        />
        <AddressSearch callback={handleAddressUpdate} />
        <BoroughSearchBar
          callback={(boroughId: number | null) => setBorough(boroughId)}
        />
        <ArtistSearchBar
          callback={(artistId: number | null) => setArtist(artistId)}
        />
        <MultiAdd // TODO not sure how to make these borderless
          title={"Assistants"}
          placeholder={"Add assistants..."}
          callback={(newAssistants: string[]) => setAssistants(newAssistants)}
        />
        <MultiAdd
          title={"Partners"}
          placeholder={"Add partners..."}
          callback={(newPartners: string[]) => setPartners(newPartners)}
        />
        <MultiAdd
          title={"Social Media"}
          placeholder={"Add social media..."}
          callback={(newSocialMedia: string[]) =>
            setSocialMedia(newSocialMedia)
          }
        />
        <div className={styles.bottomButtonContainer}>
          <Button color="primary" size="small" className={styles.bottomButton}>
            Cancel
          </Button>
          <Button color="primary" size="small" onClick={submitForm}>
            Save
          </Button>
        </div>
      </div>
    </form>
  );
}

export default MuralForm;
