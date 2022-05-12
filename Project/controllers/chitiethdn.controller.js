const DetailImportInvoice = require("../models/chitiethdn.model");

module.exports = {
  createDetailImportInvoice: (req, res) => {
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!",
      });
    }

    const detailImportInvoice = new DetailImportInvoice({
      gianhap: req.body.gianhap,
      soluong: req.body.soluong,
      idms: req.body.mausac,
      idkt: req.body.kichthuoc,
      idsp: req.body.idsp,
      idhdn: req.body.idhdn,
    });

    DetailImportInvoice.createDetailImportInvoice(detailImportInvoice, (err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message,
        });
      } else res.status(200).send(data);
    });
  },

  sumNumber: (req, res) => {
    DetailImportInvoice.sumNumber(req.params.idsp, (err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message,
        });
      } else res.status(200).send(data);
    });
  },

  sumNumberProduct: (req, res) => {
    DetailImportInvoice.sumNumberProduct((err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message,
        });
      } else res.status(200).send(data);
    });
  },

  getDetailProductList: (req, res) => {
    DetailImportInvoice.getDetailProductList(req.params.idhdn, (err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message,
        });
      } else res.status(200).send(data);
    });
  },

  addNumberProduct: (req, res) => {
    DetailImportInvoice.addNumberProduct(req.body, (err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message,
        });
      } else res.status(200).send(data);
    });
  },
};
