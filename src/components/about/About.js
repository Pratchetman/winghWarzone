import React, { useState } from "react";
import "./about.scss";
import { Login } from "../auth/Login";

export const About = () => {
  const [show, setShow] = useState(false);
  console.log(show)

  return (
    <div className="principalAbout">
      <section>
        <div className="marcoImagen">
          <img onDoubleClick={()=>setShow(!show)}
            src="https://firebasestorage.googleapis.com/v0/b/wingh-eb474.appspot.com/o/aboutWeb.png?alt=media&token=5799f4eb-740f-4f83-bec7-d10af76f3763&_gl=1*82qzpz*_ga*MTkxNDI5MzA0NS4xNjg1MjEzNDAx*_ga_CW55HF8NVT*MTY4NjA2NDM5Ny4xMS4xLjE2ODYwNjYyOTEuMC4wLjA."
            alt=""
          />
        </div>
        <div className="text1">
          <img src="images/logoSM.png" alt="" />
          <h3>Sobre mi</h3>
          <hr />
          <p>
            Nació un 21 de agosto de 1987 en Barcelona aunque vive en Valencia,
            y lleva jugando a videojuegos más de 20 años. Empezó siendo campeón
            de Europa en 2 ocasiones en Enemy territory, en eventos presenciales
            en Holanda.
          </p>
        </div>
      </section>
      <div>
        <iframe
          className="frame1"
          src="https://www.youtube.com/embed/48EaIWPRzgc"
          title="Crossfire Prizefight Challenge 2"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>
      </div>
      <hr />
      <article>
        <div>
          <h4>Luego...</h4>
          <p>
            Fué campeón de España dos veces en Call Of Duty 4 en eventos
            presenciales.
          </p>
        </div>
        <iframe
          src="https://www.youtube.com/embed/LYhnBADpwhU"
          title="EPS5 Finals COD4 WRACG vs m5"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>
      </article>
      <hr />
      <article>
        <iframe
          src="https://www.youtube.com/embed/XSvZ_5SkE9c"
          title="Overwatch - Rogue vs. Reunited - Overwatch Atlantic Showdown - Gamescom Finals - Grand Final"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>
        <div>
          <h4>Después...</h4>
          <p>
            de eso jugó de forma competitiva en Battlefield 3, donde fue campeón
            de Europa 4 veces en eventos presenciales en Suecia y Noruega.
            Además tambien fue campeón de Europa en juegos poco conocidos como
            Firefallo Brink.Y llegó a FNATIC, que fichó el equipo para competir
            en Battlefield 4, donde la primera competición presencial que hubo
            también se coronó campeón de Europa. Cuando la etapa de Battlefield
            4 acabó, dejó de competir durante un par de años para volver en
            Overwatch, donde fue considerado de los mejores Reinhardts del mundo
            y quedó sub-campeón del mundo en un evento presencial en Alemania.
          </p>
        </div>
      </article>
      <hr />
      <article>
        <div>
          <h4>La última competición...</h4>
          <p>
            que Winghaven jugó en Overwatch fue el Mundial de selecciones que se
            celebró en Australia, y ahí Wing empezó a jugar al PUBG ya que no
            pudo entrar a la Overwatch League por falta de ofertas. El PUBG fue
            el juego que dio a conocer a Winghaven en la creación de contenido,
            incluso siendo campeón de Europa y competir en Estados Unidos.
          </p>
        </div>
        <iframe
          src="https://www.youtube.com/embed/4gUl3N0Bbsw"
          title="¡LA PARTIDA QUE NOS ENVIÓ A CALIFORNIA AL TORNEO DE $300.000! PLAYERUNKNOWN&#39;S BATTLEGROUNDS ESPAÑOL"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>
      </article>
      <hr />
      <article>
        <iframe
          src="https://www.youtube.com/embed/103e3lMFbag"
          title="😱 GANAMOS UN TORNEO DE $50.000 EN APEX LEGENDS Y NOS VAMOS A BERLIN A LA TWITCHCON! 😱"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>
        <div>
          <h4>Después...</h4>
          <p>
            fué el turno de Apex Legends, donde también fue campeón de Europa y
            jugó el primer Mundial de Apex quedando top 6 del mundo.
          </p>
        </div>
      </article>
      <hr />
      <article className="lastArt">
        <div>
        <img src="./images/logoSM.png" alt="" />
        </div>
        <div>
          <h4>Y llegó Warzone...</h4>
          <p>
            donde Winghaven explotó como creador de contenido, llegando a
            números tanto en Youtube como en Twitch que ni siquiera él
            imaginaba, y aquí sigue :)
          </p>
        </div>
      </article>
      <hr />
      <Login show={show} setShow={setShow} />
    </div>
  );
};
