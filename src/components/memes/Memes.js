import React, { useContext, useEffect, useState } from "react";
import "./memes.scss";

import { app } from "../../utils/fireBaseConf";

import { getDatabase, ref, set, get, child, remove } from "firebase/database";
import { getStorage, ref as ref2, deleteObject } from "firebase/storage";
import { UploadMeme } from "../upload/UploadMeme";
import { Button } from "react-bootstrap";
import { WinghavenContext } from "../../context/WinghavenContext";
import { OneMeme } from "./OneMeme";

export const Memes = () => {
  const [meme, setMeme] = useState([]);
  const [show, setShow] = useState(false);
  const [showMeme, setShowMeme] = useState(false);
  const [qty, setQty] = useState(0);
  const [oneMeme, setOneMeme] = useState();
  const [listen, setListen] = useState(false);
  const { logged } = useContext(WinghavenContext);

  useEffect(() => {
    const dbRef = ref(getDatabase());

    const scroll = new Promise((resolve, reject) => {
      window.scroll({ top: 0 });
      console.log("hago scroll hacia arriba");
      resolve(true);
    });

    scroll.then(() => {
      get(child(dbRef, `memes/`))
        .then((snapshot) => {
          if (snapshot.exists()) {
            setMeme(Object.values(snapshot.val()).sort((a, b) => b.id - a.id));
          } else {
            console.log("No data available");
          }
        })
        .then(() => {
          setQty(10);
          setListen(true);
        })
        .catch((error) => {
          console.error(error);
        });
    });

    return () => {
      window.removeEventListener("scroll", listenScroll);
    };
  }, []);

  function listenScroll() {
    if (listen === true){
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 150
      ) {
        setQty(qty + 10);
      }
    }
  }
  window.addEventListener("scroll", listenScroll);

  console.log(qty);

  const handleDelete = (id, img) => {
    const db = getDatabase();
    remove(ref(db, "memes/" + id)).then(() => {
      console.log("entrada eliminada correctamente");
    });

    const storage = getStorage();
    const fileName = img
      .substring(img.indexOf("%2F") + 3, img.indexOf("?"))
      .replaceAll("%20", " ");
    // Create a reference to the file to delete
    console.log(fileName);
    const delRef = ref2(storage, "memes/" + fileName);

    // Delete the file
    deleteObject(delRef)
      .then(() => {
        console.log("Archivo borrado correctamente");
      })
      .catch((error) => {
        console.log(error);
      });

    setMeme(meme.filter((elem) => elem.id !== id));
  };

  return (
    <>
      <div className="principalMemes">
        <h3>Memes</h3>
        <hr />
        {logged && (
          <div className="addWp" onClick={() => setShow(!show)}>
            <img src="./images/plus.png" alt="" />
          </div>
        )}
        <div className="imagenesMemes">
          {meme &&
            meme.map((elem, index) => {
              if (index < qty) {
                return (
                  <>
                    <div className="oneImageMarco">
                      {logged && (
                        <img
                          onClick={() => handleDelete(elem.id, elem.img)}
                          className="delete"
                          src="images/delete2.png"
                          alt=""
                        />
                      )}
                      <h6>{elem.text}</h6>
                      <div className="oneImage">
                        <img
                          src={elem.img}
                          alt=""
                          onClick={() => {
                            setOneMeme(elem.img);
                            setShowMeme(!showMeme);
                          }}
                        />
                      </div>
                    </div>
                  </>
                );
              }
            })}
        </div>
      </div>
      {logged && (
        <>
         {show && (
            <UploadMeme
              setMeme={setMeme}
              meme={meme}
              show={show}
              setShow={setShow}
            />
          )}
        </>
      )}
      {showMeme && (
        <OneMeme show={showMeme} setShow={setShowMeme}>
          {oneMeme}
        </OneMeme>
      )}
    </>
  );
};
