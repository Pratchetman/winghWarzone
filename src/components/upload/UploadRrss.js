import React, { useState } from "react";
import "./uploadSetup.scss";
import { Button, Modal } from "react-bootstrap";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { app } from "../../utils/fireBaseConf";
import { getDatabase, ref as ref2, set, get, child } from "firebase/database";
import { Rrss } from "../rrss/Rrss";

const storage = getStorage();

const rs = {
  id: "",
  title: "",
  link: "",
  type: "",
};



export const UploadRrss = ({ rrss, setRrss, show, setShow }) => {
  const [newRs, setNewRs] = useState(rs);
  const [error, setError] = useState("");
  

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

    console.log(newRs);

  const handleChange = (e) => {
    let { name, value } = e.target;
    setNewRs({ ...newRs, [name]: value });
  };

  const handleSubmit = () => {
    let ident = Date.parse(new Date()) / 1000;
    let dbs = getDatabase();
    set(ref2(dbs, "rrss/" + ident), {...newRs, id: ident});
    setRrss([
      newRs,
      ...rrss,
    ]);
    setNewRs(rs);
    
    setShow(!show);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header className="headerModal">
        <img className="logoModal" src="images/logoSM.png" alt="" />
        <Modal.Title>Añadir nueva red social</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <section>
          <div className="inputsNewArticle">
            <select onChange={handleChange} value={newRs.type} name="type">
                <option defaultValue="">Elige red</option>
                <option value="yt">Youtube</option>
                <option value="in">Instagram</option>
                <option value="fb">Facebook</option>
                <option value="tw">Twitch</option>
                <option value="tk">TikTok</option>
                <option value="tt">Twitter</option>
                <option value="ki">Kick</option>
                <option value="ln">LinkedIn</option>
                <option value="ub">Ubeat</option>
                <option value="bl">Bigo Live</option>
                <option value="dl">DLive</option>
            </select>
            <input
              type="text"
              onChange={handleChange}
              value={newRs.title}
              name="title"
              placeholder="Texto"
            />
            <input
              type="text"
              onChange={handleChange}
              value={newRs.link}
              name="link"
              placeholder="Link"
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
