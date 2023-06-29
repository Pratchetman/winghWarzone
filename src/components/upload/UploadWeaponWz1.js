import React, { useState } from "react";
import { Button, InputGroup, Modal } from "react-bootstrap";
import { getDatabase, ref as ref2, set, get, child } from "firebase/database";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { app } from "../../utils/fireBaseConf";
import detailsTrad from "../../utils/detTraductor";

const storage = getStorage();

const optDefault = {
  name: "",
  desc: "",
  //   opt1: "",
  //   opt2: "",
};

let weaponDefault = {
  id: Date.parse(new Date()) / 1000,
  nombre: "",
  type: "",
  img: "",
  imgBg: "",
  link: "",
  meta: false,
  opt: [],
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
  "Cerrojo",
  "Sistema de gatillo",
  "Ventaja 1",
  "Ventaja 2",
];

export const UploadWeaponWz1 = ({ show, setShow, aux, setAux }) => {
  const [weapon, setWeapon] = useState(weaponDefault);
  const [accList, setAccList] = useState(initialAccList);
  const [option, setOption] = useState(optDefault);
  const [optionList, setOptionList] = useState([]);
  const [error, setError] = useState("");
  const inputFile1 = React.useRef();
  const inputFile2 = React.useRef();

  const handleClose = () => {
    setShow(false);
    setWeapon(weaponDefault);
    setOptionList([]);
    setOption(optDefault);
    setError("");
    setAccList(initialAccList);
  };

  const handleFile = (e) => {
    const img = e.target.files[0];
    console.log(img.name);
    if (
      img.type == "image/jpeg" ||
      img.type == "image/png" ||
      img.type == "image/webp"
    ) {
      setWeapon({ ...weapon, img: img });
      setError("");
    } else {
      inputFile1.current.value = "";
      setError("Archivo no compatible");
    }
  };
  const handleFileBg = (e) => {
    const imgBg = e.target.files[0];
    console.log(imgBg);
    if (
      imgBg.type == "image/jpeg" ||
      imgBg.type == "image/png" ||
      imgBg.type == "image/webp"
    ) {
      setWeapon({ ...weapon, imgBg: imgBg });
      setError("");
    } else {
      // inputFile2.current.value = "";
      setError("Archivo no compatible");
    }
  };

  const checkInput = () => {
    if (weapon.nombre === "") {
      setError("*Rellena todos los campos obligatorios");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setWeapon({ ...weapon, [name]: value, opt: optionList });
  };

  const handleCheck = () => {
    setWeapon({ ...weapon, meta: !weapon.meta });
  };

  const handleChangeOpt = (e) => {
    const { name, value } = e.target;
    setOption({ ...option, [name]: value });
  };

  console.log(weapon);

  const handleOptionList = () => {
    if (option.name !== "" && option.desc !== "") {
      let aux = [...optionList];
      aux.push(option);
      setWeapon({ ...weapon, opt: aux });
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
    setWeapon({ ...weapon, opt: aux });
    setOptionList(aux);
    setAccList([...accList, acc]);
  };

  const handleSubmit = () => {
    let ok = true;
    for (const [key, value] of Object.entries(weapon)) {
      if (value === "" && key != "link") {
        ok = false;
      }
    }

    if (ok === true) {
      const fileName =
        weapon.img.name.split(".")[0] +
        "-" +
        Date.parse(new Date()) / 1000 +
        "." +
        weapon.img.name.split(".")[1];
      const storageRef = ref(storage, "wz1/" + fileName);
      const fileNameBg =
        Date.parse(new Date()) / 1000 +
        "-" +
        weapon.imgBg.name.split(".")[0] +
        "." +
        weapon.img.name.split(".")[1];
      const storageRefBg = ref(storage, "wz1/imgBg/" + fileNameBg);
      console.log(storageRef);
      let url1 = "";
      let url2 = "";
      uploadBytes(storageRef, weapon.img).then((snapshot) => {
        console.log("imagen 1 subida correctamente");
        setError("");
        getDownloadURL(ref(storage, "wz1/" + fileName)).then((urlWz1) => {
          url1 = urlWz1.toString();
          console.log(url1, "link para db");
        });
        uploadBytes(storageRefBg, weapon.imgBg).then((snapshot) => {
          console.log("imagen 2 subida correctamente");
          getDownloadURL(ref(storage, "wz1/imgBg/" + fileNameBg)).then(
            (url) => {
              let dbs = getDatabase();
              url2 = url.toString();
              console.log(url2, "link para db");
              set(ref2(dbs, "wz1/" + weapon.id), {
                ...weapon,
                img: url1,
                imgBg: url2,
              });
              setWeapon({
                ...weaponDefault,
                id: Date.parse(new Date()) / 1000,
              });
              inputFile1.current.value = "";
              inputFile2.current.value = "";
              setAux(!aux);
              setShow(!show);
              setOptionList([]);
            }
          );
        });
      });
    } else {
      setError("Comprueba todos los datos");
    }
    weaponDefault.id = Date.parse(new Date()) / 1000;
  };
  console.log(optionList);
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header className="headerModal">
        <img className="logoModal" src="images/logoSM.png" alt="" />
        <Modal.Title>Nueva arma</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="inputsNewArticle">
          <h5>Datos principales</h5>
          <input
            type="text"
            onChange={handleChange}
            onBlur={checkInput}
            value={weapon.nombre}
            name="nombre"
            placeholder="Título"
          />
          <select
            type="type"
            onChange={handleChange}
            value={weapon.type}
            name="type"
            placeholder="Seleccionar tipo"
          >
            "<option defaultValue="">Elige tipo de arma</option>
            <option value="AR">Rifle de asalto</option>
            <option value="BR">Fusil de combate</option>
            <option value="SMG">Subfusil</option>
            <option value="SG">Escopeta</option>
            <option value="LMG">Ametralladora ligera</option>
            <option value="TR">Fusil táctico</option>
            <option value="SR">Francotirador</option>
            <option value="Pistola">Pistola</option>
          </select>

          <input
            type="text"
            onChange={handleChange}
            value={weapon.link}
            name="link"
            placeholder="Youtube"
          />
          <div className="labelFile">
            <h6>Imagen miniatura</h6>
            <input
              className="inputFile"
              ref={inputFile1}
              type="file"
              onChange={handleFile}
              placeholder="Seleccionar imagen"
            />
          </div>

          <div className="labelFile">
            <h6>Imagen detalle</h6>
            <input
              className="inputFile"
              ref={inputFile2}
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
              value={weapon.meta}
              name="meta"
            />
          </div>

          {optionList.map((elem, index) => {
            return (
              <div className="mapAccCont">
                <div className="mapAcc">
                  <p>
                    <span>{elem.name}:</span> "{elem.desc}"
                  </p>
                  {/* {elem.name !== "Cargador" && (
                    <p className="opt1Opt2">
                      <span>Peso:</span> {elem.opt1 ? elem.opt1 : "0.00"} /{" "}
                      <span>{detailsTrad(elem.name)}</span> {elem.opt2 ? elem.opt2 : "0.00"}
                    </p>
                  )} */}
                </div>
                <p className="delAcc" onClick={() => handleDelAcc(index)}>
                  X
                </p>
              </div>
            );
          })}
          {optionList.length < 10 && (
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
              {/* {option.name !== "Cargador" && option.name !== "" && (
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
              )} */}
              <Button className="buttonAddAcc" onClick={handleOptionList}>
                Añadir accesorio
              </Button>
            </>
          )}
        </div>

        <p className="error">{error}</p>
      </Modal.Body>
      <Modal.Footer>
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
