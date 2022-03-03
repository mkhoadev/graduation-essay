const mysql = require("./db");

const DetailImportInvoice = function (detailImportInvoice) {
  this.gia_nhap = detailImportInvoice.gianhap;
  this.so_luong_nhap = detailImportInvoice.soluong;
  this.id_sp = detailImportInvoice.idsp;
  this.id_hdn = detailImportInvoice.idhdn;
};

DetailImportInvoice.createDetailImportInvoice = (newDetailImportInvoice, result) => {
  mysql.query(
    "INSERT INTO chi_tiet_hdn SET ?",
    newDetailImportInvoice,
    (err, res) => {
      if (err) {
        console.log("ERROR: ", err);
        result(err, null);
        return;
      }
      console.log("Create new DetailImportInvoice");
      result(null, res);
    },
  );
};

// DetailImportInvoice.getListImportInvoice = (result) => {
//   mysql.query(
//     "SELECT * FROM hoa_don_nhap ORDER BY SUBSTRING(id_hdn,5)*1 ASC",
//     (err, res) => {
//       if (err) {
//         console.log("ERROR: ", err);
//         result(err, null);
//         return;
//       }
//       console.log("Get ImportInvoice");
//       result(null, res);
//     },
//   );
// };

// DetailImportInvoice.getId = (result) => {
//   mysql.query(
//     "SELECT id_hdn FROM hoa_don_nhap ORDER BY SUBSTRING(id_hdn,5)*1 DESC LIMIT 1",
//     (err, res) => {
//       if (err) {
//         console.log("ERROR: ", err);
//         result(err, null);
//         return;
//       }
//       console.log("Get id ImportInvoice");
//       result(null, res);
//     },
//   );
// };

module.exports = DetailImportInvoice;
