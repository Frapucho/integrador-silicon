import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useParams,
  useSearchParams,
  useNavigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Home from "./home";
import Menu from "./Menu";
import Login from "./Login";
import AlumnoGest from "./alumno/AlumnoGest";
import AlumnoGrid from "./alumno/AlumnoGrid";
import AlumnoList from "./alumno/AlumnoList";
import Cursos from "./components/cursos/Cursos";
import CursosList from "./components/cursos/CursosList";
import CursosForm from "./components/cursos/CursosForm";

function App() {
  return (
    <BrowserRouter>
      <Menu />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/alumno/list" element={<AlumnoList />} />
          <Route path="/alumno/grid" element={<AlumnoGrid />} />
          <Route path="/alumno/gest/:dni" element={<AlumnoGest />} />
          <Route path="/alumno/gest" element={<AlumnoGest />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/texto/:text" element={<Texto />} />

          <Route path="/cursos" element={<Cursos />} />
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
      <Menu />
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
