import React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

class CursoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cursoToDelete: {},
      modalConfirmarEliminacion: false,
      cursos: []
    };
    this.onDelete = this.onDelete.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
  }

  handleClose() {
    this.setState({
      modalConfirmarEliminacion: false
    });
  }
  handleOpen(curso) {
    this.setState({
      cursoToDelete: curso,
      modalConfirmarEliminacion: true
    });
  }

  onDelete() {
    let request = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "Accept": 'application/json',
        authorization: localStorage.getItem("token")
      }
    };

    fetch(`http://localhost:8080/api/cursos/${this.state.cursoToDelete.id}`, request)
      .then(res => {
        return res.json().then(body => {
          return {
            status: res.status,
            ok: res.ok,
            headers: res.headers,
            body: body
          };
        });
      })
      .then(result => {
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
    let request = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "Accept": 'application/json',
        "authorization": localStorage.getItem('token')
      }
    };
    fetch("http://localhost:8080/api/cursos/", request)
      .then(res => {
        return res.json().then(body => {
          return {
            status: res.status,
            ok: res.ok,
            headers: res.headers,
            body: body
          };
        });
      })
      .then(result => {
        if (result.ok) {
          this.setState({
            modalConfirmarEliminacion: false,
            cursos: result.body
          });
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

      },

        (error) => {
          console.log(error);
          this.setState({
            error,
            cursos: [],
            modalConfirmarEliminacion: false
          });
        }
      )
  }
  render() {
    let rowsTable = this.state.cursos.map((curso, index) => {
      return (
        <tr key={index}>
          <td>{curso.nombre}</td>
          <td>{curso.descripcion}</td>
          <td><img src={curso.imagen} alt={curso.nombre} width="50" /></td>
          <td>{curso.anio}</td>
          <td>{curso.activo ? "si" : "no"}</td>
          <td>
            <Link to={`/cursos/edit/${curso.id}`}>
              <button className="btn btn-primary">
                <span class="material-symbols-outlined">
                  edit
                </span>
              </button>
            </Link>

            <button type="submit" className="btn btn-danger" onClick={() => this.handleOpen(curso)}>
              <span class="material-symbols-outlined center-align">
                delete_forever
              </span>
              <span>
              </span>
            </button>

            <Link to={`/alumno/insc/${curso.id}`}>
            <button
                  className="btn btn-success">
                  <i className="fas fa-user-graduate"></i>
                </button>
                </Link>
          </td>
        </tr>
      )
    });

    return (
      <>
        <div>
          <h1>Lista de cursos</h1>

        </div>
        <table className="table table-bordered" >
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Imagen</th>
              <th>Año</th>
              <th>Activo</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {rowsTable}
          </tbody>
        </table>
        <div className="row">
          <div className="col-2 text-end w-100">
            <Link to="/alumno/gest/:" className="btn btn-primary">
              Nuevo curso
            </Link>
          </div>
        </div>
        <Modal
          show={this.state.modalConfirmarEliminacion}
          onHide={this.handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton className="light-content">
            <Modal.Title>Confirmar eliminacion</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Esta seguro que desea eliminar el curso: <strong>{this.state.cursoToDelete.nombre}</strong>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="outline-warning" onClick={this.handleClose}>
              Cerrar
            </Button>
            <Button variant="outline-danger" onClick={this.onDelete}>Eliminar</Button>
          </Modal.Footer>
        </Modal>
      </>

    );
  }
}

export default CursoList;
 