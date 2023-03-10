require("rootpath")();
const express = require("express");
const app = express();

const alumnoDB = require("../datasource/alumnoDB.js");
const securityCont = require("../seguridad/seguridad");
//aca se puso seguridad

app.get("/", securityCont.verificarToken, getAll);

app.get("/:id", securityCont.verificarToken, getByid);

app.post("/", securityCont.verificarToken, create);

app.put("/:id", securityCont.verificarToken, update);

app.delete("/del/:id", securityCont.verificarToken, eliminar);

// Metododo para listar todos los alumnos
function getAll(req, res) {
  alumnoDB.getAll(function (err, result) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(result);
    }
  });
}
// Metodo para buscar alumnos por su dni
function getByid(req, res) {
  alumnoDB.getByid(req.params.id, function (err, result) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(result);
    }
  });
}
// Metodo para agregar alumnos
function create(req, res) {
  alumnoDB.create(req.body, function (err, result) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(result);
    }
  });
}
// Metodo para modificar alumnos
function update(req, res) {
  alumnoDB.update(req.params.id, req.body, function (result) {
    if (result.code == 3) {
      //      res.status(500).send(err);
      res.status(500).send(result.message);
    } else if (result.code == 2) {
      res.status(404).json(result);
    } else {
      res.json(result);
    }
  });
}
// Metodo par eliminar fisicamente alumnos de la base de datos
function eliminar(req, res) {
  alumnoDB.delete(req.params.id, function (err, result) {
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
