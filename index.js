var express = require('express');
var bodyPerser = require('body-parser');
var cors = require('cors');

var usuariosRouter = require('./routes/usuarios.routes');
var categoriaRouter = require('./routes/categorias.router');
var empresaRouter = require('./routes/empresas.router');

var database = require('./modules/database');

var app = express();

app.use(cors());
app.use(bodyPerser.json());
app.use(bodyPerser.urlencoded({extended: true}));

app.use('/usuarios', usuariosRouter);
app.use('/categorias', categoriaRouter);
app.use('/empresas', empresaRouter)

app.get('/' , function(req, res){
    res.send('Servidor en linea');
})

app.listen(3000, function(){
    console.log("Servidor levantado");
})