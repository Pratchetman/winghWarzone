import React, { useContext, useEffect, useState } from "react";
import "./memes.scss";

import { app } from "../../utils/fireBaseConf";

import { getDatabase, ref, set, get, child, remove } from "firebase/database";
import { getStorage, ref as ref2, deleteObject } from "firebase/storage";
import { UploadMeme } from "../upload/UploadMeme";
import { Button } from "react-bootstrap";
import { WinghavenContext } from "../../context/WinghavenContext";

export const Memes = () => {
  const [meme, setMeme] = useState([]);
  const [show, setShow] = useState(false);
  const {logged} = useContext(WinghavenContext);
  
  useEffect(() => {
    const dbRef = ref(getDatabase());
    get(child(dbRef, `memes/`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setMeme(Object.values(snapshot.val()).sort((a, b) => b.id - a.id));
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [setMeme]);

  console.log(meme);

  const handleDelete = (id, img) => {
    const db = getDatabase();
    remove(ref(db, "memes/" + id)).then(() => {
      console.log("entrada eliminada correctamente");
    });

    const storage = getStorage();
    const fileName = img.substring(img.indexOf("%2F") + 3, img.indexOf("?")).replaceAll("%20", " ");
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

        <div className="imagenesMemes">
          {meme &&
            meme.map((elem, index) => {
              return (
                <>
                  <div className="oneImageMarco">
                    {logged &&<img
                      onClick={() => handleDelete(elem.id, elem.img)}
                      className="delete"
                      src="images/delete2.png"
                      alt=""
                    />}
                    <h6>{elem.text}</h6>
                    <div className="oneImage">
                    <img  src={elem.img} alt="" />
                    </div>
                    
                  </div>
                </>
              );
            })}
        </div>
      </div>
      {logged && (
        <>
          <Button
            className="buttonModal"
            variant="primary"
            onClick={() => setShow(!show)}
          >
            Nuevo meme
          </Button>
          {show && <UploadMeme
            setMeme={setMeme}
            meme={meme}
            show={show}
            setShow={setShow}
          />}
        </>
      )}
    </>
  );
};
