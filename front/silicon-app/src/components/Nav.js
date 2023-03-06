import { Link } from "react-router-dom";
import login from "./Login";



function Nav() {
  let token = localStorage.getItem('token');


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
                  <Link to="/alumno/list" className="nav-link">
                    Listar Alumnos
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/alumno/grid" className="nav-link">
                    Grilla de Alumnos
                  </Link>
                </li>
                
                <li className="nav-item">
                  <Link to="/cursos" className="nav-link">
                    Cursos
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/cursosList" className="nav-link">
                    CursosList
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/login" className="nav-link">
                    Sesion Activa
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/" className="nav-link" onClick={() => {
                    localStorage.removeItem('token');
                    window.location.href = '/';
                  }}>
                    Cerrar sesion
                  </Link>
                </li>
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
                  <Link to="/cursos" className="nav-link">
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