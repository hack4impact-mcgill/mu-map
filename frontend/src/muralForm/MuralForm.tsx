import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import AddressSearch from "../AddressSearch/addressSearch";
import MultiAdd from "../multiAdd/MultiAdd";
import ArtistSearchBar from "../ArtistSearch/ArtistSearch";
import BoroughSearchBar from "../BoroughSearch/BoroughSearch";

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
  //todo: delete these logs once we actually use the state
  console.log("name", name);
  console.log("assistants", assistants);
  console.log("socialmedia", socialMedia);
  console.log("artist", artist);
  console.log("borough", borough);
  console.log("address", addressCoords);
  console.log("description", description);
  console.log("year", year);

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
        <AddressSearch
          callback={(coords: number[]) => setAddressCoords(coords)}
        />
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
      </div>
    </form>
  );
}

export default MuralForm;
