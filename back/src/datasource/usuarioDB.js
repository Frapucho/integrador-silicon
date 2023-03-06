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

var usuarioDB = {};

//buscar usuario por nickname

usuarioDB.findByNickname = function (nickname, funCallback) {
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

//ver usuarios, no creo que se use pero para pruebas sirve 

usuarioDB.getAll = function (funCallback) {
  connection.query(
    "SELECT * FROM usuarios where id >=1",
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

//crear users

usuarioDB.create = function (usuario, funCallback) {
  var query = "INSERT INTO alumnos (id,nombre,apellido,dni) VALUES (?,?,?,?)";
  var dbParams = [usuario.id, usuario.email, usuario.nickname, usuario.password, usuario.rol];
  connection.query(query, dbParams, function (err, result, fields) {
    if (err) {
      if (err.code == "ER_DUP_ENTRY") {
        funCallback({
          message: `Ya existe el usuario con el ID ${usuario.id}`,
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
        message: `Se creo el usuario ${usuario.nickname}`,
        detail: result,
      });
    }
  });
};

// actualizar users

usuarioDB.update = function (id, usuario, funCallback) {
  var query =
    "UPDATE usuarios SET email = ?, nickname = ?,  password = ?, rol = ? WHERE id = ?";
  var dbParams = [usuario.email, usuario.nickname, usuario.password, usuario.rol, id];

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
          message: `No se encontro el usuario ${id}`,
          detail: result,
        });
      } else {
        funCallback({
          code: 1,
          message: `Se modifico el usuario ${usuario.nickname} `,
          detail: result,
        });
      }
    }
  });
};

usuarioDB.delete = function (id, funCallback) {
  var query = "DELETE FROM usuarios WHERE id = ?";
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
          message: `No se encontro el usuario ${id}`,
          detail: result,
        });
      } else {
        funCallback(undefined, {
          message: `Se elimino el usuario ${id}`,
          detail: result,
        });
      }
    }
  });
};

module.exports = usuarioDB;