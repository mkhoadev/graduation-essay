const mysql = require("./db");

const Employee = function (employee) {
  this.ten_nv = employee.ten;
  this.email_nv = employee.email;
  this.mat_khau_nv = employee.mat_khau;
  this.sdt_nv = employee.sdt;
  this.ngay_sinh_nv = employee.ngay_sinh;
  this.gioi_tinh_nv = employee.gioi_tinh;
  this.dia_chi_nv = employee.dia_chi;
};

Employee.createEmployee = (newEmployee, result) => {
  mysql.query("INSERT INTO nhan_vien SET ? ", newEmployee, (err, res) => {
    if (err) {
      console.log("ERROR: ", err);
      result(err, null);
      return;
    }
    console.log("Create new employee");
    result(null, {id: res.insertId, ...newEmployee});
  });
};

Employee.getEmployee = (email, password, result) => {
  mysql.query(
    "SELECT email_nv FROM nhan_vien WHERE (email_nv=? && mat_khau_nv=?)",
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
    `SELECT email_nv FROM nhan_vien WHERE email_nv='${email}'`,
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

module.exports = Employee;
