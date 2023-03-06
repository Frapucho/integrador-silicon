import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const AlumnoGest = () => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [dni, setDNI] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchAlumno = async () => {
      try {
        const response = await fetch((`http://localhost:8080/api/alumnos/${id}`), {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            authorization: localStorage.getItem("token"),
          },
        }); 
        const alumno = await response.json();
        setNombre(alumno.nombre);
        setApellido(alumno.apellido);
        setDNI(alumno.dni);
      } catch (error) {
        console.error(error);
        alert("Error al cargar el alumno");
      }
    };
    if (id) {
      fetchAlumno();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newAlumno = { nombre, apellido, dni };
    try {
      const response = await fetch(
        id
          ? `http://localhost:8080/api/alumnos/${id}`
          : "http://localhost:8080/api/alumnos",
        {
          method: id ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            authorization: localStorage.getItem("token"),
          },
          body: JSON.stringify(newAlumno),
        }
      );
      if (response.ok) {
        navigate(-1);
      }
    } catch (error) {
      console.error(error);
      alert("Error al guardar el alumno");
    }
  };

  return (
    <div>
      <div className="container py-5 h-100">
        <div className="row d-flex align-items-center justify-content-center h-100">
          <div className="col-md-8 col-lg-7 col-xl-6">
            <img
              src="https://allshopconnect.com/assets/img/apptype/CubeJekX/20200908165706.png"
              className="img-fluid"
              alt="Phone image"
            />
          </div>
          <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
            <form onSubmit={handleSubmit}>
              <div className="form-outline mb-4">
                <label htmlFor="dni" className="form-label">
                  DNI
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="dni"
                  value={dni}
                  onChange={(e) => setDNI(e.target.value)}
                  required
                />
              </div>

              <div className="form-outline mb-4">
                <label htmlFor="nombre" className="form-label">
                  Nombre:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="nombre"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  required
                />
              </div>

              <div className="form-outline mb-4">
                <label htmlFor="apellido" className="form-label">
                  Apellido:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="apellido"
                  value={apellido}
                  onChange={(e) => setApellido(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary">
                {id ? "Editar Alumno" : "Agregar Alumno"}
                <span className="material-symbols-outlined center-align">save</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlumnoGest;