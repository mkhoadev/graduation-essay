const mysql = require("./db");

const Discount = function (discount) {
  this.gia_km = discount.giakm;
  this.id_sp = discount.idsp;
};

Discount.createDiscount = (newDiscount, result) => {
  mysql.query("INSERT INTO khuyen_mai SET ?", newDiscount, (err, res) => {
    if (err) {
      console.log("ERROR: ", err);
      result(err, null);
      return;
    }
    console.log("Create new discount");
    result(null, res);
  });
};

Discount.getDiscount = (id, result) => {
  mysql.query(`SELECT * FROM khuyen_mai WHERE id_sp='${id}'`, (err, res) => {
    if (err) {
      console.log("ERROR: ", err);
      result(err, null);
      return;
    }
    console.log("Create new size");
    result(null, res);
  });
};

Discount.getList = (result) => {
  mysql.query("SELECT * FROM khuyen_mai ORDER BY SUBSTRING(id_kt,4)*1 ASC", (err, res) => {
    if (err) {
      console.log("ERROR: ", err);
      result(err, null);
      return;
    }
    console.log("select list size");
    result(null, res);
  });
};

Discount.deleteDiscount = (id, result) => {
  mysql.query(`DELETE FROM khuyen_mai WHERE id_km='${id}'`, (err, res) => {
    if (err) {
      console.log("ERROR: ", err);
      result(err, null);
      return;
    }
    console.log("delete list size");
    result(null, res);
  })
}

module.exports = Discount;
