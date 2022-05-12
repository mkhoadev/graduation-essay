const DetailProduct = require("../models/chitietsanpham.model");

module.exports = {
  createDetailProduct: (req, res) => {
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!",
      });
    }

    const detailProduct = new DetailProduct({
      idsp: req.body.idsp,
      idkt: req.body.idkt,
      idms: req.body.idms,
    });

    DetailProduct.createDetailProduct(detailProduct, (err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message,
        });
      } else res.status(200).send(data);
    });
  },

  getList: (req, res) => {
    DetailProduct.getList(req.params.idsp, (err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message,
        });
      } else res.status(200).send(data);
    });
  },

  getAllNumber: (req, res) => {
    DetailProduct.getAllNumber((err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message,
        });
      } else res.status(200).send(data);
    });
  },

  getListColor: (req, res) => {
    DetailProduct.getListColor(req.params.idsp, req.params.idms, (err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message,
        });
      } else res.status(200).send(data);
    });
  },

  getNumberProduct: (req, res) => {
    DetailProduct.getNumberProduct(req.params.idsp, req.params.idkt, req.params.idms, (err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message,
        });
      } else res.status(200).send(data);
    });
  },

  getProductBuyNow: (req, res) => {
    DetailProduct.getProductBuyNow(req.query, (err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message,
        });
      } else res.status(200).send(data);
    });
  },

  removeNumberProduct: (req, res) => {
    const data = req.body;
    for (let i = 0; i < data.length; i++) {
      DetailProduct.removeNumberProduct(data[i], (err) => {
        if (err) {
          res.status(500).send({
            message: err.message,
          });
        } else res.status(200);
      });
    }
    res.status(200).send("Success");
  },

  addNumberProduct: (req, res) => {
    const data = req.body;
    for (let i = 0; i < data.length; i++) {
      DetailProduct.addNumberProduct(data[i], (err) => {
        if (err) {
          res.status(500).send({
            message: err.message,
          });
        } else res.status(200);
      });
    }
    res.status(200).send("Success");
  },

  updateNumberProduct: (req, res) => {
    const data = req.body;
    for (let i = 0; i < data.length; i++) {
      DetailProduct.updateNumberProduct(data[i], (err) => {
        if (err) {
          res.status(500).send({
            message: err.message,
          });
        } else res.status(200);
      });
    }
    res.status(200).send("Success");
  },

  getNumberOneProduct: (req, res) => {
    DetailProduct.getNumberOneProduct(req.query, (err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message,
        });
      } else res.status(200).send(data);
    });
  },
};
