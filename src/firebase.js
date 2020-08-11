import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCl6_kBnbukfMvgYPFRHhrypQmN5oF_odw",
  authDomain: "my-insta-17f9a.firebaseapp.com",
  databaseURL: "https://my-insta-17f9a.firebaseio.com",
  projectId: "my-insta-17f9a",
  storageBucket: "my-insta-17f9a.appspot.com",
  messagingSenderId: "1091366572841",
  appId: "1:1091366572841:web:7847aa63cc735c8e13dd38",
  measurementId: "G-TF6CMT4PRF",
});

const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
