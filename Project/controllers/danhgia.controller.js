const Review = require("../models/danhgia.model");

module.exports = {
  createReview: (req, res) => {
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!",
      });
    }

    const review = new Review({
      sosao: req.body.sosao,
      noidung: req.body.noidung,
      idhdx: req.body.idhdx,
    });

    Review.createReview(review, (err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message,
        });
      } else res.status(200).send(data);
    });
  },

  getListReview: (req, res) => {
    Review.getListReview((err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message,
        });
      } else res.status(200).send(data);
    });
  },

  getReview: (req, res) => {
    Review.getReview(req.params.idhdx, (err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message,
        });
      } else res.status(200).send(data);
    });
  },

  getReviewProduct: (req, res) => {
    Review.getReviewProduct(req.params.idsp, (err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message,
        });
      } else res.status(200).send(data);
    });
  },
};
