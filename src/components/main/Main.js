import React, { useContext } from "react";

import "./main.scss";
import { useNavigate } from "react-router-dom";
import { WinghavenContext } from "../../context/WinghavenContext";

export const Main = () => {
  const navigate = useNavigate();
  const {logged} = useContext(WinghavenContext)

  console.log(logged)

  return (
    <div className="principalMain">
      <h3>Selecciona Juego</h3>
      <hr />
      <div className="flexJuegos">
      <div onClick={()=>{navigate("/wz2")}} className="marcoJuego">
          <img src="https://cdn1.epicgames.com/spt-assets/5e13bf477ca8474e9bd01ae88d6710e7/delta-force-17piz.jpg" alt="" />
        </div>
        <div onClick={()=>{navigate("/wz1")}} className="marcoJuego">
          <img src="https://www.callofduty.com/content/dam/atvi/callofduty/cod-touchui/store/games/wz/overview/bo6-season-1/COD-Store_PDP-WZ_Hero_01.webp" alt="" />
        </div>
       
      </div>
      
    </div>
  );
};
