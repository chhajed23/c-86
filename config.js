import firebase from 'firebase';
require("@firebase/firestore");

 // Your web app's Firebase configuration
 var firebaseConfig = {
    apiKey: "AIzaSyA6mihbxZ2qZsKqHE6vpb0EAAbzY9ETkFU",
    authDomain: "book-santa-b7de5.firebaseapp.com",
    projectId: "book-santa-b7de5",
    storageBucket: "book-santa-b7de5.appspot.com",
    messagingSenderId: "303431165371",
    appId: "1:303431165371:web:39cf7db167a7663a70509e"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

export default firebase.firestore();