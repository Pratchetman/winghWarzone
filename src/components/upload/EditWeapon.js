import React, { useEffect, useState } from "react";
import { Button, InputGroup, Modal } from "react-bootstrap";
import { getDatabase, ref as ref2, set, get, child } from "firebase/database";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { app } from "../../utils/fireBaseConf";
import detailsTrad from "../../utils/detTraductor";

const storage = getStorage();

const optDefault = {
  name: "",
  desc: "",
  opt1: "",
  opt2: "",
};

const initialAccList = [
  "Bocacha",
  "Cañón",
  "Láser",
  "Mira",
  "Culata",
  "Acople",
  "Munición",
  "Cargador",
  "Empuñadura trasera",
  "Peine",
  "Cerrojo",
];

export const EditWeapon = ({ show, setShow, weapon, setAux, aux }) => {
  const [editWeapon, setEditWeapon] = useState({ ...weapon, imgBg: null });
  const [accList, setAccList] = useState(
    initialAccList.filter((elem) => {
      let res = true;
      for (let accname of weapon.opt) {
        if (accname.name === elem) {
          res = false;
        }
      }
      return res;
    })
  );
  const [option, setOption] = useState(optDefault);
  const [optionList, setOptionList] = useState(weapon.opt);
  const [error, setError] = useState("");
  const inputFile = React.useRef();

  const handleClose = () => {
    setShow(false);
    setOption(optDefault);
    setError("");
    setAccList(initialAccList);
  };

  const handleFileBg = (e) => {
    const imgBg = e.target.files[0];
    console.log(imgBg.name);
    if (
      imgBg.name.includes(".jpg") ||
      imgBg.name.includes(".png") ||
      imgBg.name.includes(".jpeg")
    ) {
      setEditWeapon({ ...editWeapon, imgBg: imgBg });
      setError("");
    } else {
      setError("Archivo no compatible");
      inputFile.current.value = "";
    }
  };

  const checkInput = () => {
    if (editWeapon.nombre === "") {
      setError("*Rellena todos los campos obligatorios");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditWeapon({ ...editWeapon, [name]: value, opt: optionList });
  };

  const handleCheck = () => {
    setEditWeapon({ ...editWeapon, meta: !editWeapon.meta });
  };

  const handleChangeOpt = (e) => {
    const { name, value } = e.target;
    setOption({ ...option, [name]: value });
  };

  const handleOptionList = () => {
    if (option.name !== "" && option.desc !== "") {
      let aux = [...optionList];
      aux.push(option);
      setEditWeapon({ ...editWeapon, opt: aux });
      setOptionList(aux);
      let auxList = [...accList];
      auxList.splice(accList.indexOf(option.name), 1);
      setAccList(auxList);
      setError("");
      setOption(optDefault);
    } else {
      setError("Por favor, comprueba todos los campos");
    }
  };

  const handleDelAcc = (index) => {
    let aux = [...optionList];
    let acc = optionList[index].name;
    aux.splice(index, 1);
    setEditWeapon({ ...editWeapon, opt: aux });
    setOptionList(aux);
    setAccList([...accList, acc]);
  };

  const handleSubmit = () => {
    let ok = true;
    for (const [key, value] of Object.entries(editWeapon)) {
      if (value === "") {
        ok = false;
      }
    }
    const storage = getStorage();
    const fileName = weapon.imgBg
      .substring(weapon.imgBg.indexOf("Bg%2F") + 5, weapon.imgBg.indexOf("?"))
      .replaceAll("%20", " ");
    if (ok === true) {
      if (editWeapon.imgBg !== null) {
        console.log("entrando a borrar");
        console.log(fileName);
        const delRef = ref(storage, "wz2/imgBg/" + fileName);
        try {
          deleteObject(delRef)
          .then(() => {
            console.log("Archivo borrado correctamente");
          })
          .catch((error) => {
            console.log(error);
          });
        } finally {
          const fileNameBg =
          Date.parse(new Date()) / 1000 +
          "-" +
          editWeapon.imgBg.name.split(".")[0] +
          "." +
          editWeapon.imgBg.name.split(".")[1];
        const storageRefBg = ref(storage, "wz2/imgBg/" + fileNameBg);
        uploadBytes(storageRefBg, editWeapon.imgBg).then((snapshot) => {
          console.log("nueva imagen subida correctamente");
          getDownloadURL(ref(storage, "wz2/imgBg/" + fileNameBg)).then(
            (url) => {
              let dbs = getDatabase();
              set(ref2(dbs, "wz2/" + editWeapon.id), {
                ...editWeapon,
                imgBg: url,
              });
              inputFile.current.value = "";
              setShow(!show);
              setAux(!aux);
            }
          );
        });
        }
       
 
      } else if (editWeapon.imgBg === null) {
        let dbs = getDatabase();
        set(ref2(dbs, "wz2/" + editWeapon.id), {
          ...editWeapon,
          imgBg: weapon.imgBg,
        });
        setShow(!show);
        setAux(!aux);
      }
    } else {
      setError("Comprueba todos los datos");
    }
  };
  console.log(editWeapon);
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header className="headerModal">
        <img className="logoModal" src="images/logoSM.png" alt="" />
        <Modal.Title>Editar arma</Modal.Title>
      </Modal.Header>
      {editWeapon && (
        <Modal.Body>
          <div className="inputsNewArticle">
            <h5>Datos principales</h5>
            {editWeapon && (
              <input
                type="text"
                onChange={handleChange}
                onBlur={checkInput}
                value={editWeapon.nombre}
                name="nombre"
                placeholder="Título"
              />
            )}
            {editWeapon && (
              <select
                type="type"
                onChange={handleChange}
                value={editWeapon.type}
                name="type"
                placeholder="Seleccionar tipo"
              >
                <option defaultValue="">{editWeapon.type}</option>
                <option value="AR">Rifle de asalto</option>
                <option value="BR">Ametralladora ligera</option>
                <option value="SMG">Subfusil</option>
                <option value="SG">Escopeta</option>
                <option value="LMG">Ametralladora pesada</option>
                <option value="TR">Fusil táctico</option>
                <option value="SR">Francotirador</option>
                <option value="Pistola">Pistola</option>
              </select>
            )}
            {editWeapon && (
              <input
                type="text"
                onChange={handleChange}
                value={editWeapon.link}
                name="link"
                placeholder="Youtube"
              />
            )}
            <div className="labelFile">
              <h6>Imagen detalle</h6>
              <input
                className="inputFile"
                ref={inputFile}
                type="file"
                onChange={handleFileBg}
                placeholder="Seleccionar imagen"
              />
            </div>

            <div className="dflex">
              <label htmlFor="meta">Meta</label>
              <input
                type="checkbox"
                id="meta"
                onChange={handleCheck}
                value={editWeapon.meta}
                checked={`${
                  editWeapon && editWeapon.meta === true ? "true" : "false"
                }`}
                name="meta"
              />
            </div>

            {optionList &&
              optionList.map((elem, index) => {
                return (
                  <div className="mapAccCont">
                    <div className="mapAcc">
                      <p>
                        <span>{elem.name}:</span> "{elem.desc}"
                      </p>
                      {elem.name !== "Cargador" && (
                        <p className="opt1Opt2">
                          <span>Peso:</span> {elem.opt1 ? elem.opt1 : "0.00"} /{" "}
                          <span>Opt2:</span> {elem.opt2 ? elem.opt2 : "0.00"}
                        </p>
                      )}
                    </div>
                    <p className="delAcc" onClick={() => handleDelAcc(index)}>
                      X
                    </p>
                  </div>
                );
              })}
            {optionList && optionList.length < 5 && (
              <>
                <h5 className="addAcc">Añade los accesorios</h5>
                <select
                  onChange={handleChangeOpt}
                  value={option.name}
                  name="name"
                >
                  <option defaultValue="">Elige accesorio</option>
                  {accList.map((elem) => {
                    return <option value={elem}>{elem}</option>;
                  })}
                </select>
                <input
                  type="text"
                  onChange={handleChangeOpt}
                  value={option.desc}
                  name="desc"
                  placeholder="Descripción"
                />
                {option.name !== "Cargador" && option.name !== "" && (
                  <div className="inputsOpt">
                    <input
                      onChange={handleChangeOpt}
                      type="number"
                      placeholder="Peso"
                      min="-1"
                      max="1"
                      step="0.01"
                      value={option.opt1}
                      name="opt1"
                    />
                    <input
                      onChange={handleChangeOpt}
                      type="number"
                      placeholder={detailsTrad(option.name)}
                      min="-1"
                      max="1"
                      step="0.01"
                      value={option.opt2}
                      name="opt2"
                    />
                  </div>
                )}
                <Button className="buttonAddAcc" onClick={handleOptionList}>
                  Añadir accesorio
                </Button>
              </>
            )}
          </div>

          <p className="error">{error}</p>
        </Modal.Body>
      )}
      <Modal.Footer>
        <Button variant="secondary">Eliminar arma</Button>
        <Button variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
        <Button
          onClick={handleSubmit}
          className="buttonModal2"
          variant="primary"
        >
          Crear arma
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
