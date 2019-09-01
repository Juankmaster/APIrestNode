const mysql = require('mysql');

const connection = mysql.createConnection({

    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bd_citas'

});

connection.connect(function (err) {
    if (err) {
        console.log(err);
        return;
    } else {
        console.log("DB is Connected")
    }

});
module.exports = connection;