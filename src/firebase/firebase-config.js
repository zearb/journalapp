import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDxz0iP8X8jlRge2WiYPhBatGyDRQ4vBqk",
    authDomain: "practice-react-cb7c0.firebaseapp.com",
    databaseURL: "https://practice-react-cb7c0.firebaseio.com",
    projectId: "practice-react-cb7c0",
    storageBucket: "practice-react-cb7c0.appspot.com",
    messagingSenderId: "135763344706",
    appId: "1:135763344706:web:a5dde0eeb32a5d6cb7dcdb"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export {
    db,
    googleAuthProvider,
    firebase
}