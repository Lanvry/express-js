let mysql = require("mysql");
let pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'db_project1',
});

pool.getConnection(function(error, connection){
    if(error){
        console.error("Database Connection Failed:", error);
    }
    else{
        console.log("Database Connection Success");
        connection.release();
    }
});

module.exports = pool;