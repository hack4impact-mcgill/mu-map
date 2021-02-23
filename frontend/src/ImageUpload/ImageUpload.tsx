import React from "react";
import { Button, IconButton } from "@material-ui/core";
import {
  makeStyles,
  createStyles,
  Theme,
} from "@material-ui/core/styles";
import { FirebaseStorage } from "../firebase/index";
import "firebase/storage";
import firebase from "firebase/app";
import HighlightOffOutlinedIcon from "@material-ui/icons/HighlightOffOutlined";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%'
    },
    imageContainer: {
      display: 'flex',
      flexDirection: "row",
      width: '100%',
      flexWrap: "wrap"
    },
    imageCard: {
      display: 'flex',
      width: '45%',
      height: "30%",
      flexDirection: "row-reverse",
      position: 'relative',
      margin: "0 auto",
      padding: "5px"
    },
    uploadButton: {
      width: '100%',
      margin: '15px auto'
    },
    muralImage: {
      borderRadius: '10px',
      width: '100%',
      height: '120px'
    },
    deleteButton: {
      position: 'absolute',
      padding: theme.spacing(1)
    }
  })
);

interface Image {
  url: string;
  path: string;
}

interface IImageUpload {
  uploadHandler: (url: string, path: string) => void;
  removeHandler: (path: string) => void;
  imgsUrlAndPath: Image[];
}

function ImageUpload({
  uploadHandler,
  removeHandler,
  imgsUrlAndPath,
}: IImageUpload) {
  const styles = useStyles();
  function handleUpload(event: any) {
    const image = event.target.files[0];
    if (image) {
      if (image.size > 30 * 1024 * 1024) {
        // 30 MB
        alert("File is too big!");
        return;
      }
      const uploadTask = FirebaseStorage.ref()
        .child(`images/${image.name}`)
        .put(image);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          //progress function
          var progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
              console.log("Upload is paused");
              break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          // Handle successful uploads on complete
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            console.log("File available at", downloadURL);
            uploadHandler(downloadURL, `images/${image.name}`);
          });
        }
      );
    }
  }

  function handleRemove(path: string) {
    var desertRef = FirebaseStorage.ref().child(path);
    desertRef
      .delete()
      .then(() => {
        removeHandler(path);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function dummyImage(imgsUrlAndPath: Image[]) {
    if (imgsUrlAndPath.length % 2 === 1) {
      return (
        <div className={styles.imageCard}>
          </div>
      )
    }
  }

  return (
    <div className={styles.root}>

      <Button variant="contained" component="label" className={styles.uploadButton}>
        Upload Mural Picture
        <input type="file" hidden onChange={handleUpload} accept="image/*" />
      </Button>
      <div className={styles.imageContainer}>
      {imgsUrlAndPath.map((urlAndPath) => {
        return (
          <div className={styles.imageCard}>
              <IconButton
              key={urlAndPath.url + "_"}
              onClick={() => handleRemove(urlAndPath.path)}
              className={styles.deleteButton}
            >
              <HighlightOffOutlinedIcon color="secondary" />
            </IconButton>
            <img
              alt="mural"
              className={styles.muralImage}
              key={urlAndPath.url}
              src={urlAndPath.url}
            ></img>
          </div>
        );
      })}
      {dummyImage(imgsUrlAndPath)}
      </div>
    </div>
  );
}

export default ImageUpload;
