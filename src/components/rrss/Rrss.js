import React, { useContext, useEffect, useState } from "react";
import "./rrss.scss";
import { UploadRrss } from "../upload/UploadRrss";
import { Button } from "react-bootstrap";
import { app } from "../../utils/fireBaseConf";

import { getDatabase, ref, set, get, child, remove } from "firebase/database";
import { WinghavenContext } from "../../context/WinghavenContext";

export const Rrss = () => {
  const [rrss, setRrss] = useState([]);
  const [show, setShow] = useState(false);
  const { logged } = useContext(WinghavenContext);

  useEffect(() => {
    const dbRef = ref(getDatabase());
    get(child(dbRef, `rrss/`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setRrss(Object.values(snapshot.val()).sort((a, b) => a.id - b.id));
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [setRrss]);

  return (
    <>
      <div className="principalRrss">
        <h2>Redes sociales</h2>
        <hr />
        {logged && <><div className="addWp" onClick={() => setShow(!show)}>
          <img src="./images/plus.png" alt="" />
        </div>
      <UploadRrss show={show} setShow={setShow} rrss={rrss} setRrss={setRrss} /></> }
        <section>
          {rrss.map((elem, index) => {
            return (
              <div className="cardRrss">
                <h6>{elem.title}</h6>

                <a href={elem.link} target="_blank">
                  <img src={`./images/rrss/${elem.type}.png`} alt="" />
                </a>
              </div>
            );
          })}
        </section>
      </div>
      
    </>
  );
};
