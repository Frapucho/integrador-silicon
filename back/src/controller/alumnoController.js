require("rootpath")();
const express = require('express');
const app = express();

const alumnoDb = require("../datasource/alumnoDB.js");


app.get('/', getAll);

app.get('/:dni', getByDni);

app.post('/', create);

app.put('/:dni', update);

app.delete('/del/:dni', eliminar);

app.delete('/:idalumno', eliminacionlogica);

// Metododo para listar todos los alumnos 
function getAll(req, res) {
    alumnoDb.getAll(function (err, result) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(result);
        }
    });
}
// Metodo para buscar alumnos por su dni
function getByDni(req, res) {
    alumnoDb.getByDni(req.params.dni,function (err, result) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(result);
        }
    });
}
// Metodo para agregar alumnos
function create(req, res) {
    alumnoDb.create(req.body, function (err, result) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(result);
        }
    });
}
// Metodo para modificar alumnos
function update(req, res) {
    alumnoDb.update(req.params.dni, req.body, function (result) {
        if (result.code == 3) {
            res.status(500).send(err);
        } else if (result.code == 2) {
            res.status(404).json(result);
        } else {
            res.json(result);
        }
    });
}
// Metodo par eliminar fisicamente alumnos de la base de datos
function eliminar(req, res) {
    alumnoDb.delete(req.params.dni,  function (err, result) {
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
// Metodo par eliminar alumnos cambiando el estado a 0
function eliminacionlogica(req, res) {
    alumnoDb.logdelete(req.params.idpersona, function (result) {
        if (result.code == 3) {
            res.status(500).send(err);
        } else if (result.code == 2) {
                res.status(404).json(result);  
        } else if (result.code == 1) {      
            res.json(result);
        }
    });
}

module.exports = app;