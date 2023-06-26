import React, { useContext, useEffect } from "react";
import { getDatabase, ref, set, get, child, remove } from "firebase/database";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { WinghavenContext } from "../../../context/WinghavenContext";

import "./oneWz2.scss";
import { Footer } from "../../footer/Footer";
import traductor from "../../../utils/traductor";
import detailsTrad from "../../../utils/detTraductor";
import { EditWeapon } from "../../upload/EditWeapon";


export const OneWz2 = () => {
  const { logged } = useContext(WinghavenContext);
  const [weapon, setWeapon] = useState({});
  const [show, setShow] = useState(false);
  const [aux, setAux] = useState(false);
 
  const id = useParams().wz2_id;

  useEffect(() => {
    const dbRef = ref(getDatabase());
    get(child(dbRef, `wz2/${id}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setWeapon(snapshot.val());
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [aux]);

  return (
    <div className="oneWz2Principal">
      <div className="title">
        <h2>
          {traductor(weapon.type)} - {weapon.nombre}{" "}
        </h2>
        {weapon.meta === true && (
          <img className="oneMeta" src="../images/logoMeta.png" alt="" />
        )}
      </div>
      {logged && 
      <div onClick={() => setShow(!show)}>Edit Weapon</div>
      }

      <hr />
      <div className="config">
        {weapon.opt &&
          weapon.opt.map((elem) => {
            return (
              <div className="oneConfig" id={`${weapon.type}`}>
                <div className="filterConfig">
                  <p>
                    {elem.name}: <span>{elem.desc}</span>
                  </p>
                  {(elem.opt1 || elem.opt2) && <p>Peso: <span>{elem.opt1}</span> | {detailsTrad(elem.name)}: <span>{elem.opt2}</span></p>}
                </div>
              </div>
            );
          })}
      </div>
      <img className={`oneWeaponBg ${weapon.type}`} src={weapon.imgBg} alt="" />
      {weapon.type && weapon.link !== "" ? <iframe
          className={`${weapon.type}`}
          src={`https://www.youtube.com/embed/${weapon.link.split("/")[3]}`}
          frameborder="0"
          allow="fullscreen; accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          
        ></iframe> : null}
        {show && <EditWeapon setShow={setShow} show={show} weapon={weapon} setAux={setAux} aux={aux}/>}
    </div>
  );
};
