const TypeProduct = require("../models/loaisanpham.model");

module.exports = {
  createTypeProduct: (req, res) => {
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!",
      });
    }

    const typeproduct = new TypeProduct({
      loaisanpham: req.body.loaisanpham,
    });

    TypeProduct.createTypeProduct(typeproduct, (err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message,
        });
      } else res.status(200).send(data);
    });
  },

  getTypeProduct: (req, res) => {
    if (!req.params) {
      res.status(400).send({
        message: "Content can not be empty!",
      });
    }
    TypeProduct.getTypeProduct(req.params.id, (err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message,
        });
      } else res.status(200).send(data);
    });
  },

  getList: (req, res) => {
    TypeProduct.getList((err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message,
        });
      } else res.status(200).send(data);
    });
  },
  deTypeProduct: (req, res) => {
    TypeProduct.deTypeProduct(req.params.idlsp, (err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message,
        });
      } else res.status(200).send(data);
    });
  },
};
