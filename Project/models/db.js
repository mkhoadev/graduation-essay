const db = require("../config/db.config");
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: db.HOST,
  user: db.USER,
  password: db.PASSWORD,
  database: db.DB,
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Success connect database! :))");
});

module.exports = connection;
