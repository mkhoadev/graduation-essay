const mysql = require("./db");

const Size = function (size) {
  this.ten_kt = size.kichthuoc;
};

Size.createSize = (newSize, result) => {
  mysql.query("INSERT INTO kich_thuoc SET ?", newSize, (err, res) => {
    if (err) {
      console.log("ERROR: ", err);
      result(err, null);
      return;
    }
    console.log("Create new size");
    result(null, {...newSize});
  });
};

Size.getSize = (id, result) => {
  mysql.query(`SELECT * FROM kich_thuoc WHERE id_kt='${id}'`, (err, res) => {
    if (err) {
      console.log("ERROR: ", err);
      result(err, null);
      return;
    }
    console.log("Create new size");
    result(null, res);
  });
};

Size.getList = (result) => {
  mysql.query("SELECT * FROM kich_thuoc ORDER BY SUBSTRING(id_kt,4)*1 ASC", (err, res) => {
    if (err) {
      console.log("ERROR: ", err);
      result(err, null);
      return;
    }
    console.log("select list size");
    result(null, res);
  });
};

module.exports = Size;
