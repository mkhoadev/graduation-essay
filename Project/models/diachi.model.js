const mysql = require("./db");

const Address = function (address) {
  this.ten_kh = address.tenkh;
  this.dia_chi_kh = address.diachikh;
  this.sdt_kh = address.sdtkh;
  this.id_kh = address.idkh;
};

Address.createAddress = (newAddress, result) => {
  mysql.query("INSERT INTO dia_chi SET ?", newAddress, (err, res) => {
    if (err) {
      console.log("ERROR: ", err);
      result(err, null);
      return;
    }
    console.log("Create new address");
    result(null, res);
  });
};

Address.getListAddress = (result) => {
  mysql.query("SELECT * FROM dia_chi ORDER BY SUBSTRING(id_dc,4)*1 ASC", (err, res) => {
    if (err) {
      console.log("ERROR: ", err);
      result(err, null);
      return;
    }
    console.log("Get Address");
    result(null, res);
  });
};

Address.getAddress = (id_kh, result) => {
  mysql.query(`SELECT * FROM dia_chi WHERE id_kh='${id_kh}' ORDER BY SUBSTRING(id_dc,4)*1 ASC`, (err, res) => {
    if (err) {
      console.log("ERROR: ", err);
      result(err, null);
      return;
    }
    console.log("Get Address");
    result(null, res);
  });
};

Address.getIdAddress = (id_dc, result) => {
  mysql.query(`SELECT * FROM dia_chi WHERE id_dc='${id_dc}' ORDER BY SUBSTRING(id_dc,4)*1 ASC`, (err, res) => {
    if (err) {
      console.log("ERROR: ", err);
      result(err, null);
      return;
    }
    console.log("Get Address");
    result(null, res);
  });
};

Address.deleteAddress = (id, result) => {
  mysql.query(`DELETE FROM dia_chi WHERE id_dc='${id}'`, (err, res) => {
    if (err) {
      console.log("ERROR: ", err);
      result(err, null);
      return;
    }
    console.log("Delete address");
    result(null, res);
  });
};

module.exports = Address;
