import React from "react";
import "./about.scss";

export const About = () => {
  return (
    <div className="principalAbout">
      <section>
        <div className="marcoImagen">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/wingh-eb474.appspot.com/o/aboutWeb.png?alt=media&token=5799f4eb-740f-4f83-bec7-d10af76f3763&_gl=1*82qzpz*_ga*MTkxNDI5MzA0NS4xNjg1MjEzNDAx*_ga_CW55HF8NVT*MTY4NjA2NDM5Ny4xMS4xLjE2ODYwNjYyOTEuMC4wLjA."
            alt=""
          />
        </div>
        <div className="text1">
          <img src="images/logoSM.png" alt="" />
          <h3>Sobre mi</h3>
          <p>Nací un 21 de agosto de 1987 en Barcelona aunque vivo en Valencia, y llevo jugando a videojuegos más de 20 años. Empecé siendo campeón de Europa en 2 ocasiones en Enemy territory, en eventos presenciales en Holanda.</p>
        </div>
      </section>
    </div>
  );
};
