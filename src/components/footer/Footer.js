import React from "react";
import "./footer.scss";

export const Footer = () => {
  return (
    <div className="principalFooter">
      <div className="footRrss">
        <a href="https://www.youtube.com/c/WinghavenIsTheMan" target="_blank"><img src="../images/rrss/yt.png" alt="" /></a>
        <a href="https://www.twitch.tv/winghaven" target="_blank"><img src="../images/rrss/tw.png" alt="" /></a>
        <a href="https://www.instagram.com/winghaven/?hl=es" target="_blank"><img src="../images/rrss/in.png" alt="" /></a>
      </div>
      <p>Realizado por Pratchett &copy; ✌️ {new Date().getFullYear()}.</p>
    </div>
  );
};
