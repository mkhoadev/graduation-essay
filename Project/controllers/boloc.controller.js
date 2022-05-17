const Filter = require("../models/boloc.model");

module.exports = {
  sortBy: (req, res) => {
    Filter.sortBy(req.params.key, (err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message,
        });
      } else res.status(200).send(data);
    });
  },

  sortBrand: (req, res) => {
    Filter.sortBrand(req.params.key,(err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message,
        });
      } else res.status(200).send(data);
    });
  },

  sortSize: (req, res) => {
    Filter.sortSize(req.params.key, (err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message,
        });
      } else res.status(200).send(data);
    });
  },

  search: (req, res) => {
    Filter.search(req.params.key, (err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message,
        });
      } else res.status(200).send(data);
    });
  },

  rangePrice: (req, res) => {
    Filter.rangePrice(req.query, (err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message,
        });
      } else res.status(200).send(data);
    });
  },
};
