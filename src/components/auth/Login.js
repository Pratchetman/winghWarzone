import React, { useContext, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { WinghavenContext } from "../../context/WinghavenContext";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

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
    setError("");
    setShow(false);
    setLogin(loginDefault);
  };

  const handleChange = (e) => {
    
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  };

  const handleOnKeyDown = (e) =>{
    if (e.key === "Enter"){
      handleSubmit();
    }
  }

  const handleSubmit = () => {
    const auth = getAuth();
    console.log("empiezo el submit");
    signInWithEmailAndPassword(auth, login.mail, login.password)
      .then((userCredential) => {
        const uid = userCredential.user.uid;
        console.log("ya tengo el id", uid);
        setUser(uid);
        setLogged(true);
        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setError("Error en los datos introducidos");
      });
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header className="headerModal">
        <img className="logoModal" src="images/logoSM.png" alt="" />
        <Modal.Title>Inicia sesión</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!logged ? (
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
                onKeyDown={handleOnKeyDown}
                value={login.password}
                name="password"
                placeholder="Contraseña"
                autoComplete="password"
              />
            </div>

            <p className="error">{error}</p>
          </section>
        ) : (
          <section>
            <div className="inputsNewArticle">
              <h6>Ya estás logueado</h6>
            </div>
          </section>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
        {!logged && (
          <Button
            className="buttonModal2"
            variant="primary"
            onClick={handleSubmit}
          >
            Iniciar sesión
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};
