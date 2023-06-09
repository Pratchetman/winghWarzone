import React, { useEffect, useState } from 'react'

import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get, child } from "firebase/database";

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const {REACT_APP_DATABASE_URL} = process.env;

const firebaseConfig = {
  apiKey: "AIzaSyCChGUPhV69RIdz78zns6b7EVk6Dq-Zvvc",
  authDomain: "wingh-eb474.firebaseapp.com",
  databaseURL: "https://wingh-eb474-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "wingh-eb474",
  storageBucket: "wingh-eb474.appspot.com",
  messagingSenderId: "120692076021",
  appId: "1:120692076021:web:396b11b1a960b65c3d44bc"
}

const info = {
  culata: "culata buena",
  acople: "acople con fiso",
  empu: "empuñadora del copon",
  mira: "mira x4",
  type: "ametralladora",
  bocacha: "silenciador",
  municion: "muchisima!",
  name: "m4",
  barrel: "cañonaco",
  urlImage : "aun no hay enlace"
}



const app = initializeApp(firebaseConfig);

export const Ag = () => {
const [weapons, setWeapons] = useState()

console.log(info.culata);

useEffect(() => {
  const dbRef = ref(getDatabase());
  get(child(dbRef, `wz1/`)).then((snapshot) => {
    if (snapshot.exists()) {
      setWeapons(Object.values(snapshot.val()));
    } else {
      console.log("No data available");
    }
  }).catch((error) => {
    console.error(error);
  });
  
}, [])

const handleSubmit = () =>{
  const id = 10;
  const db = getDatabase();
  set(ref(db, 'wz1/' + id), {
    culata: info.culata,
    acople: info.acople,
    empu: info.empu,
    mira: info.mira,
    type: info.type,
    bocacha: info.bocacha,
    municion: info.municion,
    name: info.name,
    barrel: info.barrel,
    urlImage : info.urlImage
  });
}
  
console.log(weapons);

  return (
    <div>
   {weapons && weapons.map ((elem, index) =>{
    return (
    <>
    <h1>{elem.name}</h1>
    <h3>Acople: {elem.acople}</h3>
    </>
    )
   })}
   
   <button onClick={handleSubmit}>Añadir</button>
    </div>
  )
}
