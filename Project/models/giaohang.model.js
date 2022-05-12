const mysql = require("./db");

const Deliver = function (deliver) {
  this.id_nv = deliver.idnv;
  this.trang_thai_gh = deliver.trangthai;
  this.id_hdx = deliver.idhdx;
};

Deliver.createDeliver = (newDeliver, result) => {
  mysql.query("INSERT INTO giao_hang SET ?", newDeliver, (err, res) => {
    if (err) {
      console.log("ERROR: ", err);
      result(err, null);
      return;
    }
    console.log("Create new deliver");
    result(null, res);
  });
};

Deliver.updateStatus = (idhdx, status, result) => {
  mysql.query(`UPDATE giao_hang SET trang_thai_gh ='${status}' WHERE id_hdx='${idhdx}'`, (err, res) => {
    if (err) {
      console.log("ERROR: ", err);
      result(err, null);
      return;
    }
    console.log("Create new deliver");
    result(null, res);
  });
};

Deliver.updateStatusNote = (idhdx, status, ngaygh, ghichu, result) => {
  mysql.query(
    `UPDATE giao_hang SET trang_thai_gh ='${status}', ngay_gh='${ngaygh}', ghi_chu='${ghichu}' WHERE id_hdx='${idhdx}'`,
    (err, res) => {
      if (err) {
        console.log("ERROR: ", err);
        result(err, null);
        return;
      }
      console.log("Create new deliver");
      result(null, res);
    },
  );
};

Deliver.updateDateComplete = (idhdx, status, ngaygh, result) => {
  mysql.query(
    `UPDATE giao_hang SET trang_thai_gh ='${status}', ngay_gh='${ngaygh}' WHERE id_hdx='${idhdx}'`,
    (err, res) => {
      if (err) {
        console.log("ERROR: ", err);
        result(err, null);
        return;
      }
      console.log("Create new deliver");
      result(null, res);
    },
  );
};

Deliver.getInvoice = (idnv, result) => {
  mysql.query(
    `SELECT * FROM giao_hang INNER JOIN hoa_don_xuat ON giao_hang.id_hdx = hoa_don_xuat.id_hdx WHERE giao_hang.id_nv='${idnv}' ORDER BY SUBSTRING(id_hdx,5)*1 DESC`,
    (err, res) => {
      if (err) {
        console.log("ERROR: ", err);
        result(err, null);
        return;
      }
      console.log("Create new deliver");
      result(null, res);
    },
  );
};

Deliver.getInvoiceStatus = (idnv, status, result) => {
  mysql.query(
    `SELECT * FROM giao_hang INNER JOIN hoa_don_xuat ON giao_hang.id_hdx = hoa_don_xuat.id_hdx WHERE giao_hang.id_nv='${idnv}' AND giao_hang.trang_thai_gh='${status}' ORDER BY SUBSTRING(hoa_don_xuat.id_hdx,5)*1 DESC`,
    (err, res) => {
      if (err) {
        console.log("ERROR: ", err);
        result(err, null);
        return;
      }
      console.log("Create new deliver");
      result(null, res);
    },
  );
};

Deliver.getAllInvoice = (result) => {
  mysql.query(
    "SELECT * FROM giao_hang INNER JOIN hoa_don_xuat ON giao_hang.id_hdx = hoa_don_xuat.id_hdx",
    (err, res) => {
      if (err) {
        console.log("ERROR: ", err);
        result(err, null);
        return;
      }
      console.log("Create new deliver");
      result(null, res);
    },
  );
};

Deliver.getOneInvoice = (idhdx, result) => {
  mysql.query(
    `SELECT * FROM giao_hang INNER JOIN hoa_don_xuat ON giao_hang.id_hdx = hoa_don_xuat.id_hdx WHERE giao_hang.id_hdx='${idhdx}'`,
    (err, res) => {
      if (err) {
        console.log("ERROR: ", err);
        result(err, null);
        return;
      }
      console.log("Create new deliver");
      result(null, res);
    },
  );
};

Deliver.deleteInvoice = (idhdx, result) => {
  mysql.query(`DELETE FROM giao_hang WHERE id_hdx='${idhdx}'`, (err, res) => {
    if (err) {
      console.log("ERROR: ", err);
      result(err, null);
      return;
    }
    console.log("Create new deliver");
    result(null, res);
  });
};

module.exports = Deliver;
