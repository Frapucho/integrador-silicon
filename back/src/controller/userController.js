require("rootpath")();
const express = require('express');
const app = express();

const alumnoDb = require("../datasource/alumnoDB.js");
const securityCont = require("../seguridad/security.js");

app.get('/',securityCont.verificarToken, getAll);
app.post('/',securityCont.verificarToken, create);
app.put('/:nickname',securityCont.verificarToken, update);


function getAll(req, res) {
    alumnoDb.getAll(function (err, result) {
    if (err) {
            res.status(500).send(err);
        } else {
            res.json(result);
        }
    });
}

function create(req, res) {
    alumnoDb.create(req.body, function (err, result) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(result);
        }
    });
}

function update(req, res) {
    alumnoDb.update(req.params.nickname, req.body, function (result) {
        if (result.code == 3) {
            res.status(500).send(err);
        } else if (result.code == 2) {
            res.status(404).json(result);
        } else {
            res.json(result);
        }
    });
}


module.exports = app;