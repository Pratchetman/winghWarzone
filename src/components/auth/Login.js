import React, { useContext, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { WinghavenContext } from "../../context/WinghavenContext";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { saveLocalStorageWingh } from "../../utils/localStorage";
import { useNavigate } from "react-router-dom";


const loginDefault = {
  mail: "",
  password: "",
};

export const Login = ({ show, setShow }) => {
  const { user, setUser, logged, setLogged } = useContext(WinghavenContext);
  const [login, setLogin] = useState(loginDefault);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleClose = () => {
    setShow(false);
    setLogin(loginDefault);
  };
  const handleShow = () => setShow(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  };
  const handleSubmit = () => {
    const auth = getAuth();
    console.log("empiezo el submit")
    signInWithEmailAndPassword(auth, login.mail, login.password)
      .then((userCredential) => {
        const uid = userCredential.user.uid;
        console.log("ya tengo el id", uid)
        setUser(uid);
        setLogged(true);
        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header className="headerModal">
        <img className="logoModal" src="images/logoSM.png" alt="" />
        <Modal.Title>Inicia sesión</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <section>
          <div className="inputsNewArticle">
            <input
              type="mail"
              onChange={handleChange}
              value={login.mail}
              name="mail"
              placeholder="Introduce email"
              autoComplete="username"
            />
            <input
              type="password"
              onChange={handleChange}
              value={login.password}
              name="password"
              placeholder="Contraseña"
              autoComplete="password"
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
