/* import React, { useState, useEffect } from 'react';
import axios from 'axios';



function About() {
  const [alumnos, setAlumnos] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/alumnos')
      .then(response => {
        setAlumnos(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <h1>Alumnos</h1>
      <ul>
        {alumnos.map(alumno => (
          <li key={alumno.id}>{alumno.nombre}</li>
        ))}
      </ul>
    </div>
  );
}



export default About;
 */

