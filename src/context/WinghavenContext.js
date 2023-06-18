import React, { createContext, useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged  } from "firebase/auth";


export const WinghavenContext = createContext();

export const WinghavenProvider = (props) => {
  const [user, setUser] = useState({});
  const [logged, setLogged] = useState(false);
  const [token, setToken] = useState();

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (usr) => {
      if (usr) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        setUser(usr.uid);
        setLogged(true);
        console.log(usr.uid);
        // ...
      } else {
        // User is signed out
        // ...
      }
    });
  }, [logged]);
  
  return (
    <WinghavenContext.Provider value={{logged, setLogged, setUser, user, setToken}}>
        {props.children}
    </WinghavenContext.Provider> 
  )
}
