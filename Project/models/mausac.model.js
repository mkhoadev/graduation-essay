const mysql = require("./db");

const Color = function (color) {
  this.ten_ms = color.mausac;
};

Color.createColor = (newColor, result) => {
  mysql.query("INSERT INTO mau_sac SET ?", newColor, (err, res) => {
    if (err) {
      console.log("ERROR: ", err);
      result(err, null);
      return;
    }
    console.log("Create new color");
    result(null, {...newColor});
  });
};

Color.getColor = (idsp, result) => {
  mysql.query(
    `SELECT DISTINCT ten_ms, mau_sac.* FROM mau_sac INNER JOIN chi_tiet_sp ON mau_sac.id_ms = chi_tiet_sp.id_ms WHERE id_sp='${idsp}'`,
    (err, res) => {
      if (err) {
        console.log("ERROR: ", err);
        result(err, null);
        return;
      }
      console.log("Get new color");
      result(null, res);
    },
  );
};

Color.getOneColor = (idms, result) => {
  mysql.query(`SELECT * FROM mau_sac WHERE id_ms='${idms}'`, (err, res) => {
    if (err) {
      console.log("ERROR: ", err);
      result(err, null);
      return;
    }
    console.log("Get color");
    result(null, res);
  });
};

Color.getListColor = (result) => {
  mysql.query("SELECT * FROM mau_sac ORDER BY SUBSTRING(id_ms,4)*1 ASC", (err, res) => {
    if (err) {
      console.log("ERROR: ", err);
      result(err, null);
      return;
    }
    console.log("Create new color");
    result(null, res);
  });
};

Color.deColor = (idms, result) => {
  mysql.query(`DELETE FROM mau_sac WHERE id_ms='${idms}'`, (err, res) => {
    if (err) {
      console.log("ERROR: ", err);
      result(err, null);
      return;
    }
    console.log("Create new color");
    result(null, res);
  });
};

module.exports = Color;
