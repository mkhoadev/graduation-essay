const mysql = require("./db");

const Position = function (position) {
  this.ten_cv = product.chucvu;
};

Position.createPosition = (newPosition, result) => {
  mysql.query("INSERT INTO chuc_vu SET ?", newPosition, (err, res) => {
    if (err) {
      console.log("ERROR: ", err);
      result(err, null);
      return;
    }
    console.log("Create new Position");
    result(null, res);
  });
};

Position.getPosition = (id, result) => {
  mysql.query(`SELECT * FROM chuc_vu WHERE id_cv='${id}'`, (err, res) => {
    if (err) {
      console.log("ERROR: ", err);
      result(err, null);
      return;
    }
    console.log("select Position");
    result(null, res);
  });
};

Position.getListPosition = (result) => {
  mysql.query("SELECT * FROM chuc_vu ORDER BY SUBSTRING(id_cv,4)*1 ASC", (err, res) => {
    if (err) {
      console.log("ERROR: ", err);
      result(err, null);
      return;
    }
    console.log("Select list Position");
    result(null, res);
  });
};

module.exports = Position;
