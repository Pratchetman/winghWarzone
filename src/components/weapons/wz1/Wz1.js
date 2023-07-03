import React, { useContext, useEffect, useRef, useState } from "react";
import { Button } from "react-bootstrap";
import { getDatabase, ref, set, get, child, remove } from "firebase/database";

import "./wz1.scss";
import { WinghavenContext } from "../../../context/WinghavenContext";
import { useNavigate } from "react-router-dom";
import { UploadWeaponWz1 } from "../../upload/UploadWeaponWz1";

export const Wz1 = () => {
  const { logged } = useContext(WinghavenContext);
  const [wType, setWType] = useState("");
  const [show, setShow] = useState(false);
  const [weapons, setWeapons] = useState([]);
  const [FiltWeapons, setFiltWeapons] = useState([]);
  const [search, setSearch] = useState("");
  const [aux, setAux] = useState(true);
  const [qty2, setQty2] = useState(0);
  const [listen, setListen] = useState(false);
  const searcher = useRef();
  const navigate = useNavigate();
  useEffect(() => {
    const dbRef = ref(getDatabase());
    const scroll = new Promise((resolve, reject) => {
      window.scroll({ top: 0 });
      console.log("hago scroll hacia arriba");
      resolve(true);
    });

    scroll.then(() => {
      get(child(dbRef, `wz1/`))
        .then((snapshot) => {
          if (snapshot.exists()) {
            setWeapons(
              Object.values(snapshot.val()).sort((a, b) => b.id - a.id)
            );
            setFiltWeapons(
              Object.values(snapshot.val()).sort((a, b) => b.id - a.id)
            );
          } else {
            console.log("No data available");
          }
        })
        .then(() => {
          setQty2(10);
          setListen(true);
          
        })
        .catch((error) => {
          console.error(error);
        });
    });

    return () => {
      window.removeEventListener("scroll", listenScroll);
    };
  }, [aux]);

  function listenScroll() {
    if (listen === true){
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 150
      ) {
        setQty2(qty2 + 10);
      }
    }
  }

  window.addEventListener("scroll", listenScroll);

  console.log(qty2);

  const handleWType = (e) => {
    if (wType === e) {
      setWType("");
      setFiltWeapons(weapons);
      setQty2(10);
      setSearch("");
      searcher.current.value = "";
    } else {
      setWType(e);
      if (e === "Meta") {
        setFiltWeapons(weapons.filter((elem) => elem.meta === true));
        setQty2(10);
        setSearch("");
        searcher.current.value = "";
      } else {
        setFiltWeapons(weapons.filter((elem) => elem.type === e));
        setQty2(10);
        setSearch("");
        searcher.current.value = "";
      }
    }
  };

  const handleKey = (e) =>{
    if (e.key === "Enter"){
      document.getElementById("auxSearch").inputMode = "none";
      document.getElementById("auxSearch").focus();
      setFiltWeapons(
        weapons.filter((elem) =>
          elem.nombre.toLowerCase().includes(e.target.value.toLowerCase())
        )
      );
      setWType("");
      setQty2(10);
    }
  }

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
  const handleFocus = (e) => {
    document.getElementById("searching").inputMode = "text";
  };

  console.log(wType);
  return (
    <>
      <div className="principalWz1">
        <h2>Warzone 1</h2>
        <hr />
        <div className="dflex jcBetween">
          <h6>Selecciona tipo de arma</h6>
          <div className="dflex">
            <img src="./images/search.png" alt="" />
            <input
              id="searching"
              onFocus={handleFocus}
              type="text"
              ref={searcher}
              onChange={handleSearch}
              onKeyDown={handleKey}
              placeholder="Buscar arma"
              value={search}
            />
            <input value="text" id="auxSearch" />
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
              onClick={() => handleWType("Pistola")}
              id={`${wType === "Pistola" && "selected"}`}
            >
              Pistola
            </Button>
          </section>
        </div>
        <div className="metaBtn">
          <Button
            onClick={() => handleWType("Meta")}
            id={`${wType === "Meta" && "selected"}`}
          >
            META
          </Button>
        </div>
        <p className="mostrando">Mostrando {FiltWeapons.length} resultados.</p>
        {logged && (
          <div className="addWp" onClick={() => setShow(!show)}>
            <img src="./images/plus.png" alt="" />
          </div>
        )}
        <div className="cardsContainer">
          {FiltWeapons.length > 0 &&
            FiltWeapons.map((elem, index) => {
              if (index < qty2) {
                return (
                  <div
                    key={index}
                    className={`weaponCard ${elem.type}`}
                    onClick={() => navigate(`/wz1/${elem.id}`)}
                  >
                    <div className="titleWp">
                      <p>{elem.nombre}</p>
                      <p>
                        <span>Tipo de arma</span>&nbsp;&nbsp; {elem.type}
                      </p>
                    </div>
                    <div className="weapon">
                      <img className="imgWp" src={elem.img} alt="" />
                      {elem.meta === true && (
                        <img
                          className="logoMeta"
                          src="./images/logoMeta.png"
                          alt=""
                        />
                      )}
                    </div>
                  </div>
                );
              }
            })}
        </div>
      </div>

      {show && (
        <UploadWeaponWz1
          setShow={setShow}
          show={show}
          aux={aux}
          setAux={setAux}
        />
      )}
    </>
  );
};
