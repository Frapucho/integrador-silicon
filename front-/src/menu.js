import { Link } from "react-router-dom";

function Menu() {
    return <>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container">
                <Link to="/" className="navbar-brand">
                    <img src="/logo.png" className="nav-img-main" />
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link to="/" className="nav-link active">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/about" className="nav-link">About</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/persona/list" className="nav-link">Listar Personas</Link>
                        </li> 
                        <li className="nav-item">
                            <Link to="/persona/grid" className="nav-link">Grilla Personas</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/persona/gest" className="nav-link">Gestion Personas</Link>
                        </li>
                    </ul>
                </div>

            </div>
        </nav>
    </>
}

export default Menu;