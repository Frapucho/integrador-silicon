require("rootpath")();
const express = require("express");
const app = express();

const cursoDb = require("../datasource/cursoDB.js");
const securityCont = require("../seguridad/seguridad");

app.get("/", securityCont.verificarToken, getAll);

app.get("/:id", securityCont.verificarToken, getByidc);

app.post("/", securityCont.verificarToken, create);

app.put("/:id", securityCont.verificarToken, update);

app.delete("/del/:id", securityCont.verificarToken, eliminar);

app.delete("/:id", securityCont.verificarToken, eliminacionlogica);

// Metododo para listar todos los cursos
function getAll(req, res) {
  cursoDb.getAll(function (err, result) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(result);
    }
  });
}
// Metodo para buscar cursos por su id
function getByidc(req, res) {
  cursoDb.getByidc(req.params.id, function (err, result) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(result);
    }
  });
}
// Metodo para agregar cursos
function create(req, res) {
  cursoDb.create(req.body, function (err, result) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(result);
    }
  });
}
// Metodo para modificar cursos
function update(req, res) {
  cursoDb.update(req.params.id, req.body, function (result) {
    if (result.code == 3) {
      res.status(500).send(result);
      res.status(500).send(result.message);
    } else if (result.code == 2) {
      res.status(404).json(result);
    } else {
      res.json(result);
    }
  });
}

// Metodo par eliminar fisicmente cursos de la base de datos
function eliminar(req, res) {
  cursoDb.delete(req.params.id, function (err, result) {
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
// Metodo par eliminar cursos cambiando el estado a 0
function eliminacionlogica(req, res) {
  cursoDb.logdelete(req.params.id, function (result) {
    if (result.code == 3) {
      res.status(500).send(result);
    } else if (result.code == 2) {
      res.status(404).json(result);
    } else if (result.code == 1) {
      res.json(result);
    }
  });
}

module.exports = app;
