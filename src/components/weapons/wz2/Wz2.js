import React, { useState } from "react";
import { Button } from "react-bootstrap";

import "./wz2.scss";
import { UploadWeapon } from "../../upload/UploadWeapon";

export const Wz2 = () => {
  const [wType, setWType] = useState("");
  const [show, setShow] = useState(false);

  console.log(wType);
  return (
    <>
    
    <div className="principalWz2">
      <h2>Warzone 2</h2>
      <h6>Selecciona tipo de arma</h6>
      <div className="contentNavs">
        <section className="weaponsNav1">
          <Button onClick={()=>setWType("AR")} id={`${wType == "AR" && "selected"}`}>AR</Button>
          <Button onClick={()=>setWType("BR")} id={`${wType == "BR" && "selected"}`}>BR</Button>
          <Button onClick={()=>setWType("SMG")} id={`${wType == "SMG" && "selected"}`}>SMG</Button>
          <Button onClick={()=>setWType("SG")} id={`${wType == "SG" && "selected"}`}>SG</Button>
        </section>
        <section className="weaponsNav2">
          <Button onClick={()=>setWType("LMG")} id={`${wType == "LMG" && "selected"}`}>LMG</Button>
          <Button onClick={()=>setWType("TR")} id={`${wType == "TR" && "selected"}`}>TR</Button>
          <Button onClick={()=>setWType("SR")} id={`${wType == "SR" && "selected"}`}>SR</Button>
          <Button onClick={()=>setWType("PS")} id={`${wType == "PS" && "selected"}`}>Pistola</Button>
        </section>
       
      </div>
      <div></div>
        <Button className="addWeapon" onClick={()=>setShow(!show)}>Añadir arma</Button>
    </div>
    <UploadWeapon setShow={setShow} show={show} />
    </>
  );
};
