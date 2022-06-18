const mysql = require("mysql2");


const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    database: "burgergilerr",
});

module.exports = db