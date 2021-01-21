import firebase from "firebase/app"
import "firebase/auth"

const config = {
    apiKey: "AIzaSyBLFwchilVz7sSTFIyGiVhPz5LrDgvGMNA",
    authDomain: "mu-auth.firebaseapp.com",
    projectId: "mu-auth",
    appId: "mu-auth",
};

firebase.initializeApp(config)

const firebaseAuth = firebase.auth()
firebaseAuth.setPersistence(firebase.auth.Auth.Persistence.NONE)

export default firebaseAuth
