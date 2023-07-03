import React, { useContext, useEffect, useRef, useState } from 'react';
import Collapse from 'react-bootstrap/Collapse'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { WinghavenContext } from '../../context/WinghavenContext';
import { getAuth } from "firebase/auth";
import "./nav.scss";
import { Session } from '../auth/Session';



export const NavB = () => {
  const {user, logged, setLogged} = useContext(WinghavenContext);
  const [toggle, setToggle] = useState(false);
  const [show, setShow] = useState(false);
 
  const toggleFunc = React.useCallback(() =>{
    setToggle(!toggle);
    console.log(toggle);
  })
  
  
 

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" fixed='top'>
    <Container className='containerNav'>
      <Navbar.Brand as={Link} to="/"><img  src="../images/logoSM.png" alt="" /></Navbar.Brand>
     
      <Navbar.Toggle aria-controls="responsive-navbar-nav" onClick={toggleFunc}/>
      <Navbar.Collapse id="responsive-navbar-nav" in={toggle}>
        <Nav className="me-auto toggleMenu">
          <Nav.Link as={Link} onClick={toggleFunc} id='linkNav' to="/">HOME  </Nav.Link>
          <Nav.Link as={Link} onClick={toggleFunc} id='linkNav' to="/setup">MI SETUP</Nav.Link>
          <Nav.Link as={Link} onClick={toggleFunc} id='linkNav' to="/memes">MEMES</Nav.Link>
          <Nav.Link as={Link} onClick={toggleFunc} id='linkNav' to="/rrss">REDES SOCIALES</Nav.Link>
          <Nav.Link as={Link} onClick={toggleFunc} id='linkNav' to="/about">SOBRE MI</Nav.Link>
          {logged && <Nav.Link as={Link} onClick={()=>setShow(!show)} id='linkNav' to="/about">CERRAR SESIÓN</Nav.Link>}
        </Nav>
        <Nav className="me-auto toggleBg">
          <Nav.Link as={Link}  id='linkNav' to="/">HOME  </Nav.Link>
          <Nav.Link as={Link}  id='linkNav' to="/setup">MI SETUP</Nav.Link>
          <Nav.Link as={Link}  id='linkNav' to="/memes">MEMES</Nav.Link>
          <Nav.Link as={Link}  id='linkNav' to="/rrss">REDES SOCIALES</Nav.Link>
          <Nav.Link as={Link}  id='linkNav' to="/about">SOBRE MI</Nav.Link>
       
        </Nav>
        {logged && <Nav >
          <div className='session'>
           
          <img onClick={()=>setShow(!show)} className='loggedImg' src="https://firebasestorage.googleapis.com/v0/b/wingh-eb474.appspot.com/o/aboutWeb.png?alt=media&token=5799f4eb-740f-4f83-bec7-d10af76f3763&_gl=1*82qzpz*_ga*MTkxNDI5MzA0NS4xNjg1MjEzNDAx*_ga_CW55HF8NVT*MTY4NjA2NDM5Ny4xMS4xLjE2ODYwNjYyOTEuMC4wLjA." alt="" />
          </div>
        </Nav>}
      </Navbar.Collapse>
    </Container>
    {show && <Session show={show} setShow={setShow}/>}
  </Navbar>
  )
}
