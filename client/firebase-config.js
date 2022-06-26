import firebase from 'firebase/app';
import 'firebase/storage';

const config = {
  apiKey: "AIzaSyAdv196_At_DjAaK7KlIklVbWPZbI8HC28",
  authDomain: "fileupload-5e302.firebaseapp.com",
  projectId: "fileupload-5e302",
  storageBucket: "fileupload-5e302.appspot.com",
  messagingSenderId: "65343851735",
  appId: "1:65343851735:web:7933dec51cf61c3d4cf492",
  measurementId: "G-S92MGGRLTW"
};

firebase.initializeApp(config);

let analytics = firebase.analytics();
let storage = firebase.storage();

export {
  storage, analytics, firebase as default
};