import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function CursoList() {
  const [cursos, setCursos] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    let request = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        authorization: localStorage.getItem("token"),
      },
    };
    fetch("http://localhost:8080/api/cursos", request)
      .then((response) => response.json())
      .then((data) => setCursos(data))
      .catch((error) => console.error(error));
  }, []);

  function handleDeleteCurso(id) {
    let request = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        authorization: localStorage.getItem("token"),
      },
    };
    fetch(`http://localhost:8080/api/cursos/${id}`, request)
      .then((response) => response.json())
      .then((data) => {
        if (data.code === 1) {
          alert(data.message);
          fetch("http://localhost:8080/api/cursos", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              authorization: localStorage.getItem("token"),
            },
          })
            .then((response) => response.json())
            .then((data) => setCursos(data))
            .catch((error) => console.error(error));
        } else {
          alert(data.message);
        }
      })
      .catch((error) => console.error(error));
  }

  return (
    <div className="container">
      <h1>Lista de Cursos</h1>
      <div className="row">
        <div className="col-2 text-end w-100">
          <Link to="/cursos/nuevo" className="btn btn-primary">
            Nuevo curso
          </Link>
        </div>
      </div>
      <table className="table mt-5">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Imagen</th>
            <th>Año</th>
            <th>Activo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {cursos.map((curso) => (
            <tr key={curso.id}>
              <td>{curso.nombre}</td>
              <td>{curso.descripcion}</td>
              <td>
                <img src={curso.imagen} alt={curso.nombre} width="50" />
              </td>
              <td>{curso.anio}</td>
              <td>{curso.activo ? "si" : "no"}</td>

              <td>
                <button
                  className="btn btn-primary"
                  onClick={() => navigate(`/cursos/edit/${curso.id}`)}
                >
                  <i className="fas fa-edit"></i>
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDeleteCurso(curso.id)}
                >
                  <i className="fas fa-trash"></i>
                </button>
                <button
                  className="btn btn-success"
                  onClick={() => navigate(`/alumno/insc/${curso.id}`)}
                >
                  <i className="fas fa-user-graduate"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CursoList;
