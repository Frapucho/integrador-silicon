
/* import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function About() {
  const [alumnos, setAlumnos] = useState([]);

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
    fetch("http://localhost:8080/api/alumnos", request)
      .then((response) => response.json())
      .then((data) => setAlumnos(data))
      .catch((error) => console.error(error));
  }, []);

  function handleDeleteAlumno(id) {
    let request = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        authorization: localStorage.getItem("token"),
      },
    };
    fetch(`http://localhost:8080/api/alumnos/${id}`, request)
      .then((response) => response.json())
      .then((data) => {
        if (data.code === 1) {
          alert(data.message);
          fetch("http://localhost:8080/api/alumnos", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              authorization: localStorage.getItem("token"),
            },
          })
            .then((response) => response.json())
            .then((data) => setAlumnos(data))
            .catch((error) => console.error(error));
        } else {
          alert(data.message);
        }
      })
      .catch((error) => console.error(error));
  }

  return (
    <div className="container">
      <h1>Lista de Alumnos</h1>
      <div className="row">
        <div className="col-2 text-end w-100">
          <Link to="/cursos/nuevo" className="btn btn-primary">
            Nuevo alumno
          </Link>
        </div>
      </div>
      <table className="table mt-5">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Dni</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {alumnos.map((alumno) => (
            <tr key={alumno.id}>
              <td>{alumno.nombre}</td>
              <td>{alumno.apellido}</td>
              <td>{alumno.dni}</td>
             

              <td>
                <button
                  className="btn btn-primary"
                  onClick={() => navigate(`/alumnos/edit/${alumno.id}`)}
                >
                  <i className="fas fa-edit"></i>
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDeleteAlumno(alumno.id)}
                >
                  <i className="fas fa-trash"></i>
                </button>
                <button
                  className="btn btn-success"
                  onClick={() => alert("Gestionar alumnos")}
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

export default About;




 */