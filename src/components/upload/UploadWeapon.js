import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap';


const weaponDefault = {
    id: "",
    nombre: "",
    type: "",
    img: "",
    link: "",
          
  };

export const UploadWeapon = ({show, setShow}) => {
    const [weapon, setWeapon] = useState(weaponDefault);
    const [file, setFile] = useState("")
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [error, setError] = useState("");
    const [opt1, setOpt1] = useState("");
    const [opt2, setOpt2] = useState("");
    const [opt3, setOpt3] = useState("");
    const [opt4, setOpt4] = useState("");
    const [opt5, setOpt5] = useState("");
  
    const inputFile = React.useRef();
    console.log(opt1);

const handleFile = () => {

}
const handleChange = () =>{

}

  return (
    <Modal show={show} onHide={handleClose}>
    <Modal.Header className="headerModal">
      <img className="logoModal" src="images/logoSM.png" alt="" />
      <Modal.Title>Añadir arma</Modal.Title>
    </Modal.Header>
    <Modal.Body>
    <div className="inputsNewArticle">
    <input
      type="text"
      onChange={handleChange}
      value={weapon.nombre}
      name="nombre"
      placeholder="Título"
    />
    <input
      type="text"
      onChange={handleChange}
      value={weapon.type}
      name="type"
      placeholder="Tipo"
    />
  
    <input
      type="text"
      onChange={handleChange}
      value={weapon.link}
      name="link"
      placeholder="Link"
    />
      <input className="inputFile"
      ref={inputFile}
      type="file"
      onChange={handleFile}
      placeholder="Seleccionar imagen"
    />
    <select onChange={handleChange} value={weapon.opt.name} name="name" id="armaOp1">
      <option defaultValue=""></option>
      <option value="1">Bocacha</option>
      <option value="2">Cañón</option>
      <option value="3">Laser</option>
      <option value="4">Mira</option>
      <option value="5">Culata</option>
      <option value="6">Acople</option>
      <option value="7">Munición</option>
      <option value="8">Cargador</option>
      <option value="9">Empuñadura trasera</option>
    </select>
    {opt1 == "Bocacha" && <div>
        <input type="number" placeholder='Peso' min="-1" max="1" step="0.01"  />
        <input type="number" placeholder='Duración' min="-1" max="1" step="0.01"  />
      </div>}
    <select name="armaOp2" id="armaOp2">
      <option value="1">Bocacha</option>
      <option value="2">Cañón</option>
      <option value="3">Laser</option>
      <option value="4">Mira</option>
      <option value="5">Culata</option>
      <option value="6">Acople</option>
      <option value="7">Munición</option>
      <option value="8">Cargador</option>
      <option value="9">Empuñadura trasera</option>
    </select>
    <select name="armaOp3" id="armaOp3">
      <option value="1">Bocacha</option>
      <option value="2">Cañón</option>
      <option value="3">Laser</option>
      <option value="4">Mira</option>
      <option value="5">Culata</option>
      <option value="6">Acople</option>
      <option value="7">Munición</option>
      <option value="8">Cargador</option>
      <option value="9">Empuñadura trasera</option>
    </select>
    <select name="armaOp4" id="armaOp4">
      <option value="1">Bocacha</option>
      <option value="2">Cañón</option>
      <option value="3">Laser</option>
      <option value="4">Mira</option>
      <option value="5">Culata</option>
      <option value="6">Acople</option>
      <option value="7">Munición</option>
      <option value="8">Cargador</option>
      <option value="9">Empuñadura trasera</option>
    </select>
    <select name="armaOp5" id="armaOp5">
      <option value="1">Bocacha</option>
      <option value="2">Cañón</option>
      <option value="3">Laser</option>
      <option value="4">Mira</option>
      <option value="5">Culata</option>
      <option value="6">Acople</option>
      <option value="7">Munición</option>
      <option value="8">Cargador</option>
      <option value="9">Empuñadura trasera</option>
    </select>

  </div>
 
 
  <p className="error">{error}</p>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleClose}>
        Cerrar
      </Button>
      <Button className="buttonModal2" variant="primary">
        Añadir
      </Button>
    </Modal.Footer>
  </Modal>
  )
}
