const express = require('express'),
    path = require('path'),
    app = express(),
    morgan = require('morgan');
    PORT = process.env.PORT || 3000;

//Settings

//Middlewares
app.use(express.json());
app.use(morgan('dev'));

app.use(function (req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Methods", "GET, PUT, DELETE, POST");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//Routes
app.use('/citas', require('./routes/citas'));
app.use('/medicos', require('./routes/moduloMedicos'));
app.use('/consultorios', require('./routes/consultorios'));
app.use('/pacientes', require('./routes/pacientes'));




//Starting the server
app.listen(PORT, () => {
    console.log(`Server running in ${PORT}`)

})