require("rootpath")();
// const express = require("express");
// const app = express();
const morgan = require("morgan");
const config = require("./src/config/config.json");
const fs = require("fs");
const path = require("path");

// const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {flags: 'a'});

var express = require('express')
var cors = require('cors')
var app = express()
app.use(cors())

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// morgan.token('type', function(req, res) {
//   return req.headers['content-type']
// })
app.use(morgan("tiny"));

morgan(":method :url :status :res[content-length] - :response-time ms");



//alumno
app.get("/", function (req, res) {
  res.send("ALPHA-SILICON");
});

const alumnoCont = require("./src/controller/alumnoController");
app.use("/api/alumnos", alumnoCont);

//curso
app.get("/", function (req, res) {
  res.send("ALPHA-SILICON");
});

const cursoCont = require("./src/controller/cursoController");
app.use("/api/cursos", cursoCont);

//curso publico 
app.get("/", function (req, res) {
  res.send("ALPHA-SILICON");
});

const cursoPublic = require("./src/controller/cursoControllerPublic");
app.use("/api/cursosP", cursoPublic);

//se agrego seguridad
const securityCont = require("./src/seguridad/seguridad");
app.use("/api/ingresar", securityCont.app);

app.listen(config.server.port, function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log(`Server iniciado en puerto:${config.server.port}`);
  }
});
