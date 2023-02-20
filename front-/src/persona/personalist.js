import React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Menu from "../Menu";

class PersonaList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      personas: [],
    };
    this.onDelete = this.onDelete.bind(this);
  }

  onDelete(dni) {
    let request = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };

    fetch(`http://localhost:8080/api/persona/${dni}`, request)
      .then((res) => {
        return res.json().then((body) => {
          return {
            status: res.status,
            ok: res.ok,
            headers: res.headers,
            body: body,
          };
        });
      })
      .then((result) => {
        if (result.ok) {
          toast.success(result.body.message, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          this.componentDidMount();
        } else {
          toast.error(result.body.message, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      });
  }

  componentDidMount() {
    fetch("http://localhost:8080/api/persona")
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
          this.setState({
            personas: result,
          });
        },
        // Nota: es importante manejar errores aquí y no en
        // un bloque catch() para que no interceptemos errores
        // de errores reales en los componentes.
        (error) => {
          console.log(error);
          this.setState({
            error,
            personas: [],
          });
        }
      );
  }
  render() {
    let rowsTable = this.state.personas.map((persona, index) => {
      return (
        <tr key={index}>
          <td>{persona.dni}</td>
          <td>{persona.nombre}</td>
          <td>{persona.apellido}</td>
          <td>
            <Link to={`/persona/gest/${persona.dni}`}>
              <button className="btn btn-primary">
                <span class="material-symbols-outlined">edit</span>
              </button>
            </Link>
            <button
              type="submit"
              className="btn btn-danger"
              onClick={() => this.onDelete(persona.dni)}
            >
              <span class="material-symbols-outlined center-align">
                delete_forever
              </span>
              <span></span>
            </button>
          </td>
        </tr>
      );
    });

    return (
      <>
        <h1>Lista de personas</h1>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>DNI</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>{rowsTable}</tbody>
        </table>
      </>
    );
  }
}

export default PersonaList;
