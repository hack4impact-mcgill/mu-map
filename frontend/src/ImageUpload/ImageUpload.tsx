import React, { useContext, useEffect, useState } from "react";
import { Button, IconButton } from "@material-ui/core";
import {
  makeStyles,
  createStyles,
  Theme,
} from "@material-ui/core/styles";
import { FirebaseStorage } from "../firebase/index";
import "firebase/storage";
import firebase from "firebase/app";
import ClearIcon from "@material-ui/icons/Clear";
import PublishIcon from '@material-ui/icons/Publish';
import Context from "context";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%'
    },
    imageContainer: {
      display: 'flex',
      flexDirection: "row",
      width: '100%',
      flexWrap: "wrap",
      justifyContent: "space-between",
      marginBottom: theme.spacing(3)
    },
    imageCard: {
      display: 'flex',
      width: '48%',
      height: "30%",
      flexDirection: "row-reverse",
      position: 'relative',
      padding: theme.spacing(1, 0, 1, 0)
    },
    uploadButton: {
      margin: theme.spacing(1, 0, 1, 0),
      width:"48%"
    },
    muralImage: {
      borderRadius: '4px',
      width: '100%',
      height: '120px',
      objectFit: 'cover'
    },
    deleteButton: {
      position: 'absolute',
      margin: theme.spacing(1, 1, 0, 0),
      backgroundColor: "#00000080"
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

  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  
  /**
   * Enable image deletion for admin users
   */
  const userContext = useContext(Context)
  useEffect(() => setIsAdmin(!!(userContext as any).user), [userContext]);

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
        <div className={styles.imageCard} />
      )
    }
  }

  /**
   * Loop over the mural's images and create image components
   * If the user is an admin, show a remove button
   */
  const uploadedImages = imgsUrlAndPath.map(
    (urlAndPath: any) => {
      const storage = firebase.storage();

      let source = "";
      storage.ref(urlAndPath.path).getDownloadURL()
        .then((url) => {
          source = url;
          console.log(source);
          return (
            <div
              className={styles.imageCard}
              key={urlAndPath.path + "_"}
            >
              {console.log(source)}
              <img
                alt="mural"
                className={styles.muralImage}
                key={urlAndPath.path}
                src={source}
                />
              {
                isAdmin &&
                <IconButton
                  size="small"
                  onClick={() => handleRemove(source)}
                  className={styles.deleteButton}
                >
                  <ClearIcon style={{color:"#fff"}} />
                </IconButton>
              }
            </div>
        )
      
    })
    .catch((e) => {
      console.log(e)
      return null
    } )
  })

  return (
    <div className={styles.imageContainer}>
      {
        isAdmin &&
        <Button
          variant="contained"
          component="label"
          disableElevation
          className={styles.uploadButton}
          startIcon={<PublishIcon />}
        >
          Upload Image
          <input type="file" hidden onChange={handleUpload} accept="image/*" />
        </Button>
      }
      {console.log(uploadedImages)}
      {uploadedImages}
      {dummyImage(imgsUrlAndPath)}
    </div>
  );
}

export default ImageUpload;
