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
import PersonaGest from "./persona/PersonaGest";
import PersonaGrid from "./persona/PersonaGrid";
import PersonaList from "./persona/PersonaList";

function App() {
  return (
    <BrowserRouter>
      <Menu />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/persona/list" element={<PersonaList />} />
          <Route path="/persona/grid" element={<PersonaGrid />} />
          <Route path="/persona/gest/:dni" element={<PersonaGest />} />
          <Route path="/persona/gest" element={<PersonaGest />} />

          <Route path="/texto/:text" element={<Texto />} />
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
  //   navigate('/persona/gest');
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
