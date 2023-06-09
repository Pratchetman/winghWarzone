import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyCChGUPhV69RIdz78zns6b7EVk6Dq-Zvvc",
    authDomain: "wingh-eb474.firebaseapp.com",
    databaseURL: "https://wingh-eb474-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "wingh-eb474",
    storageBucket: "wingh-eb474.appspot.com",
    messagingSenderId: "120692076021",
    appId: "1:120692076021:web:396b11b1a960b65c3d44bc"
  }

export const app = initializeApp(firebaseConfig);