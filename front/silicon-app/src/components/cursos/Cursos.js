import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from "react-router-dom";

function Cursos() {
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

    <div className="container ">
      <h1>Lista de Cursos</h1>
      <div className="row">
        
      {cursos.map((cursos) => (
          <div className="col-4" key={cursos.id}>
            <Card style={{ width: '18rem' }}>
              <Card.Img variant="top" src={cursos.imagen} />
              <Card.Body>
                <Card.Title>{cursos.nombre}</Card.Title>
                <Card.Text>
                {cursos.descripcion}
                </Card.Text>
              
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Cursos;
