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
  connection.query(
    "SELECT * FROM cursos where activo >=1",
    function (err, result, fields) {
      if (err) {
        funCallback({
          message:
            "Surgio un problema, contactese con un administrador. Gracias",
          detail: err,
        });
        console.error(err);
      } else {
        funCallback(undefined, result);
      }
    }
  );
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

module.exports = cursoDb;
