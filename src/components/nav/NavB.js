import React, { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { WinghavenContext } from '../../context/WinghavenContext';
import { getAuth } from "firebase/auth";
import "./nav.scss";
import { Button } from 'react-bootstrap';


export const NavB = () => {
  const {user, logged, setLogged} = useContext(WinghavenContext)

  const handleSession = () =>{
    getAuth().signOut()
    .then(()=>{
      console.log("sesión cerrada correctamente")
      setLogged(!logged)
    })
    .catch((error)=>{
     console.log("error al cerrar sesion", error)
    })
  }

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
    <Container className='containerNav'>
      <Navbar.Brand as={Link} to="/"><img src="images/logoSM.png" alt="" /></Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/">HOME</Nav.Link>
          <Nav.Link as={Link} to="/setup">MI SETUP</Nav.Link>
          <Nav.Link as={Link} to="/memes">MEMES</Nav.Link>
          <Nav.Link as={Link} to="/rrss">REDES SOCIALES</Nav.Link>
          <Nav.Link as={Link} to="/about">SOBRE MI</Nav.Link>
       
        </Nav>
        {logged && <Nav >
          <div className='session'>
           
          <img onClick={handleSession} className='loggedImg' src="https://firebasestorage.googleapis.com/v0/b/wingh-eb474.appspot.com/o/aboutWeb.png?alt=media&token=5799f4eb-740f-4f83-bec7-d10af76f3763&_gl=1*82qzpz*_ga*MTkxNDI5MzA0NS4xNjg1MjEzNDAx*_ga_CW55HF8NVT*MTY4NjA2NDM5Ny4xMS4xLjE2ODYwNjYyOTEuMC4wLjA." alt="Pulsa para cerrar sesión" />
          </div>
        </Nav>}
      </Navbar.Collapse>
    </Container>
  </Navbar>
  )
}
