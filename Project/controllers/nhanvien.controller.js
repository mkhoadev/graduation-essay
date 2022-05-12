const Employee = require("../models/nhanvien.model");

module.exports = {
  createEmployee: (req, res) => {
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!",
      });
    }

    const employee = new Employee({
      tennv: req.body.tennv,
      emailnv: req.body.emailnv,
      matkhaunv: req.body.matkhaunv,
      sdtnv: req.body.sdtnv,
      ngaysinhnv: req.body.ngaysinhnv,
      gioitinhnv: req.body.gioitinhnv,
      diachinv: req.body.diachinv,
      chucvunv: req.body.chucvunv,
    });

    Employee.createEmployee(employee, (err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message,
        });
      } else res.status(200).send(data);
    });
  },

  loginEmployee: (req, res) => {
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!",
      });
    }
    Employee.loginEmployee(req.body.email, req.body.password, (err, data) => {
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

  getEmployee: (req, res) => {
    Employee.getEmployee(req.params.idnv, (err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message,
        });
      } else {
        res.status(200).send(data);
      }
    });
  },

  getListEmployee: (req, res) => {
    Employee.getListEmployee((err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message,
        });
      } else {
        res.status(200).send(data);
      }
    });
  },

  getAllShiper: (req, res) => {
    Employee.getAllShiper((err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message,
        });
      } else {
        res.status(200).send(data);
      }
    });
  },

  updateEmployee: (req, res) => {
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!",
      });
    }
    Employee.updateEmployee(req.params.idnv, new Employee(req.body), (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Tutorial with id ${req.params.idnv}.`,
          });
        } else {
          res.status(500).send({
            message: "Error updating Tutorial with id " + req.params.idnv,
          });
        }
      } else res.send(data);
    });
  },

  deleteEmployee: (req, res) => {
    Employee.removeEmployee(req.params.idnv, (err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message,
        });
      } else res.status(200).send(data);
    });
  },
};
