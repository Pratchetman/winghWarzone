import React from "react";
import { Countdown } from "./Countdown";
import "./countdown.scss";
export const CompleteCountdown = ({ DATE_TARGET }) => {
  return (
    <div className="countdown">
      
        <div className="logoCounter">
        <img src="/images/logoSM.png" />
      <Countdown DATE_TARGET={DATE_TARGET} />
        </div>
     
   
    </div>
  );
};
