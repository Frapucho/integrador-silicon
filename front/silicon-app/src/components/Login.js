import React from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";

class InternalLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nickname: "",
      password: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(123);
    let data = {
      nickname: this.state.nickname,
      password: this.state.password,
    };

    let request = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };

    fetch("http://localhost:8080/api/ingresar", request)
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
          console.log(result);
          if (result.ok) {
            console.log(result.body);
            localStorage.setItem("token", result.body.token);
            localStorage.setItem("rol", result.body.datos.rol);
            localStorage.setItem("nickname", result.body.datos.nickname);

            toast.success(`Bienvenido ${result.body.message}`, {
              position: "bottom-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });

            window.location.href = "/";
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
          toast.error(
            "No se pudo realizar la operacion, contactese con un administrador.",
            {
              position: "bottom-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            }
          );
        }
      );
  }

  render() {
    return (
      <div>
        <div className="container py-5 h-100">
          <div className="row d-flex align-items-center justify-content-center h-100">
            <div className="col-md-8 col-lg-7 col-xl-6">
              <img
                src="https://egymerch.com/site_assets/assets/imgs/login/login.png"
                className="img-fluid"
                alt="Phone image"
              />
            </div>
            <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
              <form onSubmit={this.handleSubmit}>
                <div className="form-outline mb-4">
                  <input
                    type="nickname"
                    id="nickname"
                    className="form-control form-control-lg"
                    name="nickname"
                    value={this.state.nickname}
                    onChange={this.handleChange}
                  />
                  <label className="form-label" htmlFor="nickname">
                    Nombre de Usuario
                  </label>
                </div>

                <div className="form-outline mb-4">
                  <input
                    type="password"
                    id="password"
                    className="form-control form-control-lg"
                    name="password"
                    value={this.state.password}
                    onChange={this.handleChange}
                  />
                  <label className="form-label" htmlFor="password">
                    Contraseña
                  </label>
                </div>

                <div className="d-flex justify-content-around align-items-center mb-4">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="form1Example3"
                    />
                    <label className="form-check-label" htmlFor="form1Example3">
                      {" "}
                      Recuerdame{" "}
                    </label>
                  </div>
                  <a href="#!">Olvidaste la contraseña?</a>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary btn-lg btn-block" >
                
                  Iniciar Sesion
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export function Login(props) {
  const navigate = useNavigate();
  const params = useParams();

  return <InternalLogin navigate={navigate} params={params} />;
}

export default Login;
