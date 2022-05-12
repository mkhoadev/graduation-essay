const Position = require("../models/chucvu.model");

module.exports = {
  createPosition: (req, res) => {
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!",
      });
    }

    const position = new Position({
      chucvu: req.body.chucvu,
    });

    Position.createPosition(position, (err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message,
        });
      } else res.status(200).send(data);
    });
  },

  getPosition: (req, res) => {
    if (!req.params) {
      res.status(400).send({
        message: "Content can not be empty!",
      });
    }

    Position.getPosition(req.params.id, (err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message,
        });
      } else res.status(200).send(data);
    });
  },

  getListPosition: (req, res) => {
    Position.getListPosition((err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message,
        });
      } else res.status(200).send(data);
    });
  },
};
