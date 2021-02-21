import React from "react";
import { Button, IconButton } from "@material-ui/core";
import { makeStyles, createStyles, Theme, useTheme } from "@material-ui/core/styles";
import { FirebaseStorage } from "../firebase/index";
import "firebase/storage";
import firebase from "firebase/app";
import HighlightOffOutlinedIcon from '@material-ui/icons/HighlightOffOutlined';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    imageUpload: {
      zIndex: 1,
      width: '100%'
    },
    imageCard: {
      width: '35%',
      height: '20%',

      '& img': {
        width: '100%',
        height: '100%'
      },
      '& button': {
        width: '10%',
        height: '10%',
        position: 'absolute',
        top: theme.spacing(0),
        right: theme.spacing(0)
      }
    }
  })
);

interface Image {
  url: string,
  path: string
}

interface IImageUpload {
    uploadHandler: (url: string, path: string) => void,
    removeHandler: (path: string) => void,
    imgsUrlAndPath: Image[]

}

function ImageUpload({uploadHandler, removeHandler, imgsUrlAndPath}: IImageUpload) {
  const styles = useStyles();
  const theme = useTheme();
  function handleUpload(event: any) {
    const image = event.target.files[0];
    if(image.size > 30 * 1024 * 1024) {  // 30 MB
      alert("File is too big!")
      return;
    }
    const uploadTask = FirebaseStorage.ref().child(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
          //progress function
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
              console.log('Upload is paused');
              break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
              console.log('Upload is running');
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
          uploadHandler(downloadURL, `images/${image.name}`)
        });
      }
    );
  }

  function handleRemove(path: string) {
    var desertRef = FirebaseStorage.ref().child(path);
    desertRef.delete().then(() => {
      removeHandler(path)
    }).catch((error) => {
      console.log(error)
    });
  }

  return (
    <div className={styles.imageUpload}>
      <Button variant="contained" component="label">
        Upload File
        <input type="file" hidden onChange={handleUpload} accept="image/*" />
      </Button>
      {imgsUrlAndPath.map(urlAndPath => {
        return <div className={styles.imageCard}>
          <IconButton key={urlAndPath.url+'_'} onClick={() => handleRemove(urlAndPath.path)}>
            <HighlightOffOutlinedIcon></HighlightOffOutlinedIcon>
          </IconButton>
          <img alt="mural" key={urlAndPath.url} src={urlAndPath.url}></img>
        </div>
      })}
    </div>
  );
}

export default ImageUpload;