require("rootpath")();
const express = require("express");
const app = express();

const usuarioDB = require("../datasource/usuarioDB.js");
const securityCont = require("../seguridad/seguridad");
//aca se puso seguridad

app.get("/", securityCont.verificarToken, getAll);

app.get("/:nickname", securityCont.verificarToken, findByNickname);

app.post("/", securityCont.verificarToken, create);

app.put("/:id", securityCont.verificarToken, update);

app.delete("/del/:id", securityCont.verificarToken, eliminar);



// Metododo para listar todos los usuarios
function getAll(req, res) {
  usuarioDB.getAll(function (err, result) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(result);
    }
  });
}
// Metodo para buscar usuarios por su nickname
function findByNickname(req, res) {
  usuarioDB.findByNickname(req.params.nickname, function (err, result) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(result);
    }
  });
}
// Metodo para agregar usuarios
function create(req, res) {
  usuarioDB.create(req.body, function (err, result) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(result);
    }
  });
}
// Metodo para modificar usuarios
function update(req, res) {
  usuarioDB.update(req.params.id, req.body, function (result) {
    if (result.code == 3) {
      res.status(500).send(err);
      res.status(500).send(result.message);
    } else if (result.code == 2) {
      res.status(404).json(result);
    } else {
      res.json(result);
    }
  });
}
// Metodo par eliminar usuarios
function eliminar(req, res) {
  usuarioDB.delete(req.params.id, function (err, result) {
    if (err) {
      res.status(500).send(err);
    } else {
      if (result.detail.affectedRows == 0) {
        res.status(404).json(result);
      } else {
        res.json(result);
      }
    }
  });
}


module.exports = app;