import React from "react";

import "./main.scss";
import { useNavigate } from "react-router-dom";

export const Main = () => {
  const navigate = useNavigate();


  return (
    <div className="principalMain">
      <h3>Selecciona Juego</h3>
      <hr />
      <div className="flexJuegos">
      <div onClick={()=>navigate("/wz2")} className="marcoJuego">
          <img src="https://mywarzonelegacy.callofduty.com/content/dam/atvi/callofduty/cod-touchui/blog/body/mwii/MWII-SEASON-01-ROADMAP-002.jpg" alt="" />
        </div>
        <div onClick={()=>navigate("/wz1")} className="marcoJuego">
          <img src="https://files.lafm.com.co/assets/public/2020-03/cod-war-zone_0.jpg" alt="" />
        </div>
       
      </div>
    </div>
  );
};
