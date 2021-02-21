import React from "react";
import { Button } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { FirebaseStorage } from "../firebase/index";
import "firebase/storage";
import firebase from "firebase/app";
import HighlightOffOutlinedIcon from '@material-ui/icons/HighlightOffOutlined';
const useStyles = makeStyles((Theme: Theme) =>
  createStyles({
    imageUpload: {
      zIndex: 1,
    },
  })
);

interface IImageUpload {
    uploadHandler: (url: string) => void,
    removeHandler: (url: string) => void,
    imgUrls: string[]

}

function ImageUpload({uploadHandler, removeHandler, imgUrls}: IImageUpload) {
  const styles = useStyles();

  function handleUpload(event: any) {
    const image = event.target.files[0];
    console.log(image)
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
          uploadHandler(downloadURL)
        });
      }
    );
  }

  return (
    <div className={styles.imageUpload}>
      <Button variant="contained" component="label">
        Upload File
        <input type="file" hidden onChange={handleUpload} accept="image/*" />
      </Button>
      {imgUrls.map(url => {
        return <div>
          <HighlightOffOutlinedIcon></HighlightOffOutlinedIcon>
          <img alt="mural" key={url} src={url}></img>
        </div>
      })}
    </div>
  );
}

export default ImageUpload;
