import React, { createContext } from 'react'

export const WinghavenContext = createContext();

export const WinghavenProvider = (props) => {
  return (
    <WinghavenContext.Provider>
        {props.children}
    </WinghavenContext.Provider> 
  )
}
