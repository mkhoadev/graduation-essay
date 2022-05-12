const mysql = require("./db");

const ImportInvoice = function (importInvoice) {
  this.ngay_lap_hdn = importInvoice.ngaylaphdn;
  this.tong_tien_hdn = importInvoice.tongtienhdn;
  this.id_nv = importInvoice.idnv;
};

ImportInvoice.createImportInvoice = (newImportInvoice, result) => {
  mysql.query("INSERT INTO hoa_don_nhap SET ?", newImportInvoice, (err, res) => {
    if (err) {
      console.log("ERROR: ", err);
      result(err, null);
      return;
    }
    console.log("Create new ImportInvoice");
    result(null, res);
  });
};

ImportInvoice.getListImportInvoice = (result) => {
  mysql.query(
    "SELECT hoa_don_nhap.*, nhan_vien.ten_nv FROM hoa_don_nhap INNER JOIN nhan_vien ON hoa_don_nhap.id_nv = nhan_vien.id_nv ORDER BY SUBSTRING(id_hdn,5)*1 ASC",
    (err, res) => {
      if (err) {
        console.log("ERROR: ", err);
        result(err, null);
        return;
      }
      console.log("Get ImportInvoice");
      result(null, res);
    },
  );
};

ImportInvoice.sumPriceInvoice = (idhdn, result) => {
  mysql.query(`SELECT tong_tien_hdn FROM hoa_don_nhap WHERE id_hdn='${idhdn}'`, (err, res) => {
    if (err) {
      console.log("ERROR: ", err);
      result(err, null);
      return;
    }
    console.log("Get ImportInvoice");
    result(null, res);
  });
};

ImportInvoice.sumPriceInvoices = (result) => {
  mysql.query("SELECT SUM(tong_tien_hdn) as tong_tien_hdn FROM hoa_don_nhap", (err, res) => {
    if (err) {
      console.log("ERROR: ", err);
      result(err, null);
      return;
    }
    console.log("Get ImportInvoice");
    result(null, res);
  });
};

ImportInvoice.getId = (result) => {
  mysql.query("SELECT id_hdn FROM hoa_don_nhap ORDER BY SUBSTRING(id_hdn,5)*1 DESC LIMIT 1", (err, res) => {
    if (err) {
      console.log("ERROR: ", err);
      result(err, null);
      return;
    }
    console.log("Get id importInvoice");
    result(null, res);
  });
};

ImportInvoice.deleteImportInvoice = (id, result) => {
  mysql.query(`DELETE FROM hoa_don_nhap WHERE id_hdn='${id}'`, (err, res) => {
    if (err) {
      console.log("ERROR: ", err);
      result(err, null);
      return;
    }
    console.log("Delete Import Invoice");
    result(null, res);
  });
};

module.exports = ImportInvoice;
