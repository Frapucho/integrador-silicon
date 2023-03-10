import { Link } from "react-router-dom";
import login from "./Login";
import React, {useState, useEffect, useRef} from 'react';
import Dropdown from 'react-bootstrap/Dropdown';


function Nav() {
  let token = localStorage.getItem('token');
  
const [open, setOpen] = useState(false);

  let menuRef = useRef();

  useEffect(() => {
    let handler = (e)=>{
      if(!menuRef.current.contains(e.target)){
        setOpen(false);
        console.log(menuRef.current);
      }      
    };

    document.addEventListener("mousedown", handler);
    

    return() =>{
      document.removeEventListener("mousedown", handler);
    }

  });

  if (token) {
    return (
      <>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container">
            <Link to="/" className="navbar-brand">
              <img src="/logo.png" className="nav-img-main" />
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
                <li className="nav-item">
                  <Link to="/" className="nav-link active">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/about" className="nav-link">
                    About
                  </Link>
                </li>
                
                <li className="nav-item">
                  <Link to="/alumno/grid" className="nav-link">
                    Lista de alumnos
                  </Link>
                </li>
                
                <li className="nav-item">
                  <Link to="/cursosP" className="nav-link">
                    Cursos
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/cursosList" className="nav-link">
                    Lista de Cursos
                  </Link>
                </li>
                
              </ul>
              <ul className="navbar-nav me-auto mb-2 mb-lg-0" style={{ marginLeft: "auto" }}>
                <Dropdown >
                <Dropdown.Toggle variant="primary" id="dropdown-basic" >
                    Perfil
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item><h5>{localStorage.getItem('nickname')}<br/></h5></Dropdown.Item>
                    <Dropdown.Item href="#/action-3"><li className="nav-item">
                              <Link to="/" className="nav-link" onClick={() => {
                                localStorage.removeItem('token');
                                window.location.href = '/';
                              }}>
                                Cerrar sesion
                              </Link>
                            </li></Dropdown.Item>
                  </Dropdown.Menu>
                  </Dropdown>
                </ul>
            </div>
          </div>
        </nav>
      </>);

  }
  else {

    return (
      <>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container">
            <Link to="/" className="navbar-brand">
              <img src="/logo.png" className="nav-img-main" />
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link to="/" className="nav-link active">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/about" className="nav-link">
                    About
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to="/cursosP" className="nav-link">
                    Cursos
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to="/login" className="nav-link">
                    Ingresar
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </>
    );
  }

}

export default Nav;