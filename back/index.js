require("rootpath")();
const express = require("express");
const app = express();
const morgan = require("morgan");
var cors = require("cors");
const config = require("./src/config/config.json");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("tiny"));
app.use(cors());
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

app.listen(config.server.port, function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log(`Server iniciado en puerto:${config.server.port}`);
  }
});
