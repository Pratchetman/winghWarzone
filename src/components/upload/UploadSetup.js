import React, { useState } from "react";
import "./uploadSetup.scss";
import { Button, Modal } from "react-bootstrap";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { app } from "../../utils/fireBaseConf";
import { getDatabase, ref as ref2, set, get, child } from "firebase/database";

const storage = getStorage();

const articleDefault = {
  id: "",
  nombre: "",
  descripcion: "",
  img: "",
  link: "",
};

export const UploadSetup = ({ setSetup, setup, show, setShow }) => {
  const [newArticle, setNewArticle] = useState(articleDefault);
  const [file, setFile] = useState();
  const [error, setError] = useState("");
  const inputFile = React.useRef();
 


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (e) => {
    let { name, value } = e.target;
    setNewArticle({ ...newArticle, [name]: value });
  };

  console.log(newArticle);

  const handleFile = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = () => {
    if (file.name.includes("jpg") || file.name.includes("png")) {
      const fileName = file.name.split(".")[0] + "-" + Date.parse(new Date()) / 1000 + "." + file.name.split(".")[1]; 
      const storageRef = ref(storage, fileName);
      console.log(storageRef);
      uploadBytes(storageRef, file).then((snapshot) => {
        setError("");
        getDownloadURL(ref(storage, fileName)).then((url) => {
          let ident = Date.parse(new Date()) / 1000;
          let dbs = getDatabase();
          set(ref2(dbs, "setup/" + ident), {
            id: ident,
            descripcion: newArticle.descripcion,
            img: url.toString(),
            nombre: newArticle.nombre,
            link: newArticle.link,
          });
          setSetup([
            ...setup,
            {
              id: ident,
              descripcion: newArticle.descripcion,
              img: url.toString(),
              nombre: newArticle.nombre,
              link: newArticle.link,
            },
          ]);
          setNewArticle(articleDefault);
          inputFile.current.value = "";
          setShow(!show);
        });
      });
    } else {
      setError("Archivo no compatible");
    }
  };


  return (

    <Modal show={show} onHide={handleClose}>
        <Modal.Header className="headerModal">
          <img className="logoModal" src="images/logoSM.png" alt="" />
          <Modal.Title>Añadir artículo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="inputsNewArticle">
        <input
          type="text"
          onChange={handleChange}
          value={newArticle.nombre}
          name="nombre"
          placeholder="Título"
        />
        <input
          type="text"
          onChange={handleChange}
          value={newArticle.descripcion}
          name="descripcion"
          placeholder="Descripción"
        />
      
        <input
          type="text"
          onChange={handleChange}
          value={newArticle.link}
          name="link"
          placeholder="Link"
        />
          <input className="inputFile"
          ref={inputFile}
          type="file"
          onChange={handleFile}
          placeholder="Seleccionar imagen"
        />
      </div>
     
      <p className="error">{error}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
          <Button className="buttonModal2" variant="primary" onClick={handleSubmit}>
            Añadir
          </Button>
        </Modal.Footer>
      </Modal>

  );
};
