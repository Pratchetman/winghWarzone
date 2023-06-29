import React, { useContext, useEffect } from "react";
import { getDatabase, ref, set, get, child, remove } from "firebase/database";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { WinghavenContext } from "../../../context/WinghavenContext";

import "./oneWz1.scss";
import traductor from "../../../utils/traductor";
import detailsTrad from "../../../utils/detTraductor";
import handleNums from "../../../utils/handleNums";
import { EditWeaponWz1 } from "../../upload/EditWeaponWz1";


export const OneWz1 = () => {
  const { logged } = useContext(WinghavenContext);
  const [weapon, setWeapon] = useState({});
  const [show, setShow] = useState(false);
  const [aux, setAux] = useState(false);
 
  const id = useParams().wz1_id;

  useEffect(() => {
    const dbRef = ref(getDatabase());
    get(child(dbRef, `wz1/${id}`))
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
        <div className="dFlex">
        <h2>
          {traductor(weapon.type)} - {weapon.nombre}{" "}
        </h2>
        {weapon.meta === true && (
          <img className="oneMeta" src="../images/logoMeta.png" alt="" />
        )}
        </div>
       
           {logged && 
      <div className="edit" onClick={() => setShow(!show)}>
      <img className="imgEdit" src="../images/edit.png" alt="" />
      </div>
      }
      </div>
      

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
                  {(elem.opt1 || elem.opt2) && <p>Peso: <span>{handleNums(elem.opt1)}</span> | {detailsTrad(elem.name)}: <span>{handleNums(elem.opt2)}</span></p>}
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
        {show && <EditWeaponWz1 setShow={setShow} show={show} weapon={weapon} setAux={setAux} aux={aux}/>}
    </div>
  );
};
