const Color = require("../models/mausac.model");

module.exports = {
  createColor: (req, res) => {
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!",
      });
    }

    const color = new Color({
      mausac: req.body.mausac,
    });

    Color.createProduct(color, (err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message,
        });
      } else res.status(200).send(data);
    });
  },

  getColor: (req, res) => {
    if (!req.params) {
      res.status(400).send({
        message: "Content can not be empty!",
      });
    }
    Color.getColor(req.params.id, (err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message,
        });
      } else res.status(200).send(data);
    });
  },

  getList: (req, res) => {
    Color.getList((err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message,
        });
      } else res.status(200).send(data);
    });
  },
};
