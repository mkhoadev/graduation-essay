const ImportInvoice = require("../models/hoadonnhap.model");

module.exports = {
  createImportInvoice: (req, res) => {
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!",
      });
    }

    const importInvoice = new ImportInvoice({
      ngaylaphdn: req.body.ngaylaphdn,
    });

    ImportInvoice.createImportInvoice(importInvoice, (err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message,
        });
      } else res.status(200);
    });
    ImportInvoice.getId((err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message,
        });
      } else res.status(200).send(data);
    });
  },

  getListImportInvoice: (req, res) => {
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!",
      });
    }
    ImportInvoice.getListImportInvoice((err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message,
        });
      } else res.status(200).send(data);
    });
  },
  deleteImportInvoice: (req, res) => {
    ImportInvoice.deleteImportInvoice(req.params.id, (err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message,
        });
      } else res.status(200).send(data);
    });
  },
};
