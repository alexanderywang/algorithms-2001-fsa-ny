import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCMSBzV7GmhUVNR_rKZeR1ib7ASO8kmVpg",
  authDomain: "algorithms-2001-fsa-ny.firebaseapp.com",
  databaseURL: "https://algorithms-2001-fsa-ny.firebaseio.com",
  projectId: "algorithms-2001-fsa-ny",
  storageBucket: "algorithms-2001-fsa-ny.appspot.com",
  messagingSenderId: "1091457414575",
  appId: "1:1091457414575:web:ad50f4bb0c5713c8f2eb5a",
  measurementId: "G-KCSP55B2GQ"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const firestore = firebase.firestore();
const db = firebase.firestore();

export { firebase, db, firestore, auth };
