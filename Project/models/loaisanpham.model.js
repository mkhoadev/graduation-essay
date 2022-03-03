const mysql = require("./db");

const TypeProduct = function (product) {
  this.ten_lsp = product.loaisanpham;
};

TypeProduct.createTypeProduct = (newTypeProduct, result) => {
  mysql.query("INSERT INTO loai_san_pham SET ?", newTypeProduct, (err, res) => {
    if (err) {
      console.log("ERROR: ", err);
      result(err, null);
      return;
    }
    console.log("Create new TypeProduct");
    result(null, {...newTypeProduct});
  });
};

TypeProduct.getTypeProduct = (id, result) => {
  mysql.query(`SELECT * FROM loai_san_pham WHERE id_lsp='${id}'`, (err, res) => {
    if (err) {
      console.log("ERROR: ", err);
      result(err, null);
      return;
    }
    console.log("Create new TypeProduct");
    result(null, res);
  });
};

TypeProduct.getList = (result) => {
  mysql.query("SELECT * FROM loai_san_pham ORDER BY SUBSTRING(id_lsp,5)*1 ASC", (err, res) => {
    if (err) {
      console.log("ERROR: ", err);
      result(err, null);
      return;
    }
    console.log("Select list type product");
    result(null, res);
  });
};

module.exports = TypeProduct;
