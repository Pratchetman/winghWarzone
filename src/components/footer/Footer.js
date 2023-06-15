import React from "react";
import "./footer.scss";

export const Footer = () => {
  return (
    <div className="principalFooter">
      <div className="footRrss">
        <a href=""><img src="./images/rrss/yt.png" alt="" /></a>
        <a href=""><img src="./images/rrss/tw.png" alt="" /></a>
        <a href=""><img src="./images/rrss/in.png" alt="" /></a>
      </div>
      <p>Realizado por Pratchett &copy; ✌️ {new Date().getFullYear()}.</p>
    </div>
  );
};
