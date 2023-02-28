import React from "react";

class AlumnoGrid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      alumnos: [],
    };
  }

  componentDidMount() {
    fetch("http://localhost:8080/api/alumno")
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
          this.setState({
            alumnos: result,
          });
        },

        (error) => {
          console.log(error);
          this.setState({
            error,
            alumnos: [],
          });
        }
      );
  }
  render() {
    return (
      <>
        <h1>Lista de Alumnos</h1>
        {this.state.alumnos.map((alumno, index) => {
          return (
            <div key={index} className="row">
              <div className="col">
                <strong>DNI: </strong>
                <span>{alumno.dni}</span>
                <br />
                <strong>Nombre: </strong>
                <span>{alumno.nombre}</span>
                <br />
                <strong>apellido: </strong>
                <span>{alumno.apellido}</span>
                <hr />
              </div>
            </div>
          );
        })}
      </>
    );
  }
}

export default AlumnoGrid;
