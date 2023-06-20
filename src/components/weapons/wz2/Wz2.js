import React, { useContext, useEffect, useRef, useState } from "react";
import { Button } from "react-bootstrap";
import { getDatabase, ref, set, get, child, remove } from "firebase/database";
import { getStorage, ref as ref2, deleteObject } from "firebase/storage";
import "./wz2.scss";
import { UploadWeapon } from "../../upload/UploadWeapon";
import { WinghavenContext } from "../../../context/WinghavenContext";

export const Wz2 = () => {
  const { logged } = useContext(WinghavenContext);
  const [wType, setWType] = useState("");
  const [show, setShow] = useState(false);
  const [weapons, setWeapons] = useState([]);
  const [FiltWeapons, setFiltWeapons] = useState([]);
  const [search, setSearch] = useState("");
  const searcher = useRef();

  useEffect(() => {
    const dbRef = ref(getDatabase());
    get(child(dbRef, `wz2/`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setWeapons(Object.values(snapshot.val()).sort((a, b) => b.id - a.id));
          setFiltWeapons(
            Object.values(snapshot.val()).sort((a, b) => b.id - a.id)
          );
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [setWeapons]);

  const handleWType = (e) => {
    if (wType === e) {
      setWType("");
      setFiltWeapons(weapons);
      setSearch("");
      searcher.current.value= "";
    } else {
      setWType(e);
      setFiltWeapons(weapons.filter((elem) => elem.type === e));
      setSearch("");
      searcher.current.value= "";
    }
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);

    setFiltWeapons(
      weapons.filter((elem) => elem.nombre.toLowerCase().includes(e.target.value.toLowerCase()))
    );
    setWType("");
  };

  console.log(wType);
  return (
    <>
      <div className="principalWz2">
        <h2>Warzone 2</h2>
        <hr />
        <div className="dflex jcBetween">
          <h6>Selecciona tipo de arma</h6>
          <div className="dflex">
            <img src="./images/search.png" alt="" />
            <input
              type="text"
              ref={searcher}
              onChange={handleSearch}
              placeholder="Buscar arma"
              value={search}
            />
          </div>
        </div>

        <div className="contentNavs">
          <section className="weaponsNav1">
            <Button
              onClick={() => handleWType("AR")}
              id={`${wType === "AR" && "selected"}`}
            >
              AR
            </Button>
            <Button
              onClick={() => handleWType("BR")}
              id={`${wType === "BR" && "selected"}`}
            >
              BR
            </Button>
            <Button
              onClick={() => handleWType("SMG")}
              id={`${wType === "SMG" && "selected"}`}
            >
              SMG
            </Button>
            <Button
              onClick={() => handleWType("SG")}
              id={`${wType === "SG" && "selected"}`}
            >
              SG
            </Button>
          </section>
          <section className="weaponsNav2">
            <Button
              onClick={() => handleWType("LMG")}
              id={`${wType === "LMG" && "selected"}`}
            >
              LMG
            </Button>
            <Button
              onClick={() => handleWType("TR")}
              id={`${wType === "TR" && "selected"}`}
            >
              TR
            </Button>
            <Button
              onClick={() => handleWType("SR")}
              id={`${wType === "SR" && "selected"}`}
            >
              SR
            </Button>
            <Button
              onClick={() => handleWType("PS")}
              id={`${wType === "PS" && "selected"}`}
            >
              Pistola
            </Button>
          </section>
        </div>
        <p className="mostrando">Mostrando {FiltWeapons.length} resultados.</p>
        <div className="cardsContainer">
          {FiltWeapons.map((elem, index) => {
            return (
              <div className={`weaponCard ${elem.type}`}>
                <div className="titleWp">
                  <p>{elem.nombre}</p>
                  <p>
                    <span>Tipo de arma</span>&nbsp;&nbsp; {elem.type}
                  </p>
                </div>
                <div className="weapon">
                  <img src={elem.img} alt="" />
                </div>
              </div>
            );
          })}
        </div>
        {logged && (
          <Button className="addWeapon" onClick={() => setShow(!show)}>
            Añadir arma
          </Button>
        )}
      </div>
      <UploadWeapon setShow={setShow} show={show} />
    </>
  );
};
