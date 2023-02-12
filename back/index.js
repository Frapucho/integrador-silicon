require("rootpath")();
const express = require('express');
const app = express();
const morgan = require('morgan');
const config = require("./src/config/config.json");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('tiny'));
morgan(':method :url :status :res[content-length] - :response-time ms');
  

//alumno
app.get("/", function (req, res) {
    res.send("ALPHA-SILICON");
});

const personaCont = require("./src/controller/alumnoController.js");
app.use("/api/alumno",alumnoCont);


//curso 
app.get("/", function (req, res) {
    res.send("ALPHA-SILICON");
});

const cursoCont = require("cursoController.js");
app.use("/api/curso",cursoCont);



app.listen(config.server.port, function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log(`Server iniciado en puerto:${config.server.port}`);
    }
});

