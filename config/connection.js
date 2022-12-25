const mysql = require('mysql2'); //import mysql
require('dotenv').config(); // import environment
const env = process.env; // get environment variables for dynamic connection

// setup mysql connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    /*user: env.DB_USER,*/
    password: 'LCQBQbqWjj7Ax6yy',
    /*password: env.DB_PW,*/
    database: 'employees_db',
    /*database: env.DB_NAME*/
});

// throw error if there is an error connecting
connection.connect(function (err) {
    if (err) throw err;
    console.log('\nconnected!');
});

// export connection
module.exports = connection;