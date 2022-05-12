const Image = require("../models/hinhanh.model");

module.exports = {
  createImage: (req, res) => {
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!",
      });
    }
    for (let i = 0; i < req.files.length; i++) {
      const image = new Image({
        idsp: req.body.idsp,
        hinhanh: req.files[i].path,
      });

      Image.createImage(image, (err, data) => {
        if (err) {
          res.status(500).send({
            message: err.message,
          });
        } else res.status(200);
      });
    }
  },

  getImage: (req, res) => {
    if (!req.params) {
      res.status(400).send({
        message: "Content can not be empty!",
      });
    }
    Image.getImage(req.params.id, (err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message,
        });
      } else res.status(200).send(data);
    });
  },

  deleteImage: (req, res) => {
    if (!req.params) {
      res.status(400).send({
        message: "Content can not be empty!",
      });
    }
    Image.deleteImage(req.params.id, (err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message,
        });
      } else res.status(200).send(data);
    });
  },
};
