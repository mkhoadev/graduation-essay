const Brand = require("../models/thuonghieu.model");

module.exports = {
  createBrand: (req, res) => {
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!",
      });
    }

    const brand = new Brand({
      thuonghieu: req.body.thuonghieu,
    });

    Brand.createBrand(brand, (err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message,
        });
      } else res.status(200).send(data);
    });
  },

  getBrand: (req, res) => {
    if (!req.params) {
      res.status(400).send({
        message: "Content can not be empty!",
      });
    }

    Brand.getBrand(req.params.id, (err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message,
        });
      } else res.status(200).send(data);
    });
  },

  getList: (req, res) => {
    Brand.getList((err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message,
        });
      } else res.status(200).send(data);
    });
  },
};
