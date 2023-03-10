
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


var cursoDbpublic = {};

cursoDbpublic.getPUBLIC = function (funCallback) {
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





module.exports = cursoDbpublic;