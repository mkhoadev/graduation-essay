const mysql = require("./db");

const Brand = function (product) {
  this.ten_th = product.thuonghieu;
};

Brand.createBrand = (newBrand, result) => {
  mysql.query("INSERT INTO thuong_hieu SET ?", newBrand, (err, res) => {
    if (err) {
      console.log("ERROR: ", err);
      result(err, null);
      return;
    }
    console.log("Create new brand");
    result(null, {...newBrand});
  });
};

Brand.getBrand = (id, result) => {
  mysql.query(`SELECT * FROM thuong_hieu WHERE id_th='${id}'`, (err, res) => {
    if (err) {
      console.log("ERROR: ", err);
      result(err, null);
      return;
    }
    console.log("Create new brand");
    result(null, res);
  });
};

Brand.getList = (result) => {
  mysql.query("SELECT * FROM thuong_hieu ORDER BY SUBSTRING(id_th,4)*1 ASC", (err, res) => {
    if (err) {
      console.log("ERROR: ", err);
      result(err, null);
      return;
    }
    console.log("Select list brand");
    result(null, res);
  });
};

module.exports = Brand;
