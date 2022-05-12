const ExportInvoice = require("../models/hoadonxuat.model");

module.exports = {
  createExportInvoice: (req, res) => {
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!",
      });
    }

    const exportInvoice = new ExportInvoice({
      tenkh: req.body.tenkh,
      sdtkh: req.body.sdtkh,
      tongtienhdx: req.body.tongtienhdx,
      ngaylaphdx: req.body.ngaylaphdx,
      trangthai: req.body.trangthai,
      hinhthuctt: req.body.hinhthuctt,
      tienvc: req.body.tienvc,
      diachi: req.body.diachi,
      idkh: req.body.idkh,
    });

    ExportInvoice.createExportInvoice(exportInvoice, (err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message,
        });
      } else res.status(200);
    });
    ExportInvoice.getId((err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message,
        });
      } else res.status(200).send(data);
    });
  },

  getListExportInvoice: (req, res) => {
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!",
      });
    }
    ExportInvoice.getListExportInvoice(req.params.idkh, (err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message,
        });
      } else res.status(200).send(data);
    });
  },

  getAll: (req, res) => {
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!",
      });
    }
    ExportInvoice.getAll((err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message,
        });
      } else res.status(200).send(data);
    });
  },

  sumPriceInvoices: (req, res) => {
    if (req.query.dateStart && req.query.dateEnd) {
      ExportInvoice.turnover(req.query.dateStart, req.query.dateEnd,(err, data) => {
        if (err) {
          res.status(500).send({
            message: err.message,
          });
        } else res.status(200).send(data);
      });
    } else {
      ExportInvoice.sumPriceInvoices((err, data) => {
        if (err) {
          res.status(500).send({
            message: err.message,
          });
        } else res.status(200).send(data);
      });
    }
    
  },

  getExportInvoice: (req, res) => {
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!",
      });
    }
    ExportInvoice.getExportInvoice(req.params.idhdx, (err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message,
        });
      } else res.status(200).send(data);
    });
  },

  getPriceExportInvoice: (req, res) => {
    ExportInvoice.getPriceExportInvoice(req.query.dateStart, req.query.dateEnd, (err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message,
        });
      } else res.status(200).send(data);
    });
  },

  updateStatus: (req, res) => {
    ExportInvoice.updateStatus(req.params.id_hdx, req.body.status, (err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message,
        });
      } else res.status(200).send(data);
    });
  },

  deleteExportInvoice: (req, res) => {
    ExportInvoice.deleteExportInvoice(req.params.id, (err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message,
        });
      } else res.status(200).send(data);
    });
  },

  getOrders: (req, res) => {
    ExportInvoice.getOrders(req.params.idkh, req.body.status, (err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message,
        });
      } else res.status(200).send(data);
    });
  },
};
