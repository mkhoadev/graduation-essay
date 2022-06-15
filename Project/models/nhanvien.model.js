const mysql = require("./db");

const Employee = function (employee) {
  this.ten_nv = employee.tennv;
  this.email_nv = employee.emailnv;
  this.mat_khau_nv = employee.matkhaunv;
  this.sdt_nv = employee.sdtnv;
  this.ngay_sinh_nv = employee.ngaysinhnv;
  this.gioi_tinh_nv = employee.gioitinhnv;
  this.dia_chi_nv = employee.diachinv;
  this.id_cv = employee.chucvunv;
};

Employee.createEmployee = (newEmployee, result) => {
  mysql.query("INSERT INTO nhan_vien SET ? ", newEmployee, (err, res) => {
    if (err) {
      console.log("ERROR: ", err);
      result(err, null);
      return;
    }
    console.log("Create new employee");
    result(null, res);
  });
};

Employee.loginEmployee = (email, password, result) => {
  mysql.query(
    "SELECT id_nv, email_nv, id_cv FROM nhan_vien WHERE (email_nv=? && mat_khau_nv=?)",
    [email, password],
    (err, res) => {
      if (err) {
        console.log("ERROR: ", err);
        result(null, err);
        return;
      }
      console.log("get employee success");
      result(null, res);
    },
  );
};

Employee.checkEmployee = (email, result) => {
  mysql.query(
    `SELECT * FROM nhan_vien INNER JOIN chuc_vu ON nhan_vien.id_cv = chuc_vu.id_cv WHERE email_nv='${email}'`,
    (err, res) => {
      if (err) {
        console.log("ERROR: ", err);
        result(null, err);
        return;
      }
      console.log("get email employee success");
      result(null, res);
    },
  );
};

Employee.getEmployee = (idnv, result) => {
  mysql.query(
    `SELECT * FROM nhan_vien INNER JOIN chuc_vu ON nhan_vien.id_cv = chuc_vu.id_cv WHERE id_nv='${idnv}'`,
    (err, res) => {
      if (err) {
        console.log("ERROR: ", err);
        result(null, err);
        return;
      }
      console.log("get employee success");
      result(null, res);
    },
  );
};

Employee.getListEmployee = (result) => {
  mysql.query("SELECT * FROM nhan_vien INNER JOIN chuc_vu ON nhan_vien.id_cv = chuc_vu.id_cv ORDER BY SUBSTRING(id_nv,4)*1 ASC", (err, res) => {
    if (err) {
      console.log("ERROR: ", err);
      result(null, err);
      return;
    }
    console.log("get list employee");
    result(null, res);
  });
};

Employee.getAllShiper = (result) => {
  mysql.query(
    "SELECT * FROM nhan_vien INNER JOIN chuc_vu ON nhan_vien.id_cv = chuc_vu.id_cv WHERE chuc_vu.ten_cv = 'Giao hàng'",
    (err, res) => {
      if (err) {
        console.log("ERROR: ", err);
        result(null, err);
        return;
      }
      console.log("get list employee");
      result(null, res);
    },
  );
};

Employee.updateEmployee = (idnv, employee, result) => {
  mysql.query(
    "UPDATE nhan_vien SET ten_nv=?, email_nv=?, mat_khau_nv=?, sdt_nv=?, ngay_sinh_nv=?, gioi_tinh_nv=?, dia_chi_nv=?, id_cv=? WHERE id_nv=?",
    [
      employee.ten_nv,
      employee.email_nv,
      employee.mat_khau_nv,
      employee.sdt_nv,
      employee.ngay_sinh_nv,
      employee.gioi_tinh_nv,
      employee.dia_chi_nv,
      employee.id_cv,
      idnv,
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
      console.log("updated employee");
      result(null, res);
    },
  );
};

Employee.removeEmployee = (idnv, result) => {
  mysql.query(`DELETE FROM nhan_vien WHERE id_nv='${idnv}'`, (err, res) => {
    if (err) {
      console.log("ERROR: ", err);
      result(err, null);
      return;
    }
    console.log("Delete product");
    result(null, res);
  });
};

module.exports = Employee;
