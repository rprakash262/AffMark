import firebase from 'firebase/app';
import 'firebase/storage';

const config = {
  apiKey: "AIzaSyDKB6mjn7z3pLZTXEIb-i_PJy7tdoaWVqQ",
  authDomain: "file-upload-b365e.firebaseapp.com",
  projectId: "file-upload-b365e",
  storageBucket: "file-upload-b365e.appspot.com",
  messagingSenderId: "384613511337",
  appId: "1:384613511337:web:1b44111cb94c3f11a979b8",
  measurementId: "G-QRBK3PMSKJ"
};

firebase.initializeApp(config);

let storage = firebase.storage();

export {
  storage, firebase as default
};