import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';


function About() {

  return (
    <>
      <Link to={`https://drive.google.com/file/d/12Vm_oNGRyoAnfIagLAZgG638L28KfSOB/view`}>
        <div className="d-grid gap-2">
          <Button variant="primary" size="lg">
            Enlace a las consignas del proyecto integrador
          </Button>
        </div>
      </Link>

      <h1>Integrantes del equipo de trabajo:</h1>

      <div className="d-flex flex-wrap justify-content-between">
      <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="https://avatars.githubusercontent.com/u/101330667?v=4" />
      <Card.Body>
        <Card.Title>Friedrich Facundo</Card.Title>
        <Card.Text>
          github user: Frapucho
        </Card.Text>
        <Link to={`https://github.com/Frapucho`}>
        <Button variant="primary">Link al perfil</Button>
        </Link>
      </Card.Body>
    </Card>

    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="https://avatars.githubusercontent.com/u/90575246?v=4" />
      <Card.Body>
        <Card.Title>Romero Matias</Card.Title>
        <Card.Text>
          github user: matiassebrom
        </Card.Text>
        <Link to={`https://github.com/matiassebrom`}>
        <Button variant="primary">Link al perfil</Button>
        </Link>
      </Card.Body>
    </Card>

    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="https://avatars.githubusercontent.com/u/99292894?v=4" />
      <Card.Body>
        <Card.Title>Parada Daniel</Card.Title>
        <Card.Text>
        github user: DanielParada95
        </Card.Text>
        <Link to={`https://github.com/DanielParada95`}>
        <Button variant="primary">Link al perfil</Button>
        </Link>
      </Card.Body>
    </Card>


      </div>

    </>
  );
}



export default About;


