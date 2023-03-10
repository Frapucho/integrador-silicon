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

var alumnoDB = {};

alumnoDB.getAll = function (funCallback) {
  connection.query(
    "SELECT * FROM alumnos where id >=1 order by apellido asc",
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

alumnoDB.getByid = function (idalumno, funCallback) {
  connection.query(
    "SELECT * FROM alumnos WHERE id=?",
    idalumno,
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
            message: "No se encontro el alumno",
          });
        }
      }
    }
  );
};

alumnoDB.create = function (alumno, funCallback) {
  var query = "INSERT INTO alumnos (id,nombre,apellido,dni) VALUES (?,?,?,?)";
  var dbParams = [alumno.id, alumno.nombre, alumno.apellido, alumno.dni];
  connection.query(query, dbParams, function (err, result, fields) {
    if (err) {
      if (err.code == "ER_DUP_ENTRY") {
        funCallback({
          message: `Ya existe el alumno con el ID ${alumno.id}`,
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
        message: `Se creo el alumno ${alumno.apellido} ${alumno.nombre}`,
        detail: result,
      });
    }
  });
};

alumnoDB.update = function (id, alumno, funCallback) {
  var query =
    "UPDATE alumnos SET  nombre = ?, apellido = ?,  dni = ? WHERE id = ?";
  var dbParams = [alumno.nombre, alumno.apellido, alumno.dni, id];

  connection.query(query, dbParams, function (err, result, fields) {
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
          message: `No se encontro el alumno ${id}`,
          detail: result,
        });
      } else {
        funCallback({
          code: 1,
          message: `Se modifico el alumno ${alumno.apellido} ${alumno.nombre}`,
          detail: result,
        });
      }
    }
  });
};

alumnoDB.delete = function (id, funCallback) {
  var query = "DELETE FROM alumnos WHERE id = ?";
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
          message: `No se encontro el alumno ${id}`,
          detail: result,
        });
      } else {
        funCallback(undefined, {
          message: `Se elimino el alumno ${id}`,
          detail: result,
        });
      }
    }
  });
};

//se agrega funcion

alumnoDB.findByNickname = function (nickname, funCallback) {
  connection.query(
    "SELECT * FROM usuarios WHERE nickname=?",
    [nickname],
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
            message: "No se encontro el usuario",
          });
        }
      }
    }
  );
};


module.exports = alumnoDB;
