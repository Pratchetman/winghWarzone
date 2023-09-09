import React from "react";

import "./error.scss";
import { useState } from "react";

export const Error = () => {
  const [num, setNum] = useState(0);




  return (
    <div className="error">
        <img src="/images/logoSM.png"/>
      
      <h1>Ups!!, esta página no existe!!.</h1>
    </div>
  );
};
