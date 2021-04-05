import admin from "firebase-admin";

export const FBAuth = admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: "gs://mu-auth.appspot.com",
});
