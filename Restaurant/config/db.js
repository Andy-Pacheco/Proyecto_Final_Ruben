const mysql = require('mysql');
let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'restaurant'
})
connection.connect(
    function(error) {
        if (error) {
            throw error;
        } else {
            console.log('Conexion with Codehouse Restaurant successful')
        }
    }
)
module.exports = connection;