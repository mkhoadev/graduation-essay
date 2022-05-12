const Address = require("../models/diachi.model");

module.exports = {
  createAddress: (req, res) => {
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!",
      });
    }

    const address = new Address({
      tenkh: req.body.tenkh,
      diachikh: req.body.diachikh,
      sdtkh: req.body.sdtkh,
      idkh: req.body.idkh,
    });

    Address.createAddress(address, (err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message,
        });
      } else res.status(200).send(data);
    });
  },

  getListAddress: (req, res) => {
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!",
      });
    }
    Address.getListAddress((err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message,
        });
      } else res.status(200).send(data);
    });
  },

  getAddress: (req, res) => {
    Address.getAddress(req.params.idkh, (err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message,
        });
      } else res.status(200).send(data);
    });
  },

  getIdAddress: (req, res) => {
    Address.getIdAddress(req.params.iddc, (err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message,
        });
      } else res.status(200).send(data);
    });
  },

  deleteAddress: (req, res) => {
    Address.deleteAddress(req.params.id, (err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message,
        });
      } else res.status(200).send(data);
    });
  },
};
