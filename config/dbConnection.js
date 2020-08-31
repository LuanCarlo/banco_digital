var mysql = require("mysql");

var connection = function() {

    return mysql.createConnection({
        host : 'localhost',
        user : 'root',
        password : '',
        database : 'banco_digital'
    });
}
module.exports = function() {

    return connection;
}
        