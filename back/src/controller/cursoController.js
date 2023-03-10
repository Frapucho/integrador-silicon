require("rootpath")();
const express = require("express");
const app = express();

const cursoDb = require("../datasource/cursoDB.js");
const securityCont = require("../seguridad/seguridad");

app.get("/", securityCont.verificarToken, getAll);

app.get("/:id", securityCont.verificarToken, getByidc);

app.get("/id/:id", securityCont.verificarToken, getAlumnosCurso);

app.post("/", securityCont.verificarToken, create);

app.post("/alumnoCurso/", securityCont.verificarToken, inscribirAlumno);

app.put("/:id", securityCont.verificarToken, update);

app.delete("/del/:id", securityCont.verificarToken, eliminar);

app.delete("/:id", securityCont.verificarToken, eliminacionlogica);

app.get(
  "/alumnosInscriptos/:id",
  securityCont.verificarToken,
  getAlumnosInscriptos
);

//inscribir alumno
app.post("/:id/inscribir", securityCont.verificarToken, inscribirAlumno);
//desinscrobor alumno
app.delete(
  "/:id/desInscribir",
  securityCont.verificarToken,
  desInscribirAlumno
);

app.get(
  "/inscribirAluno/:idCurso:idAlumno",
  securityCont.verificarToken,
  getAlumnosInscriptos
);

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

//Metodo para buscar alumnos con ID curso

function getAlumnosCurso(req, res) {
  cursoDb.getAlumnosCurso(req.params.id, function (err, result) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(result);
    }
  });
}

function getAlumnosInscriptos(req, res) {
  cursoDb.getAlumnosInscriptos(req.params.id, function (err, result) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(result);
      console.log(result);
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

//Metodo para inscribir alumnos
function inscribirAlumno(req, res) {
  const idCurso = req.params.id;
  const idAlumno = req.body.id_alumno; // Se espera que se reciba el id del alumno a inscribir en el cuerpo de la petición

  cursoDb.inscribirAlumno(idCurso, idAlumno, (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(200).json({ message: "Alumno inscripto correctamente." });
    }
  });
}

function desInscribirAlumno(req, res) {
  const idCurso = req.params.id;
  const idAlumno = req.body.id_alumno; // Se espera que se reciba el id del alumno a eliminar en el cuerpo de la petición

  cursoDb.eliminarAlumno(idCurso, idAlumno, (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(200).json({ message: "Alumno eliminado correctamente." });
    }
  });
}

module.exports = app;
