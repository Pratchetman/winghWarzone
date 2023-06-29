import React, { useState } from "react";
import "./uploadSetup.scss";
import { Button, Modal } from "react-bootstrap";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { app } from "../../utils/fireBaseConf";
import { getDatabase, ref as ref2, set, get, child } from "firebase/database";

const storage = getStorage();

const memeDefault = {
  id: "",
  text: "",
  img: "",
};

export const UploadMeme = ({ meme, setMeme, show, setShow }) => {
  const [newMeme, setNewMeme] = useState(memeDefault);
  const [file, setFile] = useState();
  const [error, setError] = useState("");
  const inputFile = React.useRef();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (e) => {
    let { name, value } = e.target;
    setNewMeme({ ...newMeme, [name]: value });
  };

  const handleFile = (e) => {
    const img = e.target.files[0];
    if (
      img.type == "image/jpeg" ||
      img.type == "image/png" ||
      img.type == "image/webp"
    ) {
      setFile(img);
      setError("");
    } else {
      inputFile.current.value = "";
      setError("Archivo no compatible");
    }
  };

  const handleSubmit = () => {
    if (file) {
      const fileName =
        file.name.split(".")[0] +
        "-" +
        Date.parse(new Date()) / 1000 +
        "." +
        file.name.split(".")[1];
      const storageRef = ref(storage, "memes/" + fileName);
      console.log(storageRef);
      uploadBytes(storageRef, file).then((snapshot) => {
        setError("");
        getDownloadURL(ref(storage, "memes/" + fileName)).then((url) => {
          console.log(url);
          let ident = Date.parse(new Date()) / 1000;
          let dbs = getDatabase();
          set(ref2(dbs, "memes/" + ident), {
            id: ident,
            text: newMeme.text,
            img: url.toString(),
          });
          setMeme([
            {
              id: ident,
              text: newMeme.text,
              img: url.toString(),
            },
            ...meme,
          ]);
          setNewMeme(memeDefault);
          inputFile.current.value = "";
          setShow(!show);
        });
      });
    } else {
      setError("Es necesario elegir un archivo");
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header className="headerModal">
        <img className="logoModal" src="images/logoSM.png" alt="" />
        <Modal.Title>Añadir nuevo meme</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <section>
          <div className="inputsNewArticle">
            <input
              type="text"
              onChange={handleChange}
              value={newMeme.text}
              name="text"
              placeholder="Texto"
            />

            <input
              className="inputFile"
              type="file"
              ref={inputFile}
              onChange={handleFile}
              placeholder="Seleccionar imagen"
            />
          </div>

          <p className="error">{error}</p>
        </section>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
        <Button
          className="buttonModal2"
          variant="primary"
          onClick={handleSubmit}
        >
          Añadir
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
