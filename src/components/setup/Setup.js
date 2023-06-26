import React, { useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import "./setup.scss";

import { app } from "../../utils/fireBaseConf";

import { getDatabase, ref, set, get, child, remove } from "firebase/database";
import { getStorage, ref as ref2, deleteObject } from "firebase/storage";
import { UploadSetup } from "../upload/UploadSetup";
import { WinghavenContext } from "../../context/WinghavenContext";

export const Setup = () => {
  const [setup, setSetup] = useState();
  const [show, setShow] = useState(false);
  const {logged} = useContext(WinghavenContext)

  useEffect(() => {
    const dbRef = ref(getDatabase());
    get(child(dbRef, `setup/`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setSetup(Object.values(snapshot.val()));
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [setSetup]);

  const handleDelete = (id, img) => {
    const db = getDatabase();
    remove(ref(db, "setup/" + id)).then(() => {
      console.log("entrada eliminada correctamente");
    });

    const storage = getStorage();
    const fileName = img.substring(img.indexOf("/o/") + 2, img.indexOf("?"));
    // Create a reference to the file to delete
    const delRef = ref2(storage, fileName);

    // Delete the file
    deleteObject(delRef)
      .then(() => {
        console.log("Archivo borrado correctamente");
      })
      .catch((error) => {
        console.log(error);
      });

    setSetup(setup.filter((elem) => elem.id !== id));
  };

  console.log(setup);

  return (
    <>
      <div className="principalSetup">
        <h3>Mi Setup</h3>
        <hr />
        <div className="bigSetup">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/wingh-eb474.appspot.com/o/setup.jpeg?alt=media&token=e2d6ebff-6fc8-43c2-a5a6-1af10288a737&_gl=1*7egzb6*_ga*MTkxNDI5MzA0NS4xNjg1MjEzNDAx*_ga_CW55HF8NVT*MTY4NTk1NjcyNi42LjEuMTY4NTk1ODYyNy4wLjAuMA.."
            alt=""
          />
        </div>
        <div className="imagenesSetup">
          {setup &&
            setup.map((elem, index) => {
              return (
                <>
                  <div className="oneImageMarco">
                    {logged && <img
                      onClick={() => handleDelete(elem.id, elem.img)}
                      className="delete"
                      src="images/delete2.png"
                      alt=""
                    />}
                    <h6>{elem.nombre}</h6>
                    <p>{elem.descripcion}</p>
                    <a href={elem.link} key={index} target="_blank">
                      <img src={elem.img} alt="" />
                    </a>
                  </div>
                </>
              );
            })}
        </div>
      </div>
     
      {logged && <><div className="addWp" onClick={() => setShow(!show)}>
          <h1>+</h1>
        </div>
      <UploadSetup
        show={show}
        setShow={setShow}
        setSetup={setSetup}
        setup={setup}
      />
      </>}
    </>
  );
};
