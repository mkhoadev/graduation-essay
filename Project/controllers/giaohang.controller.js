const Deliver = require("../models/giaohang.model");

module.exports = {
  createDeliver: (req, res) => {
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!",
      });
    }

    const deliver = new Deliver({
      idnv: req.body.idnv,
      trangthai: req.body.trangthai,
      idhdx: req.body.idhdx,
    });

    Deliver.createDeliver(deliver, (err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message,
        });
      } else res.status(200).send(data);
    });
  },

  updateStatus: (req, res) => {
    if (req.body.ngaygh) {
      Deliver.updateDateComplete(req.body.idhdx, req.body.status, req.body.ngaygh, (err, data) => {
        if (err) {
          res.status(500).send({
            message: err.message,
          });
        } else res.status(200).send(data);
      });
    } else {
      Deliver.updateStatus(req.body.idhdx, req.body.status, (err, data) => {
        if (err) {
          res.status(500).send({
            message: err.message,
          });
        } else res.status(200).send(data);
      });
    }
  },

  updateStatusNote: (req, res) => {
    Deliver.updateStatusNote(req.body.idhdx, req.body.status, req.body.ngaygh, req.body.ghichu, (err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message,
        });
      } else res.status(200).send(data);
    });
  },

  getInvoice: (req, res) => {
    Deliver.getInvoice(req.params.idnv, (err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message,
        });
      } else res.status(200).send(data);
    });
  },

  getInvoiceStatus: (req, res) => {
    Deliver.getInvoiceStatus(req.params.idnv, req.body.status, (err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message,
        });
      } else res.status(200).send(data);
    });
  },

  getAllInvoice: (req, res) => {
    Deliver.getAllInvoice((err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message,
        });
      } else res.status(200).send(data);
    });
  },

  getOneInvoice: (req, res) => {
    Deliver.getOneInvoice(req.params.idhdx, (err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message,
        });
      } else res.status(200).send(data);
    });
  },

  deleteInvoice: (req, res) => {
    Deliver.deleteInvoice(req.params.idhdx, (err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message,
        });
      } else res.status(200).send(data);
    });
  },
};
