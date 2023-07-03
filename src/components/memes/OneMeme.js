import React from "react";
import { Button, Modal } from "react-bootstrap";

import "./oneMeme.scss";

export const OneMeme = ({show, setShow, children}) => {
    const handleClose = () => {
        setShow(false);
    };
   
  return (
    <Modal show={show} onHide={handleClose} className="modal-lg">
   

      <Modal.Body className="modal-body" >
       
        <img className="oneMemeImg" src={children} alt=""  />
       
        <Modal.Footer className="footerEdit">
              <div>
          <Button variant="secondary" onClick={handleClose}>
            Salir
          </Button>
         
        </div>
      </Modal.Footer>
      </Modal.Body>

     
    </Modal>
  );
};
