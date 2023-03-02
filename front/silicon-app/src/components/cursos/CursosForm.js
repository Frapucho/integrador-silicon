import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const CursosForm = () => {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [imagen, setImagen] = useState("");
  const [anio, setAnio] = useState("");
  const [activo, setActivo] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchCurso = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/cursos/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            authorization: localStorage.getItem("token"),
          },
        });
        const curso = await response.json();
        setNombre(curso.nombre);
        setDescripcion(curso.descripcion);
        setImagen(curso.imagen);
        setAnio(curso.anio);
        setActivo(curso.activo);
      } catch (error) {
        console.error(error);
        alert("Error al cargar el curso");
      }
    };
    if (id) {
      fetchCurso();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newCurso = { nombre, descripcion, imagen, anio, activo };
    console.log(newCurso);
    try {
      const response = await fetch(
        id
          ? `http://localhost:8080/api/cursos/${id}`
          : "http://localhost:8080/api/cursos",

        {
          method: id ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            authorization: localStorage.getItem("token"),
          },
          body: JSON.stringify(newCurso),
        }
      );
      if (response.ok) {
        navigate(-1);
      }
    } catch (error) {
      console.error(error);
      alert("Error al guardar el curso");
    }
  };

  return (
    <div className="container">
      <h1>{id ? "Editar Curso" : "Agregar curso"}</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">
            Nombre
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
        <div className="mb-3">
          <label htmlFor="descripcion" className="form-label">
            Descripción
          </label>
          <textarea
            className="form-control"
            id="descripcion"
            rows="3"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="imagen" className="form-label">
            Imagen
          </label>
          <input
            type="text"
            className="form-control"
            id="imagen"
            value={imagen}
            onChange={(e) => setImagen(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="anio" className="form-label">
            Año
          </label>
          <input
            type="number"
            className="form-control"
            id="anio"
            value={anio}
            onChange={(e) => setAnio(e.target.value)}
            required
          />
        </div>
        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="activo"
            checked={activo}
            onChange={(e) => setActivo(e.target.checked)}
          />
          <label className="form-check-label" htmlFor="activo">
            Activo
          </label>
        </div>
        <button type="submit" className="btn btn-primary">
          {id ? "Editar Curso" : "Agregar curso"}
        </button>
        <button onClick={() => navigate(-1)} className="btn btn-danger">
          Cancelar
        </button>
      </form>
    </div>
  );
};

export default CursosForm;
