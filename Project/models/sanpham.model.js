const mysql = require("./db");

const Product = function (product) {
  this.ten_sp = product.tensanpham;
  this.thong_tin_sp = product.thongtinsanpham;
  this.gia_ban = product.giaban;
  this.can_nang = product.cannang;
  this.chieu_cao = product.chieucao;
  this.chieu_rong = product.chieurong;
  this.chieu_dai = product.chieudai;
  this.id_ms = product.mausac;
  this.id_kt = product.kichthuoc;
  this.id_lsp = product.loaisanpham;
  this.id_th = product.thuonghieu;
};

Product.createProduct = (newProduct, result) => {
  mysql.query("INSERT INTO san_pham SET ?", newProduct, (err, res) => {
    if (err) {
      console.log("ERROR: ", err);
      result(err, null);
      return;
    }
    console.log("Create new product");
    result(null, {id: res.insertId, ...newProduct});
  });
};

Product.getProduct = (id, result) => {
  mysql.query(
    `SELECT * FROM san_pham INNER JOIN chi_tiet_hdn ON san_pham.id_sp = chi_tiet_hdn.id_sp INNER JOIN hoa_don_nhap ON hoa_don_nhap.id_hdn = chi_tiet_hdn.id_hdn WHERE san_pham.id_sp = '${id}' ORDER BY SUBSTRING(san_pham.id_sp,4)*1 ASC `,
    (err, res) => {
      if (err) {
        console.log("ERROR: ", err);
        result(err, null);
        return;
      }
      console.log("Get product");
      result(null, res);
    },
  );
};

Product.getListProducts = (result) => {
  mysql.query(
    "SELECT * FROM san_pham INNER JOIN chi_tiet_hdn ON san_pham.id_sp = chi_tiet_hdn.id_sp INNER JOIN hoa_don_nhap ON hoa_don_nhap.id_hdn = chi_tiet_hdn.id_hdn ORDER BY SUBSTRING(san_pham.id_sp,4)*1 ASC",
    (err, res) => {
      if (err) {
        console.log("ERROR: ", err);
        result(err, null);
        return;
      }
      console.log("Get products");
      result(null, res);
    },
  );
};

Product.getId = (result) => {
  mysql.query("SELECT id_sp FROM san_pham ORDER BY SUBSTRING(id_sp,4)*1 DESC LIMIT 1", (err, res) => {
    if (err) {
      console.log("ERROR: ", err);
      result(err, null);
      return;
    }
    console.log("Get id product");
    result(null, res);
  });
};

Product.updateProduct = (id, product, result) => {
  mysql.query(
    "UPDATE san_pham SET ten_sp=?, thong_tin_sp=?, gia_ban=?, can_nang=?, chieu_rong=?, chieu_dai=?, chieu_cao=?, id_th=?, id_kt=?, id_lsp=?, id_ms=? WHERE id_sp=?",
    [
      product.ten_sp,
      product.thong_tin_sp,
      product.gia_ban,
      product.can_nang,
      product.chieu_rong,
      product.chieu_dai,
      product.chieu_cao,
      product.id_th,
      product.id_kt,
      product.id_lsp,
      product.id_ms,
      id,
    ],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        // not found Tutorial with the id
        result({kind: "not_found"}, null);
        return;
      }
      console.log("updated product");
      result(null, res);
    },
  );
};

Product.deleteProduct = (id, result) => {
  mysql.query(`DELETE FROM san_pham WHERE id_sp='${id}'`, (err, res) => {
    if (err) {
      console.log("ERROR: ", err);
      result(err, null);
      return;
    }
    console.log("Delete product");
    result(null, res);
  });
};

module.exports = Product;
