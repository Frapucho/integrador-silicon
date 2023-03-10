const mysql = require("mysql");
const config = require("../config/config.json");

var connection = mysql.createConnection(config.database);

connection.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("DB Conectada correctamente");
  }
});

var cursoDb = {};

cursoDb.getAll = function (funCallback) {
  connection.query("SELECT * FROM cursos ", function (err, result, fields) {
    if (err) {
      funCallback({
        message: "Surgio un problema, contactese con un administrador. Gracias",
        detail: err,
      });
      console.error(err);
    } else {
      funCallback(undefined, result);
    }
  });
};

cursoDb.getByidc = function (idcurso, funCallback) {
  connection.query(
    "SELECT * FROM cursos WHERE id=?",
    idcurso,
    function (err, result, fields) {
      if (err) {
        funCallback({
          message:
            "Surgio un problema, contactese con un administrador. Gracias",
          detail: err,
        });
        console.error(err);
      } else {
        if (result.length > 0) {
          funCallback(undefined, result[0]);
        } else {
          funCallback({
            message: "No se encontro el curso",
          });
        }
      }
    }
  );
};

//buscar alumnos por curso

cursoDb.getAlumnosCurso = function (id, funCallBack) {
  connection.query(
    "SELECT * FROM alumno_curso INNER JOIN alumnos ON alumno_curso.id_alumno = alumnos.id WHERE alumno_curso.id_curso = ?",
    id,
    function (err, result, fields) {
      if (err) {
        funCallBack({
          message: "Tuvimos un problema, disculpe las molestias",
          detail: err,
        });
        console.error(err);
      } else {
        if (result.length > 0) {
          funCallBack(undefined, result[0]);
        } else {
          funCallBack({
            message: "No hay alumnos inscriptos",
          });
        }
      }
    }
  );
};

cursoDb.getAlumnosInscriptos = function (id, funCallBack) {
  connection.query(
    "SELECT * FROM alumnos INNER JOIN alumno_curso ON alumnos.id = alumno_curso.id_alumno WHERE alumno_curso.id_curso = ?",
    id,
    function (err, result, fields) {
      if (err) {
        funCallBack({
          message: "Tuvimos un problema, disculpe las molestias",
          detail: err,
        });
        console.error(err);
      } else {
        if (result.length > 0) {
          funCallBack(undefined, result);
        } else {
          funCallBack({
            message: "No hay alumnos inscriptos",
          });
        }
      }
    }
  );
};

cursoDb.create = function (curso, funCallback) {
  var query =
    "INSERT INTO cursos (nombre, descripcion, imagen, anio, activo) VALUES (?,?,?,?,?)";
  var dbParams = [
    curso.nombre,
    curso.descripcion,
    curso.imagen,
    curso.anio,
    curso.activo,
  ];
  connection.query(query, dbParams, function (err, result, fields) {
    if (err) {
      if (err.code == "ER_DUP_ENTRY") {
        funCallback({
          message: `Ya existe el curso con el ID ${curso.id}`,
          detail: err,
        });
      } else {
        funCallback({
          message:
            "Surgio un problema, contactese con un administrador. Gracias",
          detail: err,
        });
      }

      console.error(err);
    } else {
      funCallback(undefined, {
        message: `Se creo el curso ${curso.nombre}`,
        detail: result,
      });
    }
  });
};

//inscribir alumno
cursoDb.inscribirAlumno = function (data, funCallBack) {
  const { idCurso, idAlumnos } = data;
  console.log(idCurso);
  console.log(idAlumno);
  var query =
    "SELECT * FROM alumno_curso WHERE id_curso = ? AND id_alumno IN (?)";
  var params = [idCurso, idAlumnos];
  connection.query(query, params, function (err, result, fields) {
    if (err) {
      console.error(err);
    } else {
      if (result[0] && Object.keys(result[0]).length > 0) {
        funCallBack({
          message: "El alumno ya se encuentra inscripto",
          detail: result,
        });
      } else {
        var query = "INSERT INTO alumno_curso (id_alumno, id_curso) VALUES ?";
        const valores = idAlumnos.map((idAlumno) => [idAlumno, idCurso]);

        connection.query(query, [valores], function (err, result, fields) {
          if (err) {
            console.error(err);
          } else {
            funCallBack({
              message: `Se inscribio correctamente al alumno  `,
              detail: result,
            });
          }
        });
      }
    }
  });
};

cursoDb.update = function (id, curso, funCallback) {
  var query =
    "UPDATE cursos SET nombre = ?, descripcion = ?, imagen = ?, anio = ?, activo = ? WHERE id = ?";
  var dbParams = [
    curso.nombre,
    curso.descripcion,
    curso.imagen,
    curso.anio,
    curso.activo,
    id,
  ];

  connection.query(query, dbParams, function (err, result, fields) {
    console.log(dbParams);
    if (err) {
      funCallback({
        code: 3,
        message: "Surgio un problema, contactese con un administrador. Gracias",
        detail: err,
      });
      console.error(err);
    } else {
      if (result.affectedRows == 0) {
        funCallback({
          code: 2,
          message: `No se encontro el curso ${id}`,
          detail: result,
        });
      } else {
        funCallback({
          code: 1,
          message: `Se modifico el curso ${curso.nombre} `,
          detail: result,
        });
      }
    }
  });
};

cursoDb.delete = function (id, funCallback) {
  var query = "DELETE FROM cursos WHERE id = ?";
  connection.query(query, id, function (err, result, fields) {
    if (err) {
      funCallback({
        message: "Surgio un problema, contactese con un administrador. Gracias",
        detail: err,
      });
      console.error(err);
    } else {
      if (result.affectedRows == 0) {
        funCallback(undefined, {
          message: `No se encontro el curso ${id}`,
          detail: result,
        });
      } else {
        funCallback(undefined, {
          message: `Se elimino el curso ${id}`,
          detail: result,
        });
      }
    }
  });
};

cursoDb.logdelete = function (id, funCallback) {
  console.log(id);
  connection.query(
    "UPDATE cursos SET activo = 0 WHERE id = ?",
    [id],
    function (err, result, fields) {
      if (err) {
        funCallback({
          code: 3,
          message:
            "Surgio un problema, contactese con un administrador. Gracias",
          detail: err,
        });
        console.error(err);
      } else {
        if (result.affectedRows == 0) {
          funCallback({
            code: 2,
            message: `No se encontro el id  ${id} `,
            detail: result,
          });
        } else {
          //       console.error(err);
          funCallback({
            code: 1,
            message: `Se modifico el curso con el id ${id}`,
            detail: result,
          });
        }
      }
    }
  );
};

cursoDb.inscribirAlumno = function (idCurso, idAlumno, funCallBack) {
  console.log(idCurso);
  console.log(idAlumno);
  connection.query(
    "INSERT INTO alumno_curso (id_alumno, id_curso) VALUES (?, ?)",
    [idAlumno, idCurso],
    function (err, result, fields) {
      if (err) {
        funCallBack({
          message: "Tuvimos un problema, disculpe las molestias",
          detail: err,
        });
        console.error(err);
      } else {
        funCallBack(undefined, {
          message: "Alumno inscripto correctamente",
        });
      }
    }
  );
};

cursoDb.eliminarAlumno = function (idCurso, idAlumno, funCallBack) {
  console.log({ idCurso });
  console.log({ idAlumno });

  connection.query(
    "DELETE FROM alumno_curso WHERE id_alumno = ? AND id_curso = ?",
    [idAlumno, idCurso],
    function (err, result, fields) {
      if (err) {
        funCallBack({
          message: "Tuvimos un problema, disculpe las molestias",
          detail: err,
        });
        console.error(err);
      } else {
        funCallBack(undefined, {
          message: "Alumno eliminado correctamente",
        });
      }
    }
  );
};

module.exports = cursoDb;
