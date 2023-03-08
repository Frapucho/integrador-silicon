require("rootpath")();
const express = require("express");
const app = express();

const cursoDBpublic = require("../datasource/cursoDBpublic.js");

app.get("/", getPUBLIC);



// Metododo para listar todos los cursos
function getPUBLIC(req, res) {
  cursoDBpublic.getPUBLIC(function (err, result) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(result);
    }
  });
}


module.exports = app;