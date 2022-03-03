const Employee = require("../models/nhanvien.model");

module.exports = {
  createEmployee: (req, res) => {
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!",
      });
    }

    const employee = new Employee({
      ten: req.body.name,
      email: req.body.email,
      mat_khau: req.body.password,
      sdt: req.body.phone,
      ngay_sinh: req.body.birthday,
      gioi_tinh: req.body.sex,
      dia_chi: req.body.address,
    });

    Employee.createEmployee(employee, (err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message,
        });
      } else res.status(200).send(data);
    });
  },

  getEmployee: (req, res) => {
    console.log(req.body);
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!",
      });
    }
    Employee.getEmployee(req.body.email, req.body.password, (err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message,
        });
      } else {
        res.status(200).send(data);
      }
    });
  },

  checkEmployee: (req, res) => {
    Employee.checkEmployee(req.params.email, (err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message,
        });
      } else {
        res.status(200).send(data);
      }
    });
  },
};
