const DetailExportInvoice = require("../models/chitiethdx.model");

module.exports = {
  createDetailExportInvoice: (req, res) => {
    const data = req.body;
    console.log(req.body);
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!",
      });
    }

    for (let i = 0; i < data.products.length; i++) {
      const detailExportInvoice = new DetailExportInvoice({
        soluongxuat: data.products[i].so_luong_xuat,
        hinhanh: data.products[i].hinh_anh,
        idsp: data.products[i].id_sp,
        idhdx: data.idhdx,
        idms: data.products[i].id_ms,
        idkt: data.products[i].id_kt,
        tenms: data.products[i].ten_ms,
        tenkt: data.products[i].ten_kt,
      });

      DetailExportInvoice.createDetailExportInvoice(detailExportInvoice, (err, data) => {
        if (err) {
          res.status(500).send({
            message: err.message,
          });
        } else res.status(200);
      });
    }

    DetailExportInvoice.getList((err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message,
        });
      } else res.status(200).send(data);
    });
  },

  getListAll: (req, res) => {
    if (!req.params) {
      res.status(400).send({
        message: "Content can not be empty!",
      });
    }
    DetailExportInvoice.getListAll(req.params.idhdx, (err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message,
        });
      } else res.status(200).send(data);
    });
  },

  sumNumberProduct: (req, res) => {
    if (req.query.dateStart && req.query.dateEnd) {
      DetailExportInvoice.totalProductSell(req.query.dateStart, req.query.dateEnd, req.query.status, (err, data) => {
        if (err) {
          res.status(500).send({
            message: err.message,
          });
        } else res.status(200).send(data);
      });
    } else {
      DetailExportInvoice.sumNumberProduct(req.query.status, (err, data) => {
        if (err) {
          res.status(500).send({
            message: err.message,
          });
        } else res.status(200).send(data);
      });
    }
  },

  sumNumber: (req, res) => {
    if (!req.params) {
      res.status(400).send({
        message: "Content can not be empty!",
      });
    }
    DetailExportInvoice.sumNumber(req.params.idsp, (err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message,
        });
      } else res.status(200).send(data);
    });
  },
};
