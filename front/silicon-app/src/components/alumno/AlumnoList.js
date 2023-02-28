import React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

class AlumnoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
<<<<<<< HEAD:front/silicon-app/src/components/alumno/AlumnoList.js
      alumnoToDelete: {},
      modalConfirmarEliminacion: false,
      alumno: [],
=======
      alumnoToDelete:{},
      modalConfirmarEliminacion:false,
      alumnos: []
>>>>>>> fdc59c1ab7ee5a361ee1647ab6d00573d530e67a:front/silicon-app/src/alumno/AlumnoList.js
    };
    this.onDelete = this.onDelete.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
  }

  handleClose() {
    this.setState({
      modalConfirmarEliminacion: false,
    });
  }
  handleOpen(alumno) {
    this.setState({
      alumnoToDelete: alumno,
      modalConfirmarEliminacion: true,
    });
  }

  onDelete() {
    let request = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };

<<<<<<< HEAD:front/silicon-app/src/components/alumno/AlumnoList.js
    fetch(
      `http://localhost:8080/api/alumno/${this.state.alumnoToDelete.dni}`,
      request
    )
      .then((res) => {
        return res.json().then((body) => {
=======
    fetch(`http://localhost:8080/api/alumnos/del/${this.state.alumnoToDelete.id}`, request)
      .then(res => {
        return res.json().then(body => {
>>>>>>> fdc59c1ab7ee5a361ee1647ab6d00573d530e67a:front/silicon-app/src/alumno/AlumnoList.js
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
    let request = {
      method: "GET",
      headers: {
<<<<<<< HEAD:front/silicon-app/src/components/alumno/AlumnoList.js
        "Content-Type": "application/json",
        Accept: "application/json",
        authorization: sessionStorage.getItem("token"),
=======
        'Content-Type': 'application/json',
        "Accept": 'application/json',
         "authorization":sessionStorage.getItem('token')
      }
    }; 
    fetch("http://localhost:8080/api/alumnos",request)
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
            alumnos: result.body
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
        
>>>>>>> fdc59c1ab7ee5a361ee1647ab6d00573d530e67a:front/silicon-app/src/alumno/AlumnoList.js
      },
    };
    fetch("http://localhost:8080/api/alumno", request)
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
      .then(
        (result) => {
          if (result.ok) {
            this.setState({
              modalConfirmarEliminacion: false,
              alumnos: result.body,
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
            alumnos: [],
            modalConfirmarEliminacion: false,
          });
        }
      );
  }
  render() {
    let rowsTable = this.state.alumnos.map((alumno, index) => {
      return (
        <tr key={index}>
          <td>{alumno.dni}</td>
          <td>{alumno.nombre}</td>
          <td>{alumno.apellido}</td>
          <td>
<<<<<<< HEAD:front/silicon-app/src/components/alumno/AlumnoList.js
            <Link to={`/alumno/gest/${alumno.dni}`}>
              <button className="btn btn-primary">
                <span class="material-symbols-outlined">edit</span>
              </button>
            </Link>
            <button
              type="submit"
              className="btn btn-danger"
              onClick={() => this.handleOpen(alumno)}
            >
=======
            <Link to={`/alumno/gest/${alumno.id}`}>
              <button className="btn btn-outline-warning">
                <span class="material-symbols-outlined">
                  edit
                </span>
              </button>
            </Link>
            <button type="submit" className="btn btn-outline-danger" onClick={() => this.handleOpen(alumno)}>
>>>>>>> fdc59c1ab7ee5a361ee1647ab6d00573d530e67a:front/silicon-app/src/alumno/AlumnoList.js
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
      <div>
        <h1>Lista de alumnos</h1>
        
      </div>
        <table className="table table-bordered" >
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
        <div className="row">
        <div className="col-2 text-end w-100">
          <Link to="/alumno/gest/:" className="btn btn-primary">
            Nuevo alumno
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
            Esta seguro que desea eliminar el alumno:{" "}
            <strong>
              {this.state.alumnoToDelete.apellido}{" "}
              {this.state.alumnoToDelete.nombre}
            </strong>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="outline-warning" onClick={this.handleClose}>
              Cerrar
            </Button>
<<<<<<< HEAD:front/silicon-app/src/components/alumno/AlumnoList.js
            <Button variant="primary" onClick={this.onDelete}>
              Eliminar
            </Button>
=======
            <Button variant="outline-danger" onClick={this.onDelete}>Eliminar</Button>
>>>>>>> fdc59c1ab7ee5a361ee1647ab6d00573d530e67a:front/silicon-app/src/alumno/AlumnoList.js
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default AlumnoList;
