import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function Cursos() {
  const [cursos, setCursos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/cursosP")
      .then((response) => response.json())
      .then((data) => setCursos(data));
  }, []);

  return (
    <div className="container">
      <h1>Lista de cursos</h1>
      <div className="row">
        {cursos.map((curso) => (
          <div className="col-md-4 mb-3" key={curso.id}>
            <div className="card border-primary">
                <img
                src={curso.imagen}
                className="card-img-top"
                alt={curso.nombre}
                width="200" height="200"
              /> 
              <h5 className="card-title  text-center p-2">{curso.nombre}</h5>
              <div className="card-body">
                <p className="card-text">{curso.descripcion}</p>
                <p className="card-text">
                  <small className="text-muted">{curso.anio}</small>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Cursos;
