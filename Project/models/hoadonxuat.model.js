const mysql = require("./db");

const ExportInvoice = function (exportInvoice) {
  this.ten_kh = exportInvoice.tenkh;
  this.so_dien_thoai = exportInvoice.sdtkh;
  this.tong_tien_hdx = exportInvoice.tongtienhdx;
  this.ngay_lap_hdx = exportInvoice.ngaylaphdx;
  this.trang_thai = exportInvoice.trangthai;
  this.hinh_thuc_thanh_toan = exportInvoice.hinhthuctt;
  this.dia_chi_hdx = exportInvoice.diachi;
  this.tien_vc = exportInvoice.tienvc;
  this.id_kh = exportInvoice.idkh;
};

ExportInvoice.createExportInvoice = (newExportInvoice, result) => {
  mysql.query("INSERT INTO hoa_don_xuat SET ?", newExportInvoice, (err, res) => {
    if (err) {
      console.log("ERROR: ", err);
      result(err, null);
      return;
    }
    console.log("Tạo mới hóa đơn xuất thành công");
    result(null, res);
  });
};

ExportInvoice.getListExportInvoice = (idkh, result) => {
  mysql.query(`SELECT * FROM hoa_don_xuat WHERE id_kh='${idkh}' ORDER BY SUBSTRING(id_hdx,5)*1 DESC`, (err, res) => {
    if (err) {
      console.log("ERROR: ", err);
      result(err, null);
      return;
    }
    console.log("Lấy danh sách hóa đơn xuất thành công");
    result(null, res);
  });
};

ExportInvoice.getOrders = (idkh, status, result) => {
  mysql.query(
    `SELECT * FROM hoa_don_xuat WHERE id_kh='${idkh}' AND trang_thai='${status}' ORDER BY SUBSTRING(id_hdx,5)*1 DESC`,
    (err, res) => {
      if (err) {
        console.log("ERROR: ", err);
        result(err, null);
        return;
      }
      console.log("Xóa hóa đơn xuất thành công");
      result(null, res);
    },
  );
};

ExportInvoice.getAll = (result) => {
  mysql.query(`SELECT * FROM hoa_don_xuat ORDER BY SUBSTRING(id_hdx,5)*1 DESC`, (err, res) => {
    if (err) {
      console.log("ERROR: ", err);
      result(err, null);
      return;
    }
    console.log("Lấy danh sách hóa đơn xuất thành công");
    result(null, res);
  });
};

ExportInvoice.sumPriceInvoices = (result) => {
  mysql.query("SELECT SUM(tong_tien_hdx) as tong_tien_hdx FROM hoa_don_xuat", (err, res) => {
    if (err) {
      console.log("ERROR: ", err);
      result(err, null);
      return;
    }
    console.log("Lấy danh sách hóa đơn xuất thành công");
    result(null, res);
  });
};

ExportInvoice.turnover = (dateStart, dateEnd, result) => {
  mysql.query(
    `SELECT SUM(hoa_don_xuat.tong_tien_hdx) as tong_tien_hdx FROM hoa_don_xuat INNER JOIN giao_hang ON hoa_don_xuat.id_hdx = giao_hang.id_hdx WHERE giao_hang.ngay_gh <='${dateEnd}' && giao_hang.ngay_gh >='${dateStart}'`,
    (err, res) => {
      if (err) {
        console.log("ERROR: ", err);
        result(err, null);
        return;
      }
      console.log("Lấy danh sách hóa đơn xuất thành công");
      result(null, res);
    },
  );
};

ExportInvoice.getExportInvoice = (idhdx, result) => {
  mysql.query(`SELECT * FROM hoa_don_xuat WHERE id_hdx='${idhdx}'`, (err, res) => {
    if (err) {
      console.log("ERROR: ", err);
      result(err, null);
      return;
    }
    console.log("Lấy hóa đơn xuất thành công");
    result(null, res);
  });
};

ExportInvoice.getPriceExportInvoice = (dateStart, dateEnd, result) => {
  mysql.query(
    `SELECT SUM(hoa_don_xuat.tong_tien_hdx-hoa_don_xuat.tien_vc) as tong_tien, giao_hang.ngay_gh , trang_thai FROM hoa_don_xuat INNER JOIN giao_hang ON giao_hang.id_hdx = hoa_don_xuat.id_hdx WHERE giao_hang.ngay_gh <= '${dateEnd}' AND giao_hang.ngay_gh >= '${dateStart}' AND trang_thai = "Đã giao hàng" GROUP BY giao_hang.ngay_gh`,
    (err, res) => {
      if (err) {
        console.log("ERROR: ", err);
        result(err, null);
        return;
      }
      console.log("Lấy hóa đơn xuất thành công");
      result(null, res);
    },
  );
};

ExportInvoice.updateStatus = (id_hdx, status, result) => {
  mysql.query(`UPDATE hoa_don_xuat SET trang_thai='${status}' WHERE id_hdx='${id_hdx}'`, (err, res) => {
    if (err) {
      console.log("ERROR: ", err);
      result(err, null);
      return;
    }
    console.log("Cập nhật hóa đơn thành công");
    result(null, res);
  });
};

ExportInvoice.getId = (result) => {
  mysql.query("SELECT id_hdx FROM hoa_don_xuat ORDER BY SUBSTRING(id_hdx,5)*1 DESC LIMIT 1", (err, res) => {
    if (err) {
      console.log("ERROR: ", err);
      result(err, null);
      return;
    }
    console.log("Lấy id hóa đơn xuất thành công");
    result(null, res);
  });
};

ExportInvoice.deleteExportInvoice = (id, result) => {
  mysql.query(`DELETE FROM hoa_don_xuat WHERE id_hdx='${id}'`, (err, res) => {
    if (err) {
      console.log("ERROR: ", err);
      result(err, null);
      return;
    }
    console.log("Xóa hóa đơn xuất thành công");
    result(null, res);
  });
};

module.exports = ExportInvoice;
