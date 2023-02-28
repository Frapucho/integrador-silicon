import React from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";

class InternalAlumnoGest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dni: "",
      nombre: "",
      apellido: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.params.dni) {
      let request = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      };

      fetch(
        `http://localhost:8080/api/alumno/${this.props.params.dni}`,
        request
      )
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
            this.setState({
              dni: result.body.dni,
              nombre: result.body.nombre,
              apellido: result.body.apellido,
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
        });
    } else {
      this.setState({
        dni: "",
        nombre: "",
        apellido: "",
      });
    }
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    let data = {
      dni: this.state.dni,
      nombre: this.state.nombre,
      apellido: this.state.apellido,
    };

    let request = {
      method: this.props.params.dni ? "PUT" : "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };

    const url = this.props.params.dni
      ? `http://localhost:8080/api/alumno/${this.props.params.dni}`
      : "http://localhost:8080/api/alumno";

    fetch(url, request)
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
            this.props.navigate("/alumno/list");
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
        }
      );
  }

  render() {
    return (
      <div>
        <div class="container py-5 h-100">
          <div class="row d-flex align-items-center justify-content-center h-100">
            <div class="col-md-8 col-lg-7 col-xl-6">
              <img
                src="https://allshopconnect.com/assets/img/apptype/CubeJekX/20200908165706.png"
                class="img-fluid"
                alt="Phone image"
              />
            </div>
            <div class="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
              <form>
                <div class="form-outline mb-4">
                  <label htmlFor="dni" className="form-label">
                    DNI
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="dni"
                    name="dni"
                    value={this.state.dni}
                    onChange={this.handleChange}
                  />
                </div>

                <div class="form-outline mb-4">
                  <label htmlFor="nombre" className="form-label">
                    Nombre:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="nombre"
                    name="nombre"
                    value={this.state.nombre}
                    onChange={this.handleChange}
                  />
                </div>

                <div class="form-outline mb-4">
                  <label htmlFor="apellido" className="form-label">
                    Apellido:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="apellido"
                    name="apellido"
                    value={this.state.apellido}
                    onChange={this.handleChange}
                  />
                </div>

                <div class="form-outline mb-4">
                  <label htmlFor="apellido" className="form-label">
                    Correo Electronico:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="email"
                    name="email"
                    value={this.state.email}
                    onChange={this.handleChange}
                  />
                </div>

                <button type="submit" className="btn btn-primary">
                  <span class="material-symbols-outlined center-align">
                    save
                  </span>
                  <span>Guardar</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export function AlumnoGest(props) {
  const navigate = useNavigate();
  const params = useParams();

  return <InternalAlumnoGest navigate={navigate} params={params} />;
}

export default AlumnoGest;
