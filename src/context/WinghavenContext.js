import React, { createContext, useState } from 'react'

export const WinghavenContext = createContext();

export const WinghavenProvider = (props) => {
  const [user, setUser] = useState({});
  const [logged, setLogged] = useState(false);
  const [token, setToken] = useState();

  
  return (
    <WinghavenContext.Provider>
        {props.children}
    </WinghavenContext.Provider> 
  )
}
