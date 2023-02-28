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

module.exports = usuarioDB;
