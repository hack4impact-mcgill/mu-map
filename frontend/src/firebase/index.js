import firebase from "firebase/app"
import "firebase/auth"
import 'firebase/storage';

const config = {
    apiKey: "AIzaSyBLFwchilVz7sSTFIyGiVhPz5LrDgvGMNA",
    authDomain: "mu-auth.firebaseapp.com",
    projectId: "mu-auth",
    appId: "mu-auth",
    storageBucket: "gs://mu-auth.appspot.com"
};

firebase.initializeApp(config)

const FirebaseAuth = firebase.auth()
FirebaseAuth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)

const FirebaseStorage = firebase.storage()

export {
    FirebaseStorage
}
export default FirebaseAuth
