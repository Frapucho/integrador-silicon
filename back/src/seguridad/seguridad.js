require("rootpath")();
const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const usuarioDB = require("../datasource/usuarioDB.js");

app.post("/", login);

function login(req, res) {
  const { nickname, password } = req.body;
  usuarioDB.findByNickname(nickname, function (err, result) {
    if (err) {
      res.status(500).send(err);
    } else {
      console.log(password);
      console.log(result.password);
      const iguales = bcrypt.compareSync(password, result.password);
      // const iguales = bcrypt.compareSync(
      //   "admin",
      //   "$2a$12$h7uFvsdIEuPqSOrWF1xdledcqNldw9mfGCa2e1uvjv18HLbU87wDC"
      // );
      console.log(iguales);
      if (iguales) {
        let user = {
          nickname: result.nickname,
          email: result.email,
          rol: result.rol,
        };
        jwt.sign(user, "secret", { expiresIn: "7d" }, (err, token) => {
          if (!err) {
            res.json({
              datos: user,
              token: token,
              message: "Login correcto",
            });
          } else {
            res.status(500).send(err);
          }
        });
      } else {
        res.status(400).send({
          message: "contraseña incorrecta",
        });
      }
    }
  });
}
function verificarToken(req, res, next) {
  if (!req.headers["authorization"]) {
    res.status(403).send("No se recibio header autentication");
  } else {
    try {
      const token = req.headers["authorization"];
      const verified = jwt.verify(token, "secret");
      if (verified) {
        next();
      } else {
        res.status(403).send("Error autentication");
      }
    } catch (error) {
      res.status(403).send("Error autentication");
    }
  }
}

module.exports = { app, verificarToken };
