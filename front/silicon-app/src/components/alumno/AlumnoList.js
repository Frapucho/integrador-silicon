import React, { useState, useEffect } from "react";

import { useParams } from "react-router-dom";

function AlumnoList() {
  //const [cursos, setCursos] = useState([]);
  const [todosLosAlumnos, setTodosLosAlumnos] = useState([]);
  const [alumnosInscriptos, setAlumnosInscriptos] = useState([]);
  const [refresh, setRefresh] = useState(false);

  let alumnosNoInscriptos;
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    authorization: localStorage.getItem("token"),
  };
  const { id } = useParams();

  useEffect(() => {
    let request = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        authorization: localStorage.getItem("token"),
      },
    };
    //get de alumnos inscriptos
    fetch(`http://localhost:8080/api/cursos/alumnosInscriptos/${id}`, request)
      .then((response) => response.json())
      .then((data) => {
        setAlumnosInscriptos(data);
        console.log(data);
      })
      .catch((error) => console.error(error));
    //get de Todos los alumnos inscriptos
    fetch(`http://localhost:8080/api/alumnos`, request)
      .then((response) => response.json())
      .then((data) => {
        setTodosLosAlumnos(data);
        console.log(data);
      })
      .catch((error) => console.error(error));
  }, [id, refresh]);

  //Lista que ve
  alumnosNoInscriptos = todosLosAlumnos.filter(
    (alumno) =>
      !alumnosInscriptos.find((inscripto) => inscripto.id === alumno.id)
  );

  // función para inscribir a un alumno en un curso
  const inscribirAlumno = (idCurso, idAlumno) => {
    console.log(idCurso);
    console.log(idAlumno);

    // enviar solicitud POST al endpoint correspondiente
    fetch(`http://localhost:8080/api/cursos/${idCurso}/inscribir`, {
      method: "POST",
      body: JSON.stringify({ id_alumno: idAlumno }),
      headers: headers,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setRefresh(!refresh);
      })
      .catch((error) => console.error(error))
      .finally(() => setRefresh(!refresh));
  };

  // función para desinscribir a un alumno de un curso
  const desInscribirAlumno = (idCurso, idAlumno) => {
    // enviar solicitud DELETE al endpoint correspondiente
    fetch(`http://localhost:8080/api/cursos/${idCurso}/desInscribir`, {
      method: "DELETE",
      body: JSON.stringify({ id_alumno: idAlumno }),
      headers: headers,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setRefresh(!refresh);
      })
      .catch((error) => console.error(error))
      .finally(() => setRefresh(!refresh));
  };

  return (
    <div className="container">
      <h1>Lista de inscriptos</h1>
      <table className="table mt-5">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>

            <th>Quitar Alumno</th>
          </tr>
        </thead>
        <tbody>
          {alumnosInscriptos.map((alumno) => (
            <tr key={alumno.id}>
              <td>{alumno.nombre}</td>
              <td>{alumno.apellido}</td>

              <td>
                <button
                  className="btn btn-primary"
                  onClick={() => desInscribirAlumno(id, alumno.id)}
                >
                  <i className="fas fa-edit"></i>
                </button>
              </td>
            </tr>
          ))}{" "}
        </tbody>
      </table>
      <h1>Lista de NO inscriptos</h1>
      <table className="table mt-5">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>

            <th>Agregar Alumno</th>
          </tr>
        </thead>
        <tbody>
          {alumnosNoInscriptos.map((alumno) => (
            <tr key={alumno.id}>
              <td>{alumno.nombre}</td>
              <td>{alumno.apellido}</td>

              <td>
                <button
                  className="btn btn-primary"
                  onClick={() => inscribirAlumno(id, alumno.id)}
                >
                  <i className="fas fa-edit"></i>
                </button>
              </td>
            </tr>
          ))}{" "}
        </tbody>
      </table>
    </div>
  );
}

export default AlumnoList;
