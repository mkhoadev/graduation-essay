const ImageReview = require("../models/hinhanhdanhgia.model");

module.exports = {
  createImageReview: (req, res) => {
    for (let i = 0; i < req.files.length; i++) {
      const imageRv = new ImageReview({
        iddg: req.body.iddg,
        hinhanh: req.files[i].path,
      });

      ImageReview.createImage(imageRv, (err, data) => {
        if (err) {
          res.status(500).send({
            message: err.message,
          });
        } else res.status(200);
      });
    }
    res.status(200).send("success");
  },

  getImage: (req, res) => {
    if (!req.params) {
      res.status(400).send({
        message: "Content can not be empty!",
      });
    }
    ImageReview.getImage(req.params.iddg, (err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message,
        });
      } else res.status(200).send(data);
    });
  },
};
