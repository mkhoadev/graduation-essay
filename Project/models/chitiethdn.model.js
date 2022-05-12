const mysql = require("./db");

const DetailImportInvoice = function (detailImportInvoice) {
  this.gia_nhap = detailImportInvoice.gianhap;
  this.so_luong_hdn = detailImportInvoice.soluong;
  this.id_ms = detailImportInvoice.idms;
  this.id_kt = detailImportInvoice.idkt;
  this.id_sp = detailImportInvoice.idsp;
  this.id_hdn = detailImportInvoice.idhdn;
};

DetailImportInvoice.createDetailImportInvoice = (newDetailImportInvoice, result) => {
  mysql.query("INSERT INTO chi_tiet_hdn SET ?", newDetailImportInvoice, (err, res) => {
    if (err) {
      console.log("ERROR: ", err);
      result(err, null);
      return;
    }
    console.log("Create new DetailImportInvoice");
    result(null, res);
  });
};

DetailImportInvoice.sumNumber = (idsp, result) => {
  mysql.query(`SELECT SUM(so_luong_nhap) as so_luong_nhap FROM chi_tiet_hdn WHERE id_sp='${idsp}'`, (err, res) => {
    if (err) {
      console.log("ERROR: ", err);
      result(err, null);
      return;
    }
    result(null, res);
  });
};

DetailImportInvoice.sumNumberProduct = (result) => {
  mysql.query("SELECT SUM(so_luong_hdn) as tong_so_luong FROM chi_tiet_hdn", (err, res) => {
    if (err) {
      console.log("ERROR: ", err);
      result(err, null);
      return;
    }
    result(null, res);
  });
};

DetailImportInvoice.getDetailProductList = (idhdn, result) => {
  mysql.query(
    `SELECT * FROM chi_tiet_hdn INNER JOIN san_pham ON chi_tiet_hdn.id_sp = san_pham.id_sp INNER JOIN mau_sac ON chi_tiet_hdn.id_ms = mau_sac.id_ms INNER JOIN kich_thuoc ON chi_tiet_hdn.id_kt = kich_thuoc.id_kt  WHERE chi_tiet_hdn.id_hdn='${idhdn}'`,
    (err, res) => {
      if (err) {
        console.log("ERROR: ", err);
        result(err, null);
        return;
      }
      result(null, res);
    },
  );
};

DetailImportInvoice.addNumberProduct = (data, result) => {
  mysql.query(
    `UPDATE chi_tiet_hdn SET so_luong_hdn=(so_luong_hdn+${data.so_luong}) WHERE id_hdn='${data.id_hdn}'`,
    (err, res) => {
      if (err) {
        console.log("ERROR: ", err);
        result(err, null);
        return;
      }
      result(null, res);
    },
  );
};

module.exports = DetailImportInvoice;
