import React, { useContext } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { WinghavenContext } from '../../context/WinghavenContext';
import { getAuth } from "firebase/auth";

import "./session.scss";

export const Session = ({show, setShow}) => {
    const {logged, setLogged} = useContext(WinghavenContext);

    const handleClose = () => {
        setShow(false);
    };

    const handleSession = () =>{
        getAuth().signOut()
        .then(()=>{
          console.log("sesión cerrada correctamente")
          setLogged(!logged);
          setShow(false);
        })
        .catch((error)=>{
         console.log("error al cerrar sesion", error)
        })
      }

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header className="headerModal">
        <img className="logoModal" src="images/logoSM.png" alt="" />
        <Modal.Title></Modal.Title>
      </Modal.Header>
      <Modal.Body className='modalBody'>
      <h3>¿Cerrar sesión?</h3>
      </Modal.Body>
      <Modal.Footer className='footerSession'>
        <Button variant="secondary" onClick={handleClose}>
          Cancelar
        </Button>
        <Button
          className="buttonModal2"
          variant="primary"
          onClick={handleSession}
        >
          Cerrar sesión
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
