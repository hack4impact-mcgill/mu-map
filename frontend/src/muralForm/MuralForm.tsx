import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import AddressSearch from "../AddressSearch/addressSearch";
import MultiAdd from "../multiAdd/MultiAdd";
import ArtistSearchBar from "../ArtistSearch/ArtistSearch";
import BoroughSearchBar from "../BoroughSearch/BoroughSearch";
import Button from "@material-ui/core/Button";
import axios from "axios";
import { CREATE_MURAL_API } from "../constants/constants";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    flexContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    element: {
      margin: theme.spacing(1),
      width: "195px",
    },
    bottomButton: {
      fontWeight: 500,
    },
    bottomButtonContainer: {
      display: "flex",
      justifyContent: "space-between",
    },
  })
);

interface IMuralFormProps {}

function MuralForm(props: IMuralFormProps) {
  const styles = useStyles();
  const [name, setName] = useState<string>("");
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [assistants, setAssistants] = useState<string[]>([]);
  const [socialMedia, setSocialMedia] = useState<string[]>([]);
  const [artist, setArtist] = useState<number | null>(null);
  const [borough, setBorough] = useState<number | null>(null);
  const [addressCoords, setAddressCoords] = useState<number[]>([]);
  const [description, setDescription] = useState<string>("");
  const [neighbourhood, setNeighbourhood] = useState<string>("");
  const [address, setAddress] = useState<string>("");

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
        <TextField
          className={styles.element}
          required={true}
          id="name"
          label="Name"
          variant="filled"
          size="small"
          onChange={(e: any) => setName(e.target.value)}
        />
        <TextField
          className={styles.element}
          required
          id="year"
          label="Year"
          type="number"
          defaultValue={year}
          variant="filled"
          size="small"
          onChange={(e: any) => setYear(e.target.value)}
        />
        <ArtistSearchBar
          callback={(artistId: number | null) => setArtist(artistId)}
        />
        <AddressSearch callback={handleAddressUpdate} />
        <BoroughSearchBar
          callback={(boroughId: number | null) => setBorough(boroughId)}
        />
        <TextField
          className={styles.element}
          multiline
          rows={4}
          id="description"
          label="Description"
          placeholder="No Description"
          variant="filled"
          size="small"
          onChange={(e: any) => setDescription(e.target.value)}
        />
        <MultiAdd
          title={"Assistants"}
          placeholder={"Add Assistants..."}
          callback={(newAssistants: string[]) => setAssistants(newAssistants)}
        />
        <MultiAdd
          title={"Social Media"}
          placeholder={"Add Social Media..."}
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
