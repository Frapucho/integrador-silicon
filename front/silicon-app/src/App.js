import {
  BrowserRouter,
  Routes,
  Route,
  useParams,
  useSearchParams,
  useNavigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Home from "./components/home";
import Nav from "./components/Nav";
import Login from "./components/Login";
import AlumnoGest from "./components/alumno/AlumnoGest";
import AlumnoGrid from "./components/alumno/AlumnoGrid";
import AlumnoList from "./components/alumno/AlumnoList";
import Cursos from "./components/cursos/Cursos";
import CursosList from "./components/cursos/CursosList";
import CursosForm from "./components/cursos/CursosForm";
import About from "./About";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/about" element={<About />} />
          <Route path="/" element={<Home />} />
          <Route path="/alumno/insc/:id" element={<AlumnoList />} />
          <Route path="/alumno/grid" element={<AlumnoGrid />} />
          <Route path="/alumno/gest/:id" element={<AlumnoGest />} />
          <Route path="/alumno/gest" element={<AlumnoGest />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/texto/:text" element={<Texto />} />

          <Route path="/cursosP" element={<Cursos />} />
          <Route path="/cursosList" element={<CursosList />} />
          <Route path="/cursos/nuevo" element={<CursosForm />} />
          <Route path="/cursos/edit/:id" element={<CursosForm />} />
        </Routes>
      </div>
      <ToastContainer />
    </BrowserRouter>
  );
}

function Texto() {
  const { text } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  let mode = searchParams.get("mode");
  // setTimeout(() => {
  //   navigate('/alumno/gest');
  // }, 5000);
  return (
    <>
      <header>
        <Nav />
      </header>
      <div className={mode === "dark" ? "dark-content" : ""}>
        Texto Parametro: {text}
        <br />
        Nombre Search: {searchParams.get("nombre")}
        <br />
        Apellido Search: {searchParams.get("apellido")}
        <br />
        <button onClick={() => navigate(-1)}>← Back</button>
        <button onClick={() => navigate("/texto/test")}>← text</button>
      </div>
    </>
  );
}

export default App;
