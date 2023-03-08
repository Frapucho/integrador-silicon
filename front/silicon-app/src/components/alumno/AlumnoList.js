import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";

function AlumnoList() {
  const [cursos, setCursos] = useState([]);
  const [alumno, setAlumno] = useState([])

  const navigate = useNavigate();
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
    fetch(`http://localhost:8080/api/cursos/id/${id}` , request)
      .then((response) => response.json())
      .then((data) => setCursos(data))
      .catch((error) => console.error(error));
  }, []); 


 console.log(id)


  return (
    <div className="container">
      <h1>Lista de inscriptos</h1>
      
      <table className="table mt-5">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
          
            <th>email</th>
            
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {alumno.map((alumno) => (
            <tr key={alumno.id}>
              <td>{alumno.nombre}</td>
              <td>{alumno.apellido}</td>
              <td>{alumno.email}</td>

              <td>
                <button
                  className="btn btn-primary"
                  onClick={() => navigate(`/cursos/edit/${alumno.id}`)}
                >
                  <i className="fas fa-edit"></i>
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

export default AlumnoList;
