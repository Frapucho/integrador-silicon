const mysql = require('mysql');
const config = require("../config/config.json");

//conectarnos a nuestra DB
var connection = mysql.createConnection(config.database);

connection.connect((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("DB Conectada correctamente");
    }
});
//fin de conexion db

var alumnoDb = {};


alumnoDb.getAll = function (funCallback) {
    connection.query("SELECT * FROM alumno where estado >=1", function (err, result, fields) {
        if (err) {
            funCallback({
                message: "Surgio un problema, contactese con un administrador. Gracias",
                detail: err
            });
            console.error(err);
        } else {
            funCallback(undefined, result);
        }
    });
}

alumnoDb.getByDni = function (dni,funCallback) {
    connection.query("SELECT * FROM alumno WHERE dni=?",dni, function (err, result, fields) {
        if (err) {
            funCallback({
                message: "Surgio un problema, contactese con un administrador. Gracias",
                detail: err
            });
            console.error(err);
        } else {
            if(result.length>0){
                funCallback(undefined, result[0]);
            }else{
                funCallback({
                    message: "No se encontro la persona"
                });
            }
            
        }
    });
}

// REVISAR XFAVOR /////////////////////////////////////////////////(cambiar datos del pedido a db, me dio paja, estan desordenados)//////////////////////////////////////////////////////////

alumnoDb.create = function (alumno, funCallback) {
    var query = 'INSERT INTO alumno (dni,nombre,apellido,sexo,fecha_nacimiento) VALUES (?,?,?,?,?)'
    var dbParams = [alumno.dni, alumno.nombre, alumno.apellido, alumno.sexo, alumno.fecha_nacimiento];
    connection.query(query, dbParams, function (err, result, fields) {
        if (err) {
            if(err.code == 'ER_DUP_ENTRY'){
                funCallback({
                    message: `Ya existe el alumno con el DNI ${alumno.dni}`,
                    detail: err
                });
            }else{
                funCallback({
                    message: "Surgio un problema, contactese con un administrador. Gracias",
                    detail: err
                });
            }
            
            console.error(err);
        } else {
            funCallback(undefined, {
                message: `Se creo la persona ${alumno.apellido} ${alumno.nombre}`,
                detail: result
            });
        }
    });
}

/**
 * 
 * @param {*} dni 
 * @param {*} persona 
 * @param {*} funCallback 
 *         retorna:
 *              code = 1 (EXITO)
 *              code = 2 (NOT FOUND) (NO encontro elemento)
 *              code = 3 (ERROR)
 * 
 */
alumnoDb.update = function (dni, persona, funCallback) {
    var query = 'UPDATE personas SET dni = ? , nombre = ?, apellido = ?,  sexo = ?, fecha_nacimiento = ?, estado = ? WHERE dni = ?'
    var dbParams = [persona.dni, persona.nombre, persona.apellido, persona.sexo, persona.fecha_nacimiento, persona.estado, dni];
    connection.query(query, dbParams, function (err, result, fields) {
        if (err) {
            funCallback({
                code:3,
                message: "Surgio un problema, contactese con un administrador. Gracias",
                detail: err
            });
            console.error(err);
        } else {
            if (result.affectedRows == 0) {
                funCallback({
                    code:2,
                    message: `No se encontro la persona ${dni}`,
                    detail: result
                });
            } else {
                funCallback({
                    code:1,
                    message: `Se modifico la persona ${persona.apellido} ${persona.nombre}`,
                    detail: result
                });
            }
        }
    });

}


alumnoDb.delete = function(dni,funCallback){
    var query = 'DELETE FROM personas WHERE dni = ?'
    connection.query(query, dni, function (err, result, fields) {
        if (err) {
            funCallback({
                message: "Surgio un problema, contactese con un administrador. Gracias",
                detail: err
            });
            console.error(err);
        } else {
            if (result.affectedRows == 0) {
                funCallback(undefined,{
                    message: `No se encontro la persona ${dni}`,
                    detail: result
                });
            } else {
                funCallback(undefined,{
                    message: `Se elimino la persona ${dni}`,
                    detail: result
                });
            }
        }
    });
}

/**
 *  
 * @param {*} idpersona 
 * @param {*} funCallback
 *         retorna:
 *              code = 1 (EXITO)
 *              code = 2 (NOT FOUND) (NO encontro elemento)
 *              code = 3 (ERROR)
 * 
 */
alumnoDb.logdelete = function (idpersona, funCallback) {
    connection.query("UPDATE personas SET estado = 0 WHERE idpersona = ?",idpersona, function (err, result, fields) {
        if (err) {
            funCallback({
                code:3,
                message: "Surgio un problema, contactese con un administrador. Gracias",
                detail: err
            }); 
            console.error(err);
        } else {
            if (result.affectedRows == 0) {
                funCallback({
                    code:2,
                    message: `No se encontro el id  ${idpersona} de la persona`,
                    detail: result
                }); 
            } else {
         //       console.error(err);
                    funCallback({
                    code:1,
                    message: `Se modifico la persona con el id ${idpersona}`,
                    detail: result
                }); 
            }
        }
    });
}

module.exports = alumnoDb;
